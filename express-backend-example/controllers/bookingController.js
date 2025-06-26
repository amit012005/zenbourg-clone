const asyncHandler = require("express-async-handler")
const db = require("../config/db")
const { sendEmail } = require("../services/emailService")
const { createGoogleMeetEvent } = require("../services/googleCalendarService")
require("dotenv").config()

// @desc    Create a new consultation booking
// @route   POST /api/bookings
// @access  Public (or Private if only logged-in users can book)
const createBooking = asyncHandler(async (req, res) => {
  const { name, email, phone, companyName, projectDetails, preferredDate } = req.body

  if (!name || !email || !projectDetails || !preferredDate) {
    res.status(400)
    throw new Error("Please provide name, email, project details, and preferred date.")
  }

  // Basic date validation (ensure it's in the future)
  if (new Date(preferredDate) <= new Date()) {
    res.status(400)
    throw new Error("Preferred date must be in the future.")
  }

  // Optional: Link to user_id if the user is logged in and req.user is available
  const userId = req.user ? req.user.id : null

  const newBookingResult = await db.query(
    `INSERT INTO consultation_bookings 
      (user_id, name, email, phone, company_name, project_details, preferred_date, status) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [userId, name, email, phone, companyName, projectDetails, new Date(preferredDate), "pending_confirmation"],
  )
  const booking = newBookingResult.rows[0]

  if (booking) {
    // 1. Create Google Meet link (mocked)
    const summary = `Consultation: ${name} - ${companyName || "N/A"}`
    const description = `Project Details: ${projectDetails}\nContact: ${email}, ${phone || "N/A"}`
    // Assuming preferredDate is a full ISO string, adjust for event duration (e.g., 1 hour)
    const startTime = new Date(booking.preferred_date)
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000) // 1 hour later

    const meetLink = await createGoogleMeetEvent({
      summary,
      description,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      attendees: [
        { email: email }, // Client
        { email: process.env.ADMIN_EMAIL_FOR_NOTIFICATIONS }, // Mayank
      ],
    })

    // Update booking with meet link
    await db.query("UPDATE consultation_bookings SET google_meet_link = $1, status = $2 WHERE id = $3", [
      meetLink,
      "confirmed",
      booking.id,
    ])
    booking.google_meet_link = meetLink // Update object for response
    booking.status = "confirmed"

    // 2. Send confirmation email to client (mocked)
    await sendEmail({
      to: email,
      subject: "Your Zenbourg Consultation is Confirmed!",
      text: `Hello ${name},\n\nYour consultation with Zenbourg has been confirmed.\n\nDate: ${new Date(booking.preferred_date).toLocaleString()}\nGoogle Meet Link: ${meetLink}\n\nWe look forward to speaking with you!\n\nThe Zenbourg Team`,
      html: `<p>Hello ${name},</p><p>Your consultation with Zenbourg has been confirmed.</p><p><strong>Date:</strong> ${new Date(booking.preferred_date).toLocaleString()}</p><p><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p><p>We look forward to speaking with you!</p><p>The Zenbourg Team</p>`,
    })

    // 3. Send notification email to admin (mocked)
    await sendEmail({
      to: process.env.ADMIN_EMAIL_FOR_NOTIFICATIONS,
      subject: `New Consultation Booking: ${name}`,
      text: `A new consultation has been booked:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCompany: ${companyName || "N/A"}\nProject: ${projectDetails}\nPreferred Date: ${new Date(booking.preferred_date).toLocaleString()}\nGoogle Meet Link: ${meetLink}`,
      html: `<h3>New Consultation Booking</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || "N/A"}</p><p><strong>Company:</strong> ${companyName || "N/A"}</p><p><strong>Project:</strong> ${projectDetails}</p><p><strong>Preferred Date:</strong> ${new Date(booking.preferred_date).toLocaleString()}</p><p><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>`,
    })

    res.status(201).json(booking)
  } else {
    res.status(400)
    throw new Error("Failed to create booking.")
  }
})

module.exports = { createBooking }
