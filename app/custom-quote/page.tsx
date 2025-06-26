"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, FileText, Mail, User, Building, Globe, Zap } from "lucide-react"
import { toast } from "sonner"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const services = [
  { id: "web-development", name: "Web Development", icon: Globe },
  { id: "digital-marketing", name: "Digital Marketing", icon: Zap },
  { id: "custom-solutions", name: "Custom Solutions", icon: FileText },
  { id: "consulting", name: "Business Consulting", icon: Building },
]

const budgetRanges = [
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+",
  "I need help determining budget",
]

const timelines = ["ASAP (Rush project)", "1-2 months", "3-6 months", "6-12 months", "12+ months", "Flexible timeline"]

export default function CustomQuotePage() {
  const [formData, setFormData] = useState({
    // Contact Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    website: "",

    // Project Details
    services: [] as string[],
    projectTitle: "",
    projectDescription: "",
    budget: "",
    timeline: "",

    // Additional Requirements
    hasExistingWebsite: false,
    needsHosting: false,
    needsMaintenance: false,
    needsTraining: false,

    // Additional Information
    additionalNotes: "",
    hearAboutUs: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Quote request submitted successfully! We'll get back to you within 24 hours.")

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      services: [],
      projectTitle: "",
      projectDescription: "",
      budget: "",
      timeline: "",
      hasExistingWebsite: false,
      needsHosting: false,
      needsMaintenance: false,
      needsTraining: false,
      additionalNotes: "",
      hearAboutUs: "",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30"
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div className="text-center mb-12" {...fadeInUp}>
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            Custom Quote Request
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Get Your Custom Quote
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tell us about your project and we'll provide a detailed quote tailored to your specific needs and
            requirements.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <FileText className="w-6 h-6 mr-2 text-blue-600" />
                Project Information
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Please provide as much detail as possible to help us create an accurate quote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Current Website (if any)</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                        placeholder="https://example.com"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Services Selection */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-600" />
                    Services Needed *
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          formData.services.includes(service.id)
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                        }`}
                        onClick={() => handleServiceToggle(service.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={formData.services.includes(service.id)}
                            onChange={() => handleServiceToggle(service.id)}
                          />
                          <service.icon className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-gray-900 dark:text-white">{service.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Project Details
                  </h3>
                  <div>
                    <Label htmlFor="projectTitle">Project Title *</Label>
                    <Input
                      id="projectTitle"
                      value={formData.projectTitle}
                      onChange={(e) => setFormData((prev) => ({ ...prev, projectTitle: e.target.value }))}
                      required
                      placeholder="e.g., E-commerce Website for Fashion Brand"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectDescription">Project Description *</Label>
                    <Textarea
                      id="projectDescription"
                      value={formData.projectDescription}
                      onChange={(e) => setFormData((prev) => ({ ...prev, projectDescription: e.target.value }))}
                      required
                      rows={5}
                      placeholder="Please describe your project in detail, including goals, target audience, key features, and any specific requirements..."
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Budget Range *</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeline">Project Timeline *</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelines.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>
                              {timeline}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Requirements */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Additional Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasExistingWebsite"
                        checked={formData.hasExistingWebsite}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, hasExistingWebsite: !!checked }))
                        }
                      />
                      <Label htmlFor="hasExistingWebsite">I have an existing website</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsHosting"
                        checked={formData.needsHosting}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, needsHosting: !!checked }))}
                      />
                      <Label htmlFor="needsHosting">I need hosting services</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsMaintenance"
                        checked={formData.needsMaintenance}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, needsMaintenance: !!checked }))}
                      />
                      <Label htmlFor="needsMaintenance">I need ongoing maintenance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsTraining"
                        checked={formData.needsTraining}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, needsTraining: !!checked }))}
                      />
                      <Label htmlFor="needsTraining">I need training/support</Label>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                      rows={3}
                      placeholder="Any additional information, special requirements, or questions..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
                    <Select
                      value={formData.hearAboutUs}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, hearAboutUs: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google Search</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || formData.services.length === 0}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Submit Quote Request
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                    We'll review your request and get back to you within 24 hours with a detailed quote.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What Happens Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Review</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We'll carefully review your requirements and project details
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Quote</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Receive a detailed quote with timeline and project breakdown
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Consultation</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Schedule a free consultation to discuss your project in detail
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
