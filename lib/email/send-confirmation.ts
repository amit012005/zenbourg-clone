// ✅ 4. /lib/email/send-confirmation.ts
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export async function sendConfirmationEmail(to: string, name: string, service: string) {
  const info = await transporter.sendMail({
    from: `Consulting Team <${process.env.EMAIL_FROM}>`,
    to,
    subject: "Your Consultation Request Has Been Received!",
    html: `
      <h2>Hi ${name},</h2>
      <p>Thank you for choosing our <strong>${service}</strong> service.</p>
      <p>We’ve received your consultation request and will contact you shortly.</p>
      <p><em>— The Consulting Team</em></p>
    `
  })

  console.log("Confirmation email sent: %s", info.messageId)
}
