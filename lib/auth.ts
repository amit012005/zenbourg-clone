import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

// In production, this would connect to your database
const users = [
  {
    id: "1",
    email: "admin@zenbourg.com",
    password: "password123", // In production, this would be hashed
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "password123", // In production, this would be hashed
    name: "Test User",
    role: "user",
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    // Only include Google provider if environment variables are available
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          // Find user in mock database
          const user = users.find((u) => u.email === credentials.email)

          if (!user) {
            return null
          }

          // Simple password check (in production, use bcrypt)
          if (credentials.password !== user.password) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.role = (user as any).role
        }
        return token
      } catch (error) {
        console.error("JWT callback error:", error)
        return token
      }
    },
    async session({ session, token }) {
      try {
        if (token) {
          ;(session.user as any).id = token.sub
          ;(session.user as any).role = token.role
        }
        return session
      } catch (error) {
        console.error("Session callback error:", error)
        return session
      }
    },
  },
  // Use a default secret if NEXTAUTH_SECRET is not provided
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
}
