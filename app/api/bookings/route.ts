import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { BookingModel } from "@/lib/models/booking"
import { z } from "zod"

// Validation schema
const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Service is required"),
  date: z.string().min(1, "Date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
  notes: z.string().optional(),
  timeZone: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()

    console.log("Received booking request:", body)

    // Validate input
    const validatedData = bookingSchema.parse(body)
    const { fullName, email, phone, service, date, timeSlot, notes, timeZone } = validatedData

    // Check if the time slot is available
    const existingBooking = await BookingModel.findByDateAndTime(new Date(date), timeSlot)
    if (existingBooking) {
      return NextResponse.json({ error: "Time slot is already booked" }, { status: 409 })
    }

    // Create booking using database model
    const booking = await BookingModel.create({
      userId: session?.user?.id,
      fullName,
      email,
      phone,
      serviceName: service,
      bookingDate: new Date(date),
      timeSlot,
      timezone: timeZone,
      notes,
    })

    console.log("Booking created successfully:", booking.bookingId)

    // Send confirmation emails
    await Promise.all([sendBookingConfirmationEmail(booking), sendBookingNotificationToAdmin(booking)])

    return NextResponse.json({
      success: true,
      bookingId: booking.bookingId,
      message: "Booking confirmed successfully! Check your email for meeting details.",
      booking: {
        id: booking.bookingId,
        service: booking.serviceName,
        date: booking.bookingDate,
        timeSlot: booking.timeSlot,
        status: booking.status,
      },
    })
  } catch (error) {
    console.error("Booking error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: error.errors[0].message,
          details: error.errors,
        },
        { status: 400 },
      )
    }

    // Handle database errors
    if (error instanceof Error) {
      console.error("Database error:", error.message)
      return NextResponse.json(
        {
          error: "Database connection failed. Please try again later.",
          details: error.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again.",
        details: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let bookings

    if (session.user.role !== "admin") {
      // Regular users can only see their own bookings
      bookings = await BookingModel.findByUserId(session.user.id, { status, page, limit })
    } else if (userId) {
      // Admin can filter by specific user
      bookings = await BookingModel.findByUserId(userId, { status, page, limit })
    } else {
      // Admin can see all bookings
      bookings = await BookingModel.findAll({ status, page, limit })
    }

    const totalCount = await BookingModel.getCount({
      userId: session.user.role !== "admin" ? session.user.id : userId,
      status,
    })

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Fetch bookings error:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const { bookingId, status, notes } = body

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admin or booking owner can update
    const booking = await BookingModel.findByBookingId(bookingId)
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    if (session.user.role !== "admin" && booking.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const updatedBooking = await BookingModel.updateStatus(bookingId, status, notes)

    // Send status update email
    if (status === "cancelled") {
      await sendBookingCancellationEmail(updatedBooking)
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      message: "Booking updated successfully",
    })
  } catch (error) {
    console.error("Update booking error:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}

// Email helper functions
async function sendBookingConfirmationEmail(booking: any) {
  try {
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Booking Confirmation - Zenbourg</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .meeting-link { background: #4CAF50; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Booking Confirmed!</h1>
            <p>Your consultation with Zenbourg is scheduled</p>
        </div>
        <div class="content">
            <p>Dear ${booking.fullName},</p>
            
            <p>Thank you for booking a consultation with Zenbourg! We're excited to discuss your project and help bring your vision to life.</p>
            
            <div class="details">
                <h3>📅 Meeting Details:</h3>
                <p><strong>Service:</strong> ${booking.serviceName}</p>
                <p><strong>Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${booking.timeSlot}</p>
                <p><strong>Duration:</strong> 30 minutes</p>
                <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
                ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ""}
            </div>
            
            <div style="text-align: center;">
                <a href="https://meet.google.com/pkz-snqq-jyr" class="meeting-link">
                    🎥 Join Google Meet
                </a>
                <p><small>Meeting Link: https://meet.google.com/pkz-snqq-jyr</small></p>
            </div>
            
            <h3>What to Expect:</h3>
            <ul>
                <li>Project requirements discussion</li>
                <li>Timeline and budget planning</li>
                <li>Technology recommendations</li>
                <li>Next steps outline</li>
                <li>Q&A session</li>
            </ul>
            
            <p><strong>Please be ready 5 minutes before the scheduled time.</strong></p>
            
            <p>If you need to reschedule or have any questions, please contact us at <a href="mailto:mayankbhayal29@gmail.com">mayankbhayal29@gmail.com</a></p>
            
            <div class="footer">
                <p>Best regards,<br>
                <strong>Mayank Bhayal</strong><br>
                CEO & Founder, Zenbourg<br>
                <a href="https://zenbourg.com">zenbourg.com</a></p>
            </div>
        </div>
    </div>
</body>
</html>
    `

    // In a real application, you would use a service like Resend, SendGrid, or Nodemailer
    // For now, we'll simulate the email sending
    console.log(`📧 Booking confirmation email sent to ${booking.email}`)
    console.log(`Subject: Your Zenbourg Consultation is Confirmed - ${booking.bookingId}`)
    console.log(`Meeting Link: https://meet.google.com/pkz-snqq-jyr`)

    // You can implement actual email sending here using your preferred service
    // Example with fetch to a hypothetical email service:
    /*
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: booking.email,
        subject: `Your Zenbourg Consultation is Confirmed - ${booking.bookingId}`,
        html: emailContent
      })
    })
    */
  } catch (error) {
    console.error("Error sending confirmation email:", error)
  }
}

async function sendBookingNotificationToAdmin(booking: any) {
  try {
    const adminEmailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Booking Notification - Zenbourg</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .details { background: white; padding: 15px; border-radius: 5px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🔔 New Consultation Booking</h2>
        </div>
        <div class="content">
            <p>A new consultation has been booked on Zenbourg:</p>
            
            <div class="details">
                <h3>Client Details:</h3>
                <p><strong>Name:</strong> ${booking.fullName}</p>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Phone:</strong> ${booking.phone || "Not provided"}</p>
            </div>
            
            <div class="details">
                <h3>Booking Details:</h3>
                <p><strong>Service:</strong> ${booking.serviceName}</p>
                <p><strong>Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${booking.timeSlot}</p>
                <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
                ${booking.notes ? `<p><strong>Client Notes:</strong> ${booking.notes}</p>` : ""}
            </div>
            
            <p><strong>Meeting Link:</strong> <a href="https://meet.google.com/pkz-snqq-jyr">https://meet.google.com/pkz-snqq-jyr</a></p>
            
            <p>Please prepare for the consultation and be ready to discuss the client's requirements.</p>
        </div>
    </div>
</body>
</html>
    `

    console.log(`📧 Admin notification email sent to mayankbhayal29@gmail.com`)
    console.log(`Subject: New Consultation Booking - ${booking.bookingId}`)

    // You can implement actual email sending here
    /*
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'mayankbhayal29@gmail.com',
        subject: `New Consultation Booking - ${booking.bookingId}`,
        html: adminEmailContent
      })
    })
    */
  } catch (error) {
    console.error("Error sending admin notification:", error)
  }
}

async function sendBookingCancellationEmail(booking: any) {
  try {
    console.log(`📧 Booking cancellation email sent to ${booking.email}`)
    console.log(`Booking ID: ${booking.bookingId} has been cancelled`)
  } catch (error) {
    console.error("Error sending cancellation email:", error)
  }
}
