"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function CustomWebsiteConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const requestId = searchParams.get("requestId")

  useEffect(() => {
    if (!requestId) {
      router.push("/custom-website")
    }
  }, [requestId, router])

  if (!requestId) {
    return null
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-green-500">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Thank you for your interest in our custom website services. Our team will review your requirements and get
              back to you within 24-48 hours.
            </p>

            <div className="mb-8 text-left max-w-md mx-auto">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Request Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Request ID:</span>
                  <span className="font-medium">{requestId}</span>

                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-blue-600">Under Review</span>

                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">What would you like to do next?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/services">
                    Browse Our Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
