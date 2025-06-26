"use client" // This page needs to be a client component for form interactions

import type React from "react" // Keep if other React specific types are used
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react" // Keep for user session if needed for prefill

// For fetching initial static text content and services list
// This part would ideally be passed as props from a Server Component parent,
// or fetched in a useEffect if this page is loaded directly.
// For simplicity in this refactor, we'll assume these are fetched once.
// In a real app, you might fetch pageContent via an API route or pass from server.

// Mock fetching for page content and services for client component
// In a real app, this data would be fetched via API or passed as props
interface PageTextContent {
  [key: string]: string
}
interface ServiceOption {
  id: string
  name: string
  slug: string
}

const today = new Date().toISOString().split("T")[0]

export default function BookConsultationPage() {
  const { data: session, status } = useSession()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "", // Will store service slug or ID
    date: "",
    timeSlot: "",
    notes: "",
  })
  const [timeZone, setTimeZone] = useState("")
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // State for dynamic text content and services list
  const [pageText, setPageText] = useState<PageTextContent>({})
  const [servicesList, setServicesList] = useState<ServiceOption[]>([])

  useEffect(() => {
    // Fetch dynamic content and services list
    const fetchData = async () => {
      try {
        // Simulate API call for page content
        const contentRes = await fetch("/api/page-content?pageKey=book_consultation_page")
        if (contentRes.ok) setPageText(await contentRes.json())
        else
          setPageText({
            // Fallbacks
            main_title: "Book Your Free Consultation",
            main_description:
              "Schedule a personalized consultation with our experts to discuss your project requirements and goals.",
            sidebar_timezone_title: "Your Timezone",
            sidebar_timezone_note: "All times are shown in your local timezone",
            sidebar_availability_title: "Availability",
            sidebar_availability_line1: "Monday - Friday",
            sidebar_availability_line2: "9:00 AM - 5:00 PM",
            sidebar_availability_line3: "30-minute sessions",
            sidebar_expect_title: "What to Expect",
            sidebar_expect_item1: "Project requirements discussion",
            sidebar_expect_item2: "Timeline and budget planning",
            sidebar_expect_item3: "Technology recommendations",
            sidebar_expect_item4: "Next steps outline",
            sidebar_expect_item5: "Q&A session",
          })

        // Simulate API call for services list
        const servicesRes = await fetch("/api/services-list") // You'd need this API endpoint
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json()
          setServicesList(servicesData.map((s: any) => ({ id: s.id, name: s.name, slug: s.slug })))
        } else {
          // Fallback services
          setServicesList([
            { id: "website-development", name: "Website Development", slug: "website-development" },
            { id: "ui-ux-design", name: "UI/UX Design", slug: "ui-ux-design" },
            // Add other services as fallback
          ])
        }
      } catch (error) {
        console.error("Failed to fetch initial data for booking page:", error)
        // Set default texts if fetch fails
        setPageText({
          /* ... default texts ... */
        })
        setServicesList([
          /* ... default services ... */
        ])
      }
    }
    fetchData()

    const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setTimeZone(detectedTimeZone)
  }, [])

  useEffect(() => {
    if (session?.user?.name && !formData.fullName) {
      setFormData((prev) => ({ ...prev, fullName: session.user.name! }))
    }
    if (session?.user?.email && !formData.email) {
      setFormData((prev) => ({ ...prev, email: session.user.email! }))
    }
  }, [session])

  useEffect(() => {
    if (formData.date) {
      generateTimeSlots(formData.date)
    } else {
      setAvailableSlots([]) // Clear slots if no date selected
    }
  }, [formData.date])

  const generateTimeSlots = (selectedDate: string) => {
    const slots: string[] = []
    const date = new Date(selectedDate)
    // Ensure time is set to start of day in UTC for consistent date comparison
    date.setUTCHours(0, 0, 0, 0)

    const todayDate = new Date()
    todayDate.setUTCHours(0, 0, 0, 0) // Compare dates only

    const isToday = date.getTime() === todayDate.getTime()
    const now = new Date() // Current time for comparison if it's today

    for (let hour = 9; hour < 17; hour++) {
      // 9 AM to 4:30 PM (last slot starts at 4:30)
      for (let minute = 0; minute < 60; minute += 30) {
        const slotDateTime = new Date(selectedDate) // Use selectedDate to avoid timezone issues from local new Date()
        slotDateTime.setHours(hour, minute, 0, 0)

        // Skip past slots for today
        if (isToday && slotDateTime <= now) {
          continue
        }

        slots.push(
          slotDateTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
        )
      }
    }
    setAvailableSlots(slots)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const selectedServiceObj = servicesList.find((s) => s.slug === formData.service)
      const response = await fetch("/api/bookings", {
        // Ensure this API endpoint exists and is robust
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          serviceName: selectedServiceObj?.name || formData.service, // Send service name
          timeZone,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Booking Confirmed!",
          description: `Your consultation for ${selectedServiceObj?.name || formData.service} is scheduled for ${formData.date} at ${formData.timeSlot}. Booking ID: ${result.bookingId}`,
        })
        setFormData({ fullName: "", email: "", phone: "", service: "", date: "", timeSlot: "", notes: "" })
      } else {
        const errorResult = await response.json().catch(() => ({ message: "Failed to book consultation" }))
        throw new Error(errorResult.message || "Failed to book consultation")
      }
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error booking your consultation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === "loading" && (!Object.keys(pageText).length || !servicesList.length)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {pageText.main_title || "Book Your Free Consultation"}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {pageText.main_description ||
              "Schedule a personalized consultation with our experts to discuss your project requirements and goals."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Consultation Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="service">Service of Interest</Label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {servicesList.map((service) => (
                            <SelectItem key={service.slug} value={service.slug}>
                              {" "}
                              {/* Use slug as value */}
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Preferred Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        min={today}
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="timeSlot">Time Slot *</Label>
                      <Select
                        value={formData.timeSlot}
                        onValueChange={(value) => handleInputChange("timeSlot", value)}
                        disabled={!formData.date || availableSlots.length === 0}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              !formData.date
                                ? "Select date first"
                                : availableSlots.length === 0
                                  ? "No slots available"
                                  : "Select time"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Tell us more about your project or any specific requirements..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={
                      isSubmitting || !formData.fullName || !formData.email || !formData.date || !formData.timeSlot
                    }
                  >
                    {isSubmitting ? "Booking..." : "Book Consultation"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{pageText.sidebar_timezone_title || "Your Timezone"}</span>
                </div>
                <p className="text-sm text-gray-600">{timeZone}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {pageText.sidebar_timezone_note || "All times are shown in your local timezone"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{pageText.sidebar_availability_title || "Availability"}</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{pageText.sidebar_availability_line1 || "Monday - Friday"}</p>
                  <p>{pageText.sidebar_availability_line2 || "9:00 AM - 5:00 PM"}</p>
                  <p>{pageText.sidebar_availability_line3 || "30-minute sessions"}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">{pageText.sidebar_expect_title || "What to Expect"}</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• {pageText.sidebar_expect_item1 || "Project requirements discussion"}</li>
                  <li>• {pageText.sidebar_expect_item2 || "Timeline and budget planning"}</li>
                  <li>• {pageText.sidebar_expect_item3 || "Technology recommendations"}</li>
                  <li>• {pageText.sidebar_expect_item4 || "Next steps outline"}</li>
                  <li>• {pageText.sidebar_expect_item5 || "Q&A session"}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
