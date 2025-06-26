import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { query } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get("unread") === "true"

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let queryText = "SELECT * FROM notifications WHERE user_id = $1"
    const params = [session.user.id]

    if (unreadOnly) {
      queryText += " AND read_at IS NULL"
    }

    queryText += " ORDER BY created_at DESC LIMIT 50"

    const result = await query(queryText, params)

    const notifications = result.rows.map((row: any) => ({
      id: row.id,
      type: row.type,
      title: row.title,
      message: row.message,
      data: row.data,
      readAt: row.read_at,
      createdAt: row.created_at,
    }))

    return NextResponse.json({ notifications })
  } catch (error) {
    console.error("Fetch notifications error:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const { notificationId, markAsRead } = body

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (markAsRead) {
      await query("UPDATE notifications SET read_at = NOW() WHERE id = $1 AND user_id = $2", [
        notificationId,
        session.user.id,
      ])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update notification error:", error)
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 })
  }
}

// Helper function to create notifications
export async function createNotification(userId: string, type: string, title: string, message: string, data?: any) {
  try {
    await query("INSERT INTO notifications (user_id, type, title, message, data) VALUES ($1, $2, $3, $4, $5)", [
      userId,
      type,
      title,
      message,
      JSON.stringify(data),
    ])
  } catch (error) {
    console.error("Error creating notification:", error)
  }
}
