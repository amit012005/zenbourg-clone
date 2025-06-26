"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Download, Calendar, ArrowRight } from "lucide-react"
import { verifyPayment } from "@/lib/payment-actions"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const paymentId = searchParams.get("paymentId")

  const [isLoading, setIsLoading] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "pending" | "failed">("pending")

  useEffect(() => {
    if (!paymentId) {
      router.push("/services")
      return
    }

    const verifyPaymentStatus = async () => {
      try {
        const result = await verifyPayment(paymentId)

        if (result.success) {
          setPaymentStatus("paid")
        } else {
          setPaymentStatus("failed")
        }
      } catch (error) {
        console.error("Error verifying payment:", error)
        setPaymentStatus("failed")
      } finally {
        setIsLoading(false)
      }
    }

    verifyPaymentStatus()
  }, [paymentId, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
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

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Payment!</h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Your payment has been successfully processed. We've sent a confirmation email with all the details.
            </p>

            <div className="mb-8 text-left max-w-md mx-auto">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Payment Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-medium">{paymentId}</span>

                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Paid</span>

                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>

              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">What would you like to do next?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="link">
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="link">
                  <Link href="/services">
                    Browse More Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
