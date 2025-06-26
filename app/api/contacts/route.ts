import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { ContactModel } from "@/lib/models/contact"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, subject, message } = body

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create contact using database model
    const contact = await ContactModel.create({
      fullName,
      email,
      subject,
      message,
    })

    // Simulate email notification
    console.log(`New contact form submission from ${email}`)

    return NextResponse.json({
      success: true,
      contactId: contact.contactId,
      message: "Contact form submitted successfully",
      contact,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const contacts = await ContactModel.findAll()

    return NextResponse.json({ contacts })
  } catch (error) {
    console.error("Fetch contacts error:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}
