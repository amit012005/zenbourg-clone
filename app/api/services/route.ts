import { type NextRequest, NextResponse } from "next/server"
import { ServiceModel } from "@/lib/models/service"

export async function GET(request: NextRequest) {
  try {
    const services = await ServiceModel.findAll()

    return NextResponse.json({ services })
  } catch (error) {
    console.error("Fetch services error:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}
