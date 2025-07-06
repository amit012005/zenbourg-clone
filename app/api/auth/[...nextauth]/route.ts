import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { compare } from "bcryptjs"
import { Pool } from "pg"
import nodemailer from "nodemailer"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Setup nodemailer transporter (using Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
})

async function sendWelcomeEmail(email: string, name: string) {
  await transporter.sendMail({
    from: `"YourApp" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎉 Welcome to YourApp!",
    html: `
      <p>Hi ${name},</p>
      <p>Welcome aboard! We're excited to have you with us.</p>
      <p>— The YourApp Team</p>
    `,
  })
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const res = await pool.query("SELECT * FROM users WHERE email = $1", [credentials.email])
        const user = res.rows[0]
        if (!user || !user.password_hash) throw new Error("User not found")

        const isValid = await compare(credentials.password, user.password_hash)
        if (!isValid) throw new Error("Invalid credentials")
        return {
          id: user.id, // your UUID or DB user ID
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const client = await pool.connect()
        try {
          let res = await client.query("SELECT * FROM users WHERE email = $1", [user.email])
          let existingUser = res.rows[0]

          if (!existingUser) {
            await client.query(
              `
              INSERT INTO users (name, email, password_hash, role, email_verified, created_at, updated_at)
              VALUES ($1, $2, '', 'user', true, NOW(), NOW())
              `,
              [user.name, user.email]
            )
            await sendWelcomeEmail(user.email!, user.name || "User")

            // Fetch the newly created user with id
            res = await client.query("SELECT * FROM users WHERE email = $1", [user.email])
            existingUser = res.rows[0]
          }
          user.id = existingUser.id
          user.role = existingUser.role
          // You can't modify 'user' here for JWT; use jwt callback to set token
          // So no assignment to user.id here
        } catch (err) {
          console.error("Google sign-in error:", err)
          return false
        } finally {
          client.release()
        }
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        // Initial sign in: set token fields from user
        token.id = user.id
        token.role = user.role ?? "user"
        token.email = user.email
      } else if (!token.id && token.email) {
        // Subsequent requests: fetch user from DB to get id and role
        const client = await pool.connect()
        try {
          const res = await client.query("SELECT id, role FROM users WHERE email = $1", [token.email])
          if (res.rows.length) {
            token.id = res.rows[0].id
            token.role = res.rows[0].role ?? "user"
          }
        } catch (error) {
          console.error("JWT callback DB lookup error:", error)
        } finally {
          client.release()
        }
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.email = token.email
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
