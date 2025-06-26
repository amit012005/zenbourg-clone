import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { EnhancedContactModel } from "@/lib/models/enhanced-contact"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, company, subject, message, source } = body

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get user session if available
    const session = await getServerSession()
    const userId = session?.user ? Number.parseInt((session.user as any).id) : undefined

    // Get client information
    const ipAddress = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"
    const referrer = request.headers.get("referer") || "direct"

    // Extract UTM parameters from referrer or request
    const url = new URL(request.url)
    const utmSource = url.searchParams.get("utm_source")
    const utmMedium = url.searchParams.get("utm_medium")
    const utmCampaign = url.searchParams.get("utm_campaign")

    const contact = await EnhancedContactModel.create({
      userId,
      fullName,
      email,
      phone,
      company,
      subject,
      message,
      source: source || "contact_form",
      ipAddress,
      userAgent,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      metadata: {
        timestamp: new Date().toISOString(),
        formVersion: "v2.0",
      },
    })

    return NextResponse.json({
      success: true,
      contactId: contact.contactUuid,
      message: "Contact form submitted successfully",
    })
  } catch (error) {
    console.error("Enhanced contact form error:", error)
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const status = url.searchParams.get("status")
    const priority = url.searchParams.get("priority")
    const source = url.searchParams.get("source")
    const limit = Number.parseInt(url.searchParams.get("limit") || "50")
    const offset = Number.parseInt(url.searchParams.get("offset") || "0")

    const result = await EnhancedContactModel.findAll({
      status: status || undefined,
      priority: priority || undefined,
      source: source || undefined,
      limit,
      offset,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching enhanced contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}
