import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET(req: NextRequest) {
  const token = await getToken({ req })
  if (!token || !token.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = token.id

  try {
    const client = await pool.connect()
    const res = await client.query(
      `SELECT booking_id AS id, service_name as service, TO_CHAR(booking_date, 'YYYY-MM-DD') AS date, time_slot AS time, status
       FROM bookings WHERE user_id = $1 ORDER BY booking_date DESC`,
      [userId]
    )
    client.release()
    return NextResponse.json({ bookings: res.rows })
  } catch (err) {
    console.error("Error fetching bookings:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
