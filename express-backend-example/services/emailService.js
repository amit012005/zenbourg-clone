// MOCKED Email Service - Replace with actual implementation (Nodemailer, SendGrid, etc.)
require("dotenv").config()

const sendEmail = async ({ to, subject, text, html }) => {
  console.log("--- MOCK EMAIL ---")
  console.log(`To: ${to}`)
  console.log(`From: ${process.env.EMAIL_FROM_ADDRESS}`)
  console.log(`Subject: ${subject}`)
  console.log(`Text Body: ${text}`)
  if (html) console.log(`HTML Body: ${html.substring(0, 100)}...`)
  console.log("--- END MOCK EMAIL ---")

  // In a real scenario:
  // if (process.env.EMAIL_SERVICE_PROVIDER === 'nodemailer') { /* ... nodemailer logic ... */ }
  // else if (process.env.EMAIL_SERVICE_PROVIDER === 'sendgrid') { /* ... sendgrid logic ... */ }

  return Promise.resolve({ messageId: `mock-${Date.now()}` })
}

module.exports = { sendEmail }
