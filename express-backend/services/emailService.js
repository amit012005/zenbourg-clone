// MOCK Email Service - Replace with actual implementation (e.g., Nodemailer, SendGrid)
require("dotenv").config()

const sendEmail = async ({ to, subject, text, html }) => {
  console.log("--- MOCK EMAIL ---")
  console.log(`To: ${to}`)
  console.log(`From: ${process.env.EMAIL_FROM_ADDRESS}`)
  console.log(`Subject: ${subject}`)
  console.log(`Text Body: ${text}`)
  if (html) console.log(`HTML Body: Present`)
  console.log("--- END MOCK EMAIL ---")
  // In a real app, you'd use a library like Nodemailer here
  // Example:
  // const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, ... });
  // await transporter.sendMail({ from: process.env.EMAIL_FROM_ADDRESS, to, subject, text, html });
  return Promise.resolve({ messageId: "mock_message_id" })
}

const sendVerificationEmail = async (email, verificationCode) => {
  const subject = "Verify Your Email Address for Zenbourg"
  const verificationLink = `http://localhost:3000/verify-email?code=${verificationCode}&email=${email}` // Adjust frontend URL
  const text = `Welcome to Zenbourg! Please verify your email by clicking the following link or using the code: ${verificationCode}\nLink: ${verificationLink}`
  const html = `<p>Welcome to Zenbourg!</p><p>Please verify your email by clicking the link below or using the code: <strong>${verificationCode}</strong></p><a href="${verificationLink}">Verify Email</a>`

  return sendEmail({ to: email, subject, text, html })
}

const sendBookingConfirmationEmail = async (userEmail, bookingDetails, googleMeetLink) => {
  const subject = "Your Zenbourg Consultation Booking Confirmed!"
  const text = `Hi ${bookingDetails.name},\n\nYour consultation for "${bookingDetails.project_details || "your project"}" is confirmed.\n\nJoin using this Google Meet link: ${googleMeetLink}\nPreferred Date: ${new Date(bookingDetails.preferred_date).toLocaleString()}\n\nWe look forward to speaking with you!\n\nThe Zenbourg Team`
  const html = `<p>Hi ${bookingDetails.name},</p><p>Your consultation for "<strong>${bookingDetails.project_details || "your project"}</strong>" is confirmed.</p><p>Join using this Google Meet link: <a href="${googleMeetLink}">${googleMeetLink}</a></p><p>Preferred Date: ${new Date(bookingDetails.preferred_date).toLocaleString()}</p><p>We look forward to speaking with you!</p><p>The Zenbourg Team</p>`

  return sendEmail({ to: userEmail, subject, text, html })
}

const sendAdminBookingNotificationEmail = async (adminEmail, bookingDetails, googleMeetLink) => {
  const subject = `New Consultation Booking: ${bookingDetails.name} - ${bookingDetails.email}`
  const text = `A new consultation has been booked:\n\nName: ${bookingDetails.name}\nEmail: ${bookingDetails.email}\nPhone: ${bookingDetails.phone || "N/A"}\nCompany: ${bookingDetails.company_name || "N/A"}\nProject Details: ${bookingDetails.project_details || "N/A"}\nPreferred Date: ${new Date(bookingDetails.preferred_date).toLocaleString()}\nGoogle Meet Link: ${googleMeetLink}\n\nBooking ID: ${bookingDetails.id}`
  // Add more details as needed in HTML if preferred

  return sendEmail({ to: adminEmail, subject, text })
}

module.exports = {
  sendVerificationEmail,
  sendBookingConfirmationEmail,
  sendAdminBookingNotificationEmail,
  // sendEmail // if you need a generic one
}
