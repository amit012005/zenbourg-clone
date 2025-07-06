import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { Pool } from "pg"
import nodemailer from "nodemailer"
import { randomInt } from "crypto"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,  // your Gmail App Password without spaces
  },
})

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 })
    }

    const client = await pool.connect()
    const exists = await client.query("SELECT 1 FROM users WHERE email = $1", [email])
    if (exists.rows.length > 0) {
      client.release()
      return NextResponse.json({ message: "Email already registered" }, { status: 409 })
    }

    const code = String(randomInt(100000, 999999))
    const passwordHash = await hash(password, 10)

    await client.query(
      `INSERT INTO pending_users (name, email, password_hash, verification_code, code_sent_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [name, email, passwordHash, code]
    )

    await transporter.sendMail({
      from: `"Zenbourg" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your verification code",
      html: `<p>Hi ${name},</p><p>Your verification code is: <strong>${code}</strong></p>`,
    })

    client.release()
    return NextResponse.json({ message: "Verification email sent" }, { status: 201 })
  } catch (err: any) {
    console.error("Registration error:", err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
