export function checkRequiredEnvVars() {
  // Check for required environment variables
  const required = ["NEXTAUTH_SECRET"]
  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(", ")}`)
    console.warn("Using fallback values for development. Please set these in production.")
  }

  return missing.length === 0
}

export function getNextAuthConfig() {
  return {
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only",
    googleEnabled: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  }
}

// Initialize environment check
if (typeof window === "undefined") {
  checkRequiredEnvVars()
}
