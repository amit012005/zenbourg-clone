import { type NextRequest, NextResponse } from "next/server"

interface ChatbotLead {
  name?: string
  email?: string
  phone?: string
  address?: string
  country?: string
  service?: string
  budget?: string
  timeline?: string
  description?: string
  action: "book_call" | "request_quote" | "more_info"
}

// In production, you would save this to your database
const leads: (ChatbotLead & { id: string; timestamp: Date })[] = []

export async function POST(request: NextRequest) {
  try {
    const leadData: ChatbotLead = await request.json()

    if (!leadData.name || !leadData.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Generate unique ID
    const leadId = `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Save lead data
    const newLead = {
      id: leadId,
      ...leadData,
      timestamp: new Date(),
    }

    leads.push(newLead)

    // In production, you would:
    // 1. Save to database
    // 2. Send email notifications
    // 3. Integrate with CRM
    // 4. Send welcome email to lead

    console.log("New chatbot lead:", newLead)

    // Simulate different responses based on action
    let response = {}

    switch (leadData.action) {
      case "book_call":
        response = {
          success: true,
          message: "Consultation booking initiated",
          leadId,
          nextStep: "redirect_to_booking",
        }
        break

      case "request_quote":
        response = {
          success: true,
          message: "Quote request submitted",
          leadId,
          nextStep: "send_quote",
        }
        break

      case "more_info":
        response = {
          success: true,
          message: "Information request submitted",
          leadId,
          nextStep: "send_info",
        }
        break
    }

    // Here you would typically:
    // - Send email to the lead
    // - Notify your sales team
    // - Create a task in your CRM
    // - Schedule follow-up reminders

    return NextResponse.json(response)
  } catch (error) {
    console.error("Chatbot lead error:", error)
    return NextResponse.json({ error: "Failed to process lead" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return all leads (in production, add authentication and pagination)
    return NextResponse.json({
      leads: leads.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
      total: leads.length,
    })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}
