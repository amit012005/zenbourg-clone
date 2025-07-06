import { NextResponse } from "next/server"
import { Pool } from "pg"
import nodemailer from "nodemailer"
import { randomBytes } from "crypto"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
})

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 })

  const client = await pool.connect()
  try {
    const userRes = await client.query("SELECT id, name FROM users WHERE email = $1", [email])
    if (userRes.rowCount === 0) {
      client.release()
      return NextResponse.json({ message: "If that email exists, a reset link has been sent." })
    }

    const token = randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await client.query(`
      INSERT INTO password_resets (user_id, token, expires_at)
      VALUES ($1, $2, $3)
    `, [userRes.rows[0].id, token, expires])

    await transporter.sendMail({
      from: `Zenbourg <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hi ${userRes.rows[0].name},</p>
        <p>Click <a href="${process.env.NEXTAUTH_URL}/reset-password?token=${token}">here</a> to reset your password.</p>
      `,
    })
    return NextResponse.json({ message: "If that email exists, a reset link has been sent." })
  } catch (err) {
    console.error("Forgot password error:", err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  } finally {
    client.release()
  }
}
