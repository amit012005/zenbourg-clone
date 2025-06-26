import { NextResponse } from "next/server"
import { getAllServices } from "@/lib/data/services-data" // Adjust path as needed

export async function GET() {
  try {
    const services = await getAllServices()
    // Map to simpler structure if needed by client
    const serviceOptions = services.map((s) => ({ id: s.id, name: s.name, slug: s.slug }))
    return NextResponse.json(serviceOptions)
  } catch (error) {
    console.error("API error fetching services list:", error)
    return NextResponse.json({ error: "Failed to fetch services list" }, { status: 500 })
  }
}
