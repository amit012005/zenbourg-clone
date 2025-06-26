"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, HelpCircle } from "lucide-react" // Added HelpCircle for unknown errors
import Link from "next/link"

// It's good practice to keep this map comprehensive
// Based on https://next-auth.js.org/configuration/pages#error-page
const errorMessages: Record<string, string> = {
  Signin: "Try signing in with a different account.",
  OAuthSignin: "Try signing in with a different account.",
  OAuthCallback:
    "Try signing in with a different account. This can happen if you navigated away from the OAuth provider page before completing authentication.",
  OAuthCreateAccount: "Could not create account using this OAuth provider. Try a different method or contact support.",
  EmailCreateAccount: "Could not create account with this email. Try a different method or contact support.",
  Callback: "Error in OAuth callback. Please try again.",
  OAuthAccountNotLinked:
    "This OAuth account is not linked. To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Failed to send sign-in email. Check your email address or try again later.",
  CredentialsSignin: "Sign in failed. Please check the credentials you provided and try again.",
  SessionRequired: "Please sign in to access this page.",
  Default: "An unknown authentication error occurred. Please try again or contact support.",
  Configuration: "There is a server configuration issue. Please contact support.",
  AccessDenied: "You do not have permission to perform this action or access this resource.",
  Verification: "The verification token is invalid or has expired. Please try again.",
  // Custom errors thrown from authorize function
  "Please provide both email and password.": "Please ensure you enter both your email and password.",
  "Invalid credentials. Please try again.": "The email or password you entered is incorrect. Please try again.",
  "An unexpected error occurred during authorization.":
    "An unexpected issue occurred while trying to sign you in. Please try again later.",
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const errorKey = searchParams?.get("error") // This is the key NextAuth provides, e.g., "CredentialsSignin"

  // Determine the message to display
  let displayMessage = errorMessages.Default // Default to a generic unknown error message
  let displayTitle = "Authentication Error"
  let IconComponent = AlertCircle

  if (errorKey && errorMessages[errorKey]) {
    displayMessage = errorMessages[errorKey]
  } else if (errorKey) {
    // If an errorKey is present but not in our map, display it directly but still use a generic title
    // This can happen if NextAuth introduces new error keys or if a custom error is thrown without being in the map
    displayMessage = `An unexpected error occurred: ${errorKey}. Please contact support if this persists.`
    IconComponent = HelpCircle // Use a different icon for truly unknown/unmapped errors
  } else {
    // If no errorKey is provided at all in the URL
    displayTitle = "Error Information Missing"
    displayMessage = "No specific error information was provided. Please return to the sign-in page and try again."
    IconComponent = HelpCircle
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
        <CardHeader className="text-center">
          <div
            className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${errorKey && errorMessages[errorKey] ? "bg-red-100 dark:bg-red-900" : "bg-yellow-100 dark:bg-yellow-900"}`}
          >
            <IconComponent
              className={`h-6 w-6 ${errorKey && errorMessages[errorKey] ? "text-red-600 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"}`}
            />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">{displayTitle}</CardTitle>
          {displayMessage && (
            <CardDescription className="mt-2 text-gray-600 dark:text-gray-300">{displayMessage}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <Button asChild className="w-full">
              <Link href="/signin">Try Sign In Again</Link>
            </Button>
          </div>
          <div className="text-center">
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
