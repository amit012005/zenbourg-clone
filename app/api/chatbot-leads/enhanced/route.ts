import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { EnhancedChatbotLeadModel } from "@/lib/models/enhanced-chatbot-lead"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      country,
      address,
      serviceInterest,
      budgetRange,
      timeline,
      projectDescription,
      actionTaken,
      conversationData,
    } = body

    // Validate required fields
    if (!name || !email || !actionTaken) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get user session if available
    const session = await getServerSession()
    const userId = session?.user ? Number.parseInt((session.user as any).id) : undefined

    // Get client information
    const ipAddress = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"
    const referrer = request.headers.get("referer") || "direct"

    // Generate session ID for tracking
    const sessionId =
      request.cookies.get("chatbot-session")?.value || `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Extract UTM parameters
    const url = new URL(request.url)
    const utmData = {
      source: url.searchParams.get("utm_source"),
      medium: url.searchParams.get("utm_medium"),
      campaign: url.searchParams.get("utm_campaign"),
      term: url.searchParams.get("utm_term"),
      content: url.searchParams.get("utm_content"),
    }

    const lead = await EnhancedChatbotLeadModel.create({
      userId,
      sessionId,
      name,
      email,
      phone,
      country,
      address,
      serviceInterest,
      budgetRange,
      timeline,
      projectDescription,
      actionTaken,
      ipAddress,
      userAgent,
      referrer,
      utmData,
      conversationData,
    })

    // Set response based on action
    let response = {}
    switch (actionTaken) {
      case "book_call":
        response = {
          success: true,
          message: "Consultation booking initiated",
          leadId: lead.leadUuid,
          nextStep: "redirect_to_booking",
          leadScore: lead.leadScore,
        }
        break

      case "request_quote":
        response = {
          success: true,
          message: "Quote request submitted",
          leadId: lead.leadUuid,
          nextStep: "send_quote",
          leadScore: lead.leadScore,
        }
        break

      case "more_info":
        response = {
          success: true,
          message: "Information request submitted",
          leadId: lead.leadUuid,
          nextStep: "send_info",
          leadScore: lead.leadScore,
        }
        break

      default:
        response = {
          success: true,
          message: "Lead captured successfully",
          leadId: lead.leadUuid,
          leadScore: lead.leadScore,
        }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Enhanced chatbot lead error:", error)
    return NextResponse.json({ error: "Failed to process lead" }, { status: 500 })
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
    const assignedTo = url.searchParams.get("assignedTo")
    const minScore = url.searchParams.get("minScore")
    const maxScore = url.searchParams.get("maxScore")
    const limit = Number.parseInt(url.searchParams.get("limit") || "50")
    const offset = Number.parseInt(url.searchParams.get("offset") || "0")

    const filters: any = { limit, offset }

    if (status) filters.status = status
    if (assignedTo) filters.assignedTo = Number.parseInt(assignedTo)
    if (minScore || maxScore) {
      filters.leadScore = {}
      if (minScore) filters.leadScore.min = Number.parseInt(minScore)
      if (maxScore) filters.leadScore.max = Number.parseInt(maxScore)
    }

    const result = await EnhancedChatbotLeadModel.findAll(filters)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching enhanced chatbot leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}
