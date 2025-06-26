import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin } from "lucide-react"

const timeline = [
  {
    year: "2020",
    title: "Founded",
    description: "Zenbourg was established with a mission to help businesses thrive in the digital age",
  },
  {
    year: "2021",
    title: "100 Clients",
    description: "Reached our first milestone of 100 satisfied clients across 15 countries",
  },
  {
    year: "2022",
    title: "Office Expansion",
    description: "Opened new offices in New York and London to better serve our global clients",
  },
  {
    year: "2023",
    title: "AI Integration",
    description: "Launched our AI tools integration service to help businesses leverage cutting-edge technology",
  },
  {
    year: "2024",
    title: "Industry Recognition",
    description: "Named one of the top digital transformation agencies by Industry Today magazine",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Zenbourg</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're a team of passionate experts dedicated to transforming businesses through innovative digital
            solutions. Our mission is to empower companies to thrive in the digital age with cutting-edge technology and
            strategic thinking.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Zenbourg was founded in 2020 with a simple yet powerful vision: to bridge the gap between cutting-edge
                  technology and business success. Our founders recognized that many companies struggled to navigate the
                  rapidly evolving digital landscape, often missing opportunities for growth and innovation.
                </p>
                <p>
                  Starting with a small team of dedicated experts, we began helping local businesses transform their
                  online presence. Word quickly spread about our results-driven approach, and within a year, we were
                  serving clients across the country.
                </p>
                <p>
                  Today, Zenbourg has grown into a global agency with offices in multiple countries, but our core
                  mission remains unchanged: to deliver exceptional digital solutions that drive real business results.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Zenbourg team working together"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Founder</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leading Zenbourg with vision, innovation, and technical excellence from one of India's premier
              institutions.
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="overflow-hidden max-w-md">
              <div className="aspect-square relative">
                <Image src="/placeholder.svg?height=400&width=400" alt="Mayank Bhayal" fill className="object-cover" />
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="font-bold text-2xl mb-2">Mayank Bhayal</h3>
                <p className="text-blue-600 font-semibold mb-2">CEO & Founder</p>
                <p className="text-gray-600 mb-4">IIT Mandi Alumni</p>
                <p className="text-gray-600 text-sm mb-6">
                  Visionary leader with expertise in digital transformation and cutting-edge technology solutions.
                  Passionate about empowering businesses to achieve exponential growth through innovative digital
                  strategies.
                </p>
                <Link
                  href="https://www.linkedin.com/in/mayank-bhayal-5a7123202/"
                  className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>Connect on LinkedIn</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From our founding to today, we've been on an exciting path of growth and innovation.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div
                    className={`flex items-center justify-${index % 2 === 0 ? "end" : "start"} md:justify-center mb-6`}
                  >
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold">{item.year}</div>
                  </div>

                  <div
                    className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} items-center`}
                  >
                    <div className="md:w-1/2 p-4"></div>
                    <div className="md:w-1/2 p-4">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              These core principles guide everything we do at Zenbourg.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-700 p-8 rounded-lg">
              <h3 className="font-bold text-xl mb-4">Innovation</h3>
              <p className="opacity-90">
                We constantly explore new technologies and approaches to deliver cutting-edge solutions that keep our
                clients ahead of the curve.
              </p>
            </div>
            <div className="bg-blue-700 p-8 rounded-lg">
              <h3 className="font-bold text-xl mb-4">Excellence</h3>
              <p className="opacity-90">
                We hold ourselves to the highest standards in everything we do, from code quality to client
                communication.
              </p>
            </div>
            <div className="bg-blue-700 p-8 rounded-lg">
              <h3 className="font-bold text-xl mb-4">Client Success</h3>
              <p className="opacity-90">
                We measure our success by the results we deliver for our clients. Their growth and satisfaction are our
                top priorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Work With Us?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Let's discuss how we can help your business grow with our premium services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
