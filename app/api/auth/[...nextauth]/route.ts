import NextAuth from "next-auth"
import type { NextAuthOptions, User as NextAuthUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { env } from "@/lib/env" // Using the centralized env import

// Demo users for testing without a database
const DEMO_USERS = [
  {
    id: "1",
    name: "Administrator",
    email: "admin@zenbourg.com",
    password: "password123", // In a real app, this would be hashed
    role: "admin",
  },
  {
    id: "2",
    name: "Demo User",
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "user",
  },
]

interface CustomUser extends NextAuthUser {
  role?: string
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      id: "credentials", // Ensure id is explicitly set
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john.doe@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          // As per NextAuth docs, throwing an error here is a way to signal auth failure
          // This error message will be available on the error page via query params
          throw new Error("Please provide both email and password.")
        }

        try {
          const user = DEMO_USERS.find((u) => u.email === credentials.email && u.password === credentials.password)

          if (user) {
            // Return the user object that will be encoded in the JWT
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            } as CustomUser // Cast to ensure role is included
          } else {
            // If user not found or password doesn't match
            // Throwing an error is preferred for Credentials provider to show specific messages
            throw new Error("Invalid credentials. Please try again.")
          }
        } catch (error: any) {
          console.error("Authorization Error:", error.message)
          // Re-throw the error so NextAuth can handle it and redirect to the error page
          // The error message can be picked up by the custom error page
          throw new Error(error.message || "An unexpected error occurred during authorization.")
        }
      },
    }),
    // Only include Google provider if environment variables are available
    ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            // Ensure profile callback returns all necessary fields
            profile(profile) {
              return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
                role: profile.role || "user", // Assuming role might come from profile or default
              } as CustomUser
            },
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/signin",
    error: "/auth/error", // Custom error page path
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and user role to the token right after signin
      if (account && user) {
        // `user` is only passed on first sign-in
        token.accessToken = account.access_token
        token.id = user.id
        token.role = (user as CustomUser).role || "user"
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user role from the JWT
      if (session.user) {
        ;(session.user as CustomUser).id = token.id as string
        ;(session.user as CustomUser).role = token.role as string
      }
      return session
    },
    // The redirect callback is already quite permissive, which is good.
    // async redirect({ url, baseUrl }) {
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
    //   if (url.startsWith(baseUrl)) return url
    //   return baseUrl
    // },
  },
  secret: env.NEXTAUTH_SECRET, // Use the centralized env
  debug: env.NODE_ENV === "development", // Enable debug mode in development
  logger: {
    // Add basic logging
    error(code, metadata) {
      console.error(`NextAuth Error - Code: ${code}`, metadata)
    },
    warn(code) {
      console.warn(`NextAuth Warning - Code: ${code}`)
    },
    // debug(code, metadata) {
    //   console.log(`NextAuth Debug - Code: ${code}`, metadata);
    // }
  },
  trustHost: true, // Already present, good for Vercel deployments
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
