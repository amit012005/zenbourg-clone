import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const error = searchParams.get("error") || "Unknown"

    // Return a JSON response instead of redirecting
    return NextResponse.json(
      {
        error: error,
        message: getErrorMessage(error),
        timestamp: new Date().toISOString(),
        redirectUrl: `/auth/error?error=${encodeURIComponent(error)}`,
      },
      { status: 400 },
    )
  } catch (err) {
    console.error("Error in auth error route:", err)

    return NextResponse.json(
      {
        error: "InternalError",
        message: "An internal server error occurred",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}

function getErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "Configuration":
      return "There is a problem with the server configuration."
    case "AccessDenied":
      return "You do not have permission to sign in."
    case "Verification":
      return "The verification token has expired or has already been used."
    case "CredentialsSignin":
      return "The email or password you entered is incorrect."
    case "OAuthSignin":
    case "OAuthCallback":
    case "OAuthCreateAccount":
    case "EmailCreateAccount":
    case "Callback":
      return "There was a problem with the authentication process."
    case "OAuthAccountNotLinked":
      return "This email is already associated with an account using a different sign-in method."
    case "EmailSignin":
      return "Unable to send verification email."
    case "SessionRequired":
      return "You must be signed in to access this page."
    default:
      return "An unexpected error occurred during authentication."
  }
}
