import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Admin endpoint to view and manage chatbot leads
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In production, you would fetch from database
    // const leads = await query("SELECT * FROM chatbot_leads ORDER BY created_at DESC")

    // Mock data for now
    const mockLeads = [
      {
        id: "LEAD-1703123456789-abc123",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1-555-0123",
        country: "United States",
        service: "Website Development",
        budget: "$5,000 - $10,000",
        timeline: "Within 1 month",
        action: "book_call",
        status: "new",
        created_at: new Date().toISOString(),
      },
    ]

    return NextResponse.json({
      leads: mockLeads,
      total: mockLeads.length,
      stats: {
        new: mockLeads.filter((l) => l.status === "new").length,
        contacted: mockLeads.filter((l) => l.status === "contacted").length,
        qualified: mockLeads.filter((l) => l.status === "qualified").length,
        converted: mockLeads.filter((l) => l.status === "converted").length,
      },
    })
  } catch (error) {
    console.error("Error fetching chatbot leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { leadId, status, notes } = await request.json()

    // In production, update the database
    // await query("UPDATE chatbot_leads SET status = $1, notes = $2, updated_at = CURRENT_TIMESTAMP WHERE lead_id = $3", [status, notes, leadId])

    return NextResponse.json({ success: true, message: "Lead updated successfully" })
  } catch (error) {
    console.error("Error updating lead:", error)
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 })
  }
}
