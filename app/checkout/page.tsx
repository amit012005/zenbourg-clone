// Assuming 'use client' for potential Stripe.js integration or other client interactions
"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, AlertCircle } from "lucide-react"
import type { ServiceData } from "@/types/page-data" // Assuming ServiceData type
import type { PageTextContent } from "@/types/page-data"

// Mock function to get service details, replace with actual API call or prop passing
async function fetchServiceDetails(serviceId: string): Promise<ServiceData | null> {
  // In a real app, call your API: const res = await fetch(`/api/services/${serviceId}`)
  // For demo, using a fallback.
  if (serviceId === "website-development") {
    return {
      id: "1",
      slug: "website-development",
      name: "Website Development",
      price: 2999,
      description: "Custom websites",
      features: [],
      is_popular: false,
    }
  }
  return null
}

// Mock function to get page content
async function fetchPageContent(pageKey: string): Promise<PageTextContent> {
  // const res = await fetch(`/api/page-content?pageKey=${pageKey}`);
  // if (res.ok) return res.json();
  return {
    // Fallback
    main_title: "Complete Your Secure Payment",
    main_description: "Review your service details and complete the payment to get started.",
    service_details_title: "Service Details",
    payment_info_title: "Payment Information",
    pay_button_text: "Pay Now",
  }
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const serviceId = searchParams.get("serviceId") // Or however you pass service info

  const [service, setService] = useState<ServiceData | null>(null)
  const [pageContent, setPageContent] = useState<PageTextContent>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      setError(null)
      try {
        if (serviceId) {
          const fetchedService = await fetchServiceDetails(serviceId) // Replace with actual fetch
          if (!fetchedService) throw new Error("Service not found.")
          setService(fetchedService)
        } else {
          // setError("No service selected for checkout.");
          // For demo, let's assume a default or allow proceeding without specific service
          console.warn("No serviceId found in URL for checkout.")
        }
        const content = await fetchPageContent("checkout_page") // Replace with actual fetch
        setPageContent(content)
      } catch (err: any) {
        setError(err.message || "Failed to load checkout details.")
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [serviceId])

  const handlePayment = async () => {
    if (!service) {
      setError("Service details are missing. Cannot proceed with payment.")
      return
    }
    setIsProcessing(true)
    setError(null)
    // Simulate payment processing
    console.log("Processing payment for:", service.name, "Amount:", service.price)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

    // Example: Call your /api/payments route
    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id, // or slug
          amount: service.price,
          paymentMethod: "card_mock", // From your payment form
          // ... other payment details
        }),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || "Payment failed")
      }
      alert(`Payment successful! Payment ID: ${result.paymentId}`) // Replace with toast or redirect
      // router.push('/thank-you');
    } catch (paymentError: any) {
      setError(paymentError.message || "An error occurred during payment.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {pageContent.main_title || "Complete Your Secure Payment"}
            </CardTitle>
            <CardDescription className="text-center">
              {pageContent.main_description || "Review your service details and complete the payment."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {service && (
              <div className="border p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">{pageContent.service_details_title || "Service Details"}</h3>
                <p>
                  <strong>Service:</strong> {service.name}
                </p>
                <p>
                  <strong>Price:</strong> ${service.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              </div>
            )}

            {!service && !isLoading && !error && (
              <Alert variant="default">
                <AlertDescription>
                  No specific service selected. Proceeding with general payment if applicable, or select a service
                  first.
                </AlertDescription>
              </Alert>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-2">{pageContent.payment_info_title || "Payment Information"}</h3>
              {/* Placeholder for actual payment form (e.g., Stripe Elements) */}
              <div className="border p-4 rounded-md bg-gray-100 text-center">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Payment form (e.g., Stripe Elements) would be here.</p>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full"
              disabled={isProcessing || !service} // Disable if no service or processing
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                pageContent.pay_button_text || "Pay Now"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
