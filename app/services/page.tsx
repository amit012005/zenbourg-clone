import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight } from "lucide-react"
// Removed BookingModal imports as it's not used directly here after changes
// import BookingModal from "@/components/booking-modal";

import { getAllServices } from "@/lib/data/services-data"
import { getPageTextContent } from "@/lib/data/page-content-data"
import type { ServiceData, PageTextContent } from "@/types/page-data"

export default async function ServicesPage() {
  const services: ServiceData[] = await getAllServices()
  const pageContent: PageTextContent = await getPageTextContent("services_page")

  const handleBookNow = (service: ServiceData) => {
    // This function will be called client-side if we make the button interactive
    // For a server component, the link is generated directly.
    // If client-side interaction is needed, this component part would need 'use client'
    // and this function would be part of that client component.
    // For now, we construct the URL directly in the Link href.
    const params = new URLSearchParams({
      service: service.slug, // Use slug for more robust linking
      serviceName: service.name,
      price: service.price.toString(),
    })
    return `/enterprise-consultation?${params.toString()}`
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {pageContent.main_title || "Our Services"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {pageContent.main_description ||
              "Choose from our comprehensive range of professional services designed to help your business grow and succeed."}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`relative hover:shadow-lg transition-shadow ${service.is_popular ? "ring-2 ring-blue-500" : ""}`}
            >
              {service.is_popular && <Badge className="absolute -top-2 left-4 bg-blue-500">Most Popular</Badge>}
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <div className="text-3xl font-bold text-blue-600">${service.price.toLocaleString()}</div>
                <p className="text-gray-600">{service.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link href={handleBookNow(service)}>
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Website Section */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {pageContent.custom_section_title || "Need Something Custom?"}
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                {pageContent.custom_section_description ||
                  "Have a unique project in mind? We specialize in custom solutions tailored to your specific needs. Let's discuss your requirements and create something amazing together."}
              </p>
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link href="/custom-quote">
                  {pageContent.custom_section_button_text || "Request Custom Quote"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Booking Modal related state and props are removed as it's not directly used here anymore */}
    </div>
  )
}
