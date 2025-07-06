import { NextResponse } from "next/server"
import { Pool } from "pg"
import { hash } from "bcryptjs"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export async function POST(req: Request) {
  const { token, password } = await req.json()
  if (!token || !password) return NextResponse.json({ message: "Token and password required" }, { status: 400 })

  const client = await pool.connect()
  try {
    const res = await client.query(`
      SELECT user_id, expires_at FROM password_resets WHERE token = $1
    `, [token])
    const row = res.rows[0]
    if (!row || new Date(row.expires_at) < new Date()) {
      return NextResponse.json({ message: "Token is invalid or expired" }, { status: 400 })
    }

    const pwdHash = await hash(password, 10)
    await client.query(`
      UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2
    `, [pwdHash, row.user_id])

    await client.query(`
      DELETE FROM password_resets WHERE token = $1
    `, [token])

    return NextResponse.json({ message: "Password has been reset" })
  } catch (err) {
    console.error("Reset password error:", err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  } finally {
    client.release()
  }
}
