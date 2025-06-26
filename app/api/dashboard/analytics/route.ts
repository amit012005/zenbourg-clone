import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { query } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30d" // 7d, 30d, 90d, 1y

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()

    switch (period) {
      case "7d":
        startDate.setDate(endDate.getDate() - 7)
        break
      case "30d":
        startDate.setDate(endDate.getDate() - 30)
        break
      case "90d":
        startDate.setDate(endDate.getDate() - 90)
        break
      case "1y":
        startDate.setFullYear(endDate.getFullYear() - 1)
        break
    }

    if (session.user.role === "admin") {
      // Admin analytics
      const analytics = await getAdminAnalytics(startDate, endDate)
      return NextResponse.json({ analytics, period })
    } else {
      // User analytics
      const analytics = await getUserAnalytics(session.user.id, startDate, endDate)
      return NextResponse.json({ analytics, period })
    }
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

async function getAdminAnalytics(startDate: Date, endDate: Date) {
  try {
    // Revenue analytics
    const revenueResult = await query(
      `SELECT 
        DATE(created_at) as date,
        SUM(amount) as revenue,
        COUNT(*) as transactions
      FROM payments 
      WHERE status = 'paid' AND created_at BETWEEN $1 AND $2
      GROUP BY DATE(created_at)
      ORDER BY date`,
      [startDate, endDate],
    )

    // Booking analytics
    const bookingResult = await query(
      `SELECT 
        DATE(created_at) as date,
        COUNT(*) as bookings,
        COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled
      FROM bookings 
      WHERE created_at BETWEEN $1 AND $2
      GROUP BY DATE(created_at)
      ORDER BY date`,
      [startDate, endDate],
    )

    // Service popularity
    const serviceResult = await query(
      `SELECT 
        service_name,
        COUNT(*) as bookings,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed_bookings
      FROM bookings 
      WHERE created_at BETWEEN $1 AND $2
      GROUP BY service_name
      ORDER BY bookings DESC`,
      [startDate, endDate],
    )

    // Total metrics
    const totalsResult = await query(
      `SELECT 
        (SELECT COUNT(*) FROM bookings WHERE created_at BETWEEN $1 AND $2) as total_bookings,
        (SELECT COUNT(*) FROM payments WHERE status = 'paid' AND created_at BETWEEN $1 AND $2) as total_payments,
        (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status = 'paid' AND created_at BETWEEN $1 AND $2) as total_revenue,
        (SELECT COUNT(DISTINCT user_id) FROM bookings WHERE created_at BETWEEN $1 AND $2) as unique_customers`,
      [startDate, endDate],
    )

    return {
      revenue: revenueResult.rows,
      bookings: bookingResult.rows,
      services: serviceResult.rows,
      totals: totalsResult.rows[0],
    }
  } catch (error) {
    console.error("Error getting admin analytics:", error)
    throw error
  }
}

async function getUserAnalytics(userId: string, startDate: Date, endDate: Date) {
  try {
    // User's booking history
    const bookingResult = await query(
      `SELECT 
        DATE(created_at) as date,
        COUNT(*) as bookings,
        service_name
      FROM bookings 
      WHERE user_id = $1 AND created_at BETWEEN $2 AND $3
      GROUP BY DATE(created_at), service_name
      ORDER BY date`,
      [userId, startDate, endDate],
    )

    // User's payment history
    const paymentResult = await query(
      `SELECT 
        DATE(created_at) as date,
        SUM(amount) as spent
      FROM payments 
      WHERE user_id = $1 AND status = 'paid' AND created_at BETWEEN $2 AND $3
      GROUP BY DATE(created_at)
      ORDER BY date`,
      [userId, startDate, endDate],
    )

    // User totals
    const totalsResult = await query(
      `SELECT 
        (SELECT COUNT(*) FROM bookings WHERE user_id = $1 AND created_at BETWEEN $2 AND $3) as total_bookings,
        (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE user_id = $1 AND status = 'paid' AND created_at BETWEEN $2 AND $3) as total_spent,
        (SELECT COUNT(*) FROM bookings WHERE user_id = $1 AND status = 'confirmed' AND created_at BETWEEN $2 AND $3) as confirmed_bookings`,
      [userId, startDate, endDate],
    )

    return {
      bookings: bookingResult.rows,
      payments: paymentResult.rows,
      totals: totalsResult.rows[0],
    }
  } catch (error) {
    console.error("Error getting user analytics:", error)
    throw error
  }
}
