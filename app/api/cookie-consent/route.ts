import { type NextRequest, NextResponse } from "next/server"
import { CookieConsentModel } from "@/lib/models/cookie-consent"
import { getServerSession } from "next-auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { necessary, functional, analytics, marketing, preferences } = body

    // Get user session if available
    const session = await getServerSession()
    const userId = session?.user ? Number.parseInt((session.user as any).id) : undefined

    // Get client information
    const ipAddress = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"
    const sessionId =
      request.cookies.get("next-auth.session-token")?.value ||
      request.cookies.get("__Secure-next-auth.session-token")?.value ||
      `anonymous-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const consent = await CookieConsentModel.create({
      userId,
      sessionId,
      ipAddress,
      userAgent,
      necessary: necessary ?? true,
      functional: functional ?? false,
      analytics: analytics ?? false,
      marketing: marketing ?? false,
      preferences,
    })

    return NextResponse.json({
      success: true,
      consentId: consent.consentUuid,
      message: "Cookie consent saved successfully",
    })
  } catch (error) {
    console.error("Cookie consent error:", error)
    return NextResponse.json({ error: "Failed to save cookie consent" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionId =
      request.cookies.get("next-auth.session-token")?.value ||
      request.cookies.get("__Secure-next-auth.session-token")?.value

    if (!sessionId) {
      return NextResponse.json({ consent: null })
    }

    const consent = await CookieConsentModel.findBySessionId(sessionId)

    return NextResponse.json({ consent })
  } catch (error) {
    console.error("Error fetching cookie consent:", error)
    return NextResponse.json({ error: "Failed to fetch cookie consent" }, { status: 500 })
  }
}
