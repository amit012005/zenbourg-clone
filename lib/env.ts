// Environment configuration with fallbacks
export const env = {
  NEXTAUTH_URL:
    process.env.NEXTAUTH_URL || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"),
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
}

// Validate required environment variables
export function validateEnv() {
  const warnings: string[] = []

  if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === "production") {
    warnings.push("NEXTAUTH_SECRET is not set in production")
  }

  if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV === "production") {
    warnings.push("NEXTAUTH_URL is not set in production")
  }

  if (warnings.length > 0) {
    console.warn("Environment warnings:", warnings)
  }

  return warnings.length === 0
}
