const asyncHandler = require("express-async-handler")
const db = require("../config/db")
const { createGoogleMeetEvent } = require("../services/googleCalendarService") // Mocked
const {
  sendBookingConfirmationEmail,
  sendAdminBookingNotificationEmail,
  sendEmail,
} = require("../services/emailService") // Mocked
require("dotenv").config()

const ADMIN_EMAIL = "mayankbhayal29@gmail.com" // Centralize admin email

// @desc    Create a new consultation booking
// @route   POST /api/bookings
// @access  Public (or Private if only logged-in users can book)
const createBooking = asyncHandler(async (req, res) => {
  const { name, email, phone, company_name, project_details, preferred_date_str } = req.body
  const userId = req.user ? req.user.id : null // If using authMiddleware, req.user might be available

  if (!name || !email || !preferred_date_str) {
    res.status(400)
    throw new Error("Name, email, and preferred date are required for booking.")
  }

  const preferred_date = new Date(preferred_date_str)
  if (isNaN(preferred_date.getTime())) {
    res.status(400)
    throw new Error("Invalid preferred date format.")
  }

  // 1. Create Google Meet Link (Mocked)
  let googleMeetLink
  try {
    googleMeetLink = await createGoogleMeetEvent({
      email,
      name,
      preferred_date,
      summary: `Consultation: ${name} - ${project_details || "Zenbourg Services"}`,
    })
  } catch (calendarError) {
    console.error("Failed to create Google Meet event:", calendarError)
    // Decide if booking should fail or proceed without link. For now, proceed.
    googleMeetLink = null // Or some placeholder
  }

  // 2. Save booking to database
  const insertQuery = `
    INSERT INTO consultation_bookings 
      (user_id, name, email, phone, company_name, project_details, preferred_date, google_meet_link, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `
  const bookingResult = await db.query(insertQuery, [
    userId,
    name,
    email,
    phone,
    company_name,
    project_details,
    preferred_date,
    googleMeetLink,
    "pending_confirmation",
  ])

  if (bookingResult.rows.length === 0) {
    res.status(500)
    throw new Error("Failed to save booking to database.")
  }
  const newBooking = bookingResult.rows[0]

  // 3. Send confirmation emails (Mocked)
  try {
    if (googleMeetLink) {
      // Only send if meet link was successfully created
      await sendBookingConfirmationEmail(email, newBooking, googleMeetLink)
      await sendAdminBookingNotificationEmail(ADMIN_EMAIL, newBooking, googleMeetLink)
    } else {
      // Send a different email if meet link failed, or just log
      console.warn(`Google Meet link not generated for booking ID ${newBooking.id}. Emails not sent with link.`)
      // Optionally send a basic confirmation without the link
      await sendEmail({
        to: email,
        subject: "Zenbourg Consultation Booking Received",
        text: `Hi ${name},\n\nWe have received your consultation request for "${project_details || "your project"}" for ${preferred_date.toLocaleString()}.\nWe will confirm the details and send a meeting link shortly.\n\nThanks,\nThe Zenbourg Team`,
      })
      await sendEmail({
        to: ADMIN_EMAIL,
        subject: `Booking Request (No Meet Link): ${name}`,
        text: `Booking request from ${name} (${email}) for ${preferred_date.toLocaleString()}. Google Meet link generation failed. Please follow up manually. Booking ID: ${newBooking.id}`,
      })
    }
  } catch (emailError) {
    console.error("Failed to send booking confirmation emails:", emailError)
    // Booking is saved, but emails failed. Log this for manual follow-up.
  }

  res.status(201).json({
    message: "Booking request received. Please check your email for confirmation and Google Meet link shortly.",
    booking: newBooking,
  })
})

// @desc    Get all bookings (Admin only example)
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = asyncHandler(async (req, res) => {
  const result = await db.query("SELECT * FROM consultation_bookings ORDER BY created_at DESC")
  res.status(200).json(result.rows)
})

module.exports = { createBooking, getAllBookings }
