"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { submitCustomRequest } from "@/lib/custom-request-actions"

export default function CustomWebsitePage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    projectDescription: "",
    budgetRange: "",
    timeline: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
      ]
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, DOCX, JPG, or PNG file",
          variant: "destructive",
        })
        return
      }

      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitCustomRequest({
        ...formData,
        file: selectedFile,
      })

      if (result.success) {
        toast({
          title: "Request Submitted!",
          description: "We've received your custom website request. Our team will contact you soon.",
        })

        // Redirect to confirmation page
        router.push(`/custom-website/confirmation?requestId=${result.requestId}`)
      } else {
        throw new Error(result.error || "Failed to submit request")
      }
    } catch (error) {
      console.error("Error submitting request:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Custom Website Request</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about your project requirements and we'll create a tailored solution just for you.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <Label htmlFor="projectDescription">Project Description *</Label>
                <Textarea
                  id="projectDescription"
                  placeholder="Please describe your project, goals, and any specific requirements..."
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="budgetRange">Budget Range *</Label>
                  <Select
                    value={formData.budgetRange}
                    onValueChange={(value) => handleInputChange("budgetRange", value)}
                    required
                  >
                    <SelectTrigger id="budgetRange">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-5000">Under $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                      <SelectItem value="over-50000">Over $50,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeline">Preferred Timeline *</Label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) => handleInputChange("timeline", value)}
                    required
                  >
                    <SelectTrigger id="timeline">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-month">Less than 1 month</SelectItem>
                      <SelectItem value="1-2-months">1-2 months</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="6-plus-months">6+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <Label htmlFor="fileUpload">Additional Files (Optional)</Label>
                <div className="mt-1">
                  <Input
                    id="fileUpload"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.jpg,.jpeg,.png"
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload PDF, DOCX, JPG, or PNG files (max 5MB)</p>
                </div>
                {selectedFile && <p className="text-sm text-green-600 mt-2">File selected: {selectedFile.name}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={
                  isSubmitting ||
                  !formData.fullName ||
                  !formData.email ||
                  !formData.businessName ||
                  !formData.projectDescription ||
                  !formData.budgetRange ||
                  !formData.timeline
                }
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
