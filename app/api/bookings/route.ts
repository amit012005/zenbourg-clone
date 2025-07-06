import { NextResponse } from "next/server"
import { Pool } from "pg"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import nodemailer from "nodemailer"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
})

const GOOGLE_MEET_BASE_URL = process.env.GOOGLE_MEET_BASE_URL || "https://meet.google.com/your-default-meet"

async function sendBookingConfirmationEmail({
  email,
  name,
  service,
  date,
  timeSlot,
  notes,
  timezone,
  bookingId,
}: {
  email: string
  name: string
  service: string
  date: string
  timeSlot: string
  notes?: string
  timezone: string
  bookingId: string
}) {
  const googleMeetLink = "https://meet.google.com/sho-kvyf-jbi"

  const mailOptions = {
    from: `"YourApp" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "✅ Your Consultation is Confirmed",
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for booking a consultation. Here are your meeting details:</p>
      <ul>
        
        <li><strong>Service:</strong> ${service}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${timeSlot} (${timezone})</li>
        <li><strong>Google Meet Link:</strong> <a href="${googleMeetLink}" target="_blank">${googleMeetLink}</a></li>
        ${notes ? `<li><strong>Notes:</strong> ${notes}</li>` : ""}
      </ul>
      <p>We look forward to speaking with you!</p>
      <p>— YourApp Team</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}

export async function POST(req: Request) {
  const data = await req.json()

  const {
    fullName,
    email,
    phone,
    serviceId,
    serviceName,
    date,
    timeSlot,
    notes,
    timeZone,
  } = data

  const session = await getServerSession(authOptions)
  const userId = session?.user?.id ?? null

  const bookingId = `BOOK-${Math.floor(100000 + Math.random() * 900000)}`
  console.log("Bharat Kumar",session.user.email)
  const client = await pool.connect()
  try {
    await client.query(
      `
      INSERT INTO bookings (
        booking_id,
        user_id,
        full_name,
        email,
        phone,
        service_id,
        service_name,
        booking_date,
        time_slot,
        timezone,
        notes
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      )
    `,
      [
        bookingId,
        userId,
        fullName,
        email,
        phone,
        serviceId || null,
        serviceName,
        date,
        timeSlot,
        timeZone,
        notes,
      ]
    )

    await sendBookingConfirmationEmail({
      email,
      name: fullName,
      service: serviceName,
      date,
      timeSlot,
      notes,
      timezone: timeZone,
      bookingId,
    })

    return NextResponse.json({ bookingId }, { status: 200 })
  } catch (err) {
    console.error("Booking insert error:", err)
    return NextResponse.json({ message: "Booking failed" }, { status: 500 })
  } finally {
    client.release()
  }
}
