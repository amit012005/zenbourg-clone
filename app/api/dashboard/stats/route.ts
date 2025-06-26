import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock dashboard statistics
    const stats = {
      totalBookings: 12,
      totalPayments: 8,
      totalRevenue: 24500,
      activeProjects: 5,
      pendingRequests: 3,
      completedProjects: 15,
    }

    // Admin gets full stats, users get limited stats
    if (session.user.role === "admin") {
      return NextResponse.json({
        stats: {
          ...stats,
          totalUsers: 124,
          monthlyRevenue: 24500,
          conversionRate: 12.5,
        },
      })
    } else {
      return NextResponse.json({
        stats: {
          userBookings: 2,
          userPayments: 2,
          userProjects: 1,
          totalSpent: 4498,
        },
      })
    }
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
