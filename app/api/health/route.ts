import { NextResponse } from "next/server"
import { checkDatabaseConnection } from "@/lib/database"

export async function GET() {
  try {
    const dbHealthy = await checkDatabaseConnection()

    const health = {
      status: dbHealthy ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      database: dbHealthy ? "connected" : "disconnected",
      environment: process.env.NODE_ENV,
    }

    return NextResponse.json(health, {
      status: dbHealthy ? 200 : 503,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: "Health check failed",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    )
  }
}
