import { NextResponse } from "next/server"
import { Pool } from "pg"
import nodemailer from "nodemailer"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// Configure Gmail SMTP using your .env values
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Send welcome email after verification
async function sendWelcomeEmail(email: string, name: string) {
  const mailOptions = {
    from: `"Zenbourg" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎉 Welcome to Zenbourg!",
    text: `Hi ${name},\n\nThanks for verifying your email. Welcome aboard!\n\n- YourApp Team`,
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for verifying your email. Welcome to <strong>Zenbourg</strong>!</p>
      <p>We're excited to have you onboard.</p>
      <p>Cheers,<br/>The Zenbourg Team</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}

export async function POST(req: Request) {
  const client = await pool.connect()

  try {
    const { email, code } = await req.json()

    await client.query("BEGIN")

    const res = await client.query(
      `SELECT * FROM pending_users WHERE email = $1 FOR UPDATE`,
      [email]
    )

    const pu = res.rows[0]

    if (!pu || pu.verification_code !== code) {
      await client.query("ROLLBACK")
      client.release()
      return NextResponse.json({ message: "Invalid verification code" }, { status: 400 })
    }

    await client.query(
      `INSERT INTO users (name, email, password_hash, role, created_at, updated_at)
       VALUES ($1, $2, $3, 'user', NOW(), NOW())`,
      [pu.name, pu.email, pu.password_hash]
    )

    await client.query(`DELETE FROM pending_users WHERE id = $1`, [pu.id])

    await client.query("COMMIT")
    client.release()

    // Send welcome email
    try {
      await sendWelcomeEmail(pu.email, pu.name)
    } catch (mailErr) {
      console.error("❌ Failed to send welcome email:", mailErr)
      // Do not throw — welcome email is optional
    }

    return NextResponse.json({ message: "Email verified. Welcome!" }, { status: 200 })

  } catch (err) {
    await client.query("ROLLBACK")
    client.release()
    console.error("❌ Verification failed:", err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
