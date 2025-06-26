import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

// In-memory storage for demo
const customRequests: any[] = [
  {
    id: "REQ-1234567890-abc123",
    userId: "2",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    businessName: "Doe Enterprises",
    projectDescription: "Need a custom CRM system with advanced reporting capabilities",
    budgetRange: "$10,000 - $25,000",
    timeline: "3-4 months",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()

    const { fullName, email, phone, businessName, projectDescription, budgetRange, timeline } = body

    // Validate required fields
    if (!fullName || !email || !businessName || !projectDescription || !budgetRange || !timeline) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate request ID
    const requestId = `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create request object
    const customRequest = {
      id: requestId,
      userId: session?.user?.id || null,
      fullName,
      email,
      phone,
      businessName,
      projectDescription,
      budgetRange,
      timeline,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // Add to in-memory storage
    customRequests.push(customRequest)

    // Simulate email notification
    console.log(`Custom request notification sent to admin for request ${requestId}`)

    return NextResponse.json({
      success: true,
      requestId,
      message: "Custom request submitted successfully",
      request: customRequest,
    })
  } catch (error) {
    console.error("Custom request error:", error)
    return NextResponse.json({ error: "Failed to submit custom request" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Filter requests based on user role
    let filteredRequests = customRequests

    if (session.user.role !== "admin") {
      filteredRequests = customRequests.filter((request) => request.userId === session.user.id)
    }

    return NextResponse.json({ requests: filteredRequests })
  } catch (error) {
    console.error("Fetch custom requests error:", error)
    return NextResponse.json({ error: "Failed to fetch custom requests" }, { status: 500 })
  }
}
