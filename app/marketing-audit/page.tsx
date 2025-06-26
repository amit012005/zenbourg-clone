"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TrendingUp, Target, BarChart3, Users, Globe, ArrowRight, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MarketingAuditPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    website: "",
    industry: "",
    businessSize: "",
    contactName: "",
    email: "",
    phone: "",

    // Current Marketing
    currentMarketing: [],
    monthlyBudget: "",
    primaryGoals: [],
    targetAudience: "",

    // Challenges
    biggestChallenges: [],
    currentROI: "",
    competitorConcerns: "",

    // Additional Info
    additionalInfo: "",
    preferredContact: "",
    urgency: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/marketing-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Audit Request Submitted!",
          description: "We'll analyze your marketing and send you a comprehensive audit within 24-48 hours.",
        })

        // Reset form
        setFormData({
          businessName: "",
          website: "",
          industry: "",
          businessSize: "",
          contactName: "",
          email: "",
          phone: "",
          currentMarketing: [],
          monthlyBudget: "",
          primaryGoals: [],
          targetAudience: "",
          biggestChallenges: [],
          currentROI: "",
          competitorConcerns: "",
          additionalInfo: "",
          preferredContact: "",
          urgency: "",
        })
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const auditIncludes = [
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
      title: "Website Performance Analysis",
      description: "Complete SEO audit, page speed analysis, and conversion optimization review",
    },
    {
      icon: <Target className="h-6 w-6 text-green-500" />,
      title: "Competitor Analysis",
      description: "In-depth analysis of your top 5 competitors' marketing strategies",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
      title: "Social Media Audit",
      description: "Review of all social platforms, content strategy, and engagement metrics",
    },
    {
      icon: <Users className="h-6 w-6 text-orange-500" />,
      title: "Target Audience Analysis",
      description: "Detailed customer persona development and market segmentation",
    },
    {
      icon: <Globe className="h-6 w-6 text-red-500" />,
      title: "Digital Presence Review",
      description: "Google My Business, online reviews, and local SEO analysis",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-teal-500" />,
      title: "Actionable Recommendations",
      description: "Prioritized action plan with ROI projections and implementation timeline",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            100% Free • No Obligations
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get Your Free Marketing Audit
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover hidden opportunities in your marketing strategy. Our comprehensive audit reveals exactly what's
            working, what's not, and how to improve your ROI by up to 300%.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">500+ Audits Completed</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Marketing Audit Request Form
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  Please provide detailed information about your business and current marketing efforts. The more
                  information you share, the more comprehensive your audit will be.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Business Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                      Business Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange("businessName", e.target.value)}
                          placeholder="Your Company Name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website URL *</Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                          placeholder="https://yourwebsite.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="industry">Industry *</Label>
                        <Select onValueChange={(value) => handleInputChange("industry", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="retail">Retail/E-commerce</SelectItem>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="professional-services">Professional Services</SelectItem>
                            <SelectItem value="hospitality">Hospitality</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="businessSize">Business Size *</Label>
                        <Select onValueChange={(value) => handleInputChange("businessSize", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                            <SelectItem value="small">Small Business (11-50 employees)</SelectItem>
                            <SelectItem value="medium">Medium Business (51-200 employees)</SelectItem>
                            <SelectItem value="large">Large Business (200+ employees)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          value={formData.contactName}
                          onChange={(e) => handleInputChange("contactName", e.target.value)}
                          placeholder="Your Full Name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Current Marketing */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                      Current Marketing Efforts
                    </h3>

                    <div>
                      <Label>What marketing channels are you currently using? (Select all that apply)</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                        {[
                          "Social Media Marketing",
                          "Google Ads (PPC)",
                          "SEO",
                          "Email Marketing",
                          "Content Marketing",
                          "Influencer Marketing",
                          "Traditional Advertising",
                          "Referral Programs",
                          "None Currently",
                        ].map((channel) => (
                          <div key={channel} className="flex items-center space-x-2">
                            <Checkbox
                              id={channel}
                              checked={formData.currentMarketing.includes(channel)}
                              onCheckedChange={(checked) =>
                                handleArrayChange("currentMarketing", channel, checked as boolean)
                              }
                            />
                            <Label htmlFor={channel} className="text-sm">
                              {channel}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="monthlyBudget">Monthly Marketing Budget</Label>
                        <Select onValueChange={(value) => handleInputChange("monthlyBudget", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-1k">Under $1,000</SelectItem>
                            <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                            <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                            <SelectItem value="over-50k">Over $50,000</SelectItem>
                            <SelectItem value="not-sure">Not Sure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="currentROI">Current Marketing ROI (if known)</Label>
                        <Select onValueChange={(value) => handleInputChange("currentROI", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ROI range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="negative">Negative ROI</SelectItem>
                            <SelectItem value="break-even">Break Even</SelectItem>
                            <SelectItem value="1-2x">1-2x Return</SelectItem>
                            <SelectItem value="2-3x">2-3x Return</SelectItem>
                            <SelectItem value="3-5x">3-5x Return</SelectItem>
                            <SelectItem value="over-5x">Over 5x Return</SelectItem>
                            <SelectItem value="unknown">Don't Know</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Goals and Challenges */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                      Goals & Challenges
                    </h3>

                    <div>
                      <Label>What are your primary marketing goals? (Select all that apply)</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {[
                          "Increase Website Traffic",
                          "Generate More Leads",
                          "Improve Conversion Rates",
                          "Build Brand Awareness",
                          "Increase Sales Revenue",
                          "Improve Customer Retention",
                          "Expand to New Markets",
                          "Reduce Customer Acquisition Cost",
                        ].map((goal) => (
                          <div key={goal} className="flex items-center space-x-2">
                            <Checkbox
                              id={goal}
                              checked={formData.primaryGoals.includes(goal)}
                              onCheckedChange={(checked) => handleArrayChange("primaryGoals", goal, checked as boolean)}
                            />
                            <Label htmlFor={goal} className="text-sm">
                              {goal}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>What are your biggest marketing challenges? (Select all that apply)</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {[
                          "Low Website Traffic",
                          "Poor Lead Quality",
                          "High Customer Acquisition Cost",
                          "Low Conversion Rates",
                          "Limited Marketing Budget",
                          "Lack of Marketing Expertise",
                          "Measuring ROI",
                          "Keeping Up with Trends",
                          "Competition",
                          "Time Constraints",
                        ].map((challenge) => (
                          <div key={challenge} className="flex items-center space-x-2">
                            <Checkbox
                              id={challenge}
                              checked={formData.biggestChallenges.includes(challenge)}
                              onCheckedChange={(checked) =>
                                handleArrayChange("biggestChallenges", challenge, checked as boolean)
                              }
                            />
                            <Label htmlFor={challenge} className="text-sm">
                              {challenge}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="targetAudience">Describe your target audience</Label>
                      <Textarea
                        id="targetAudience"
                        value={formData.targetAudience}
                        onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                        placeholder="Who are your ideal customers? Include demographics, interests, pain points, etc."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="competitorConcerns">Who are your main competitors?</Label>
                      <Textarea
                        id="competitorConcerns"
                        value={formData.competitorConcerns}
                        onChange={(e) => handleInputChange("competitorConcerns", e.target.value)}
                        placeholder="List your top 3-5 competitors and any specific concerns about their marketing"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                      Additional Information
                    </h3>

                    <div>
                      <Label htmlFor="additionalInfo">Anything else you'd like us to know?</Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                        placeholder="Share any specific concerns, previous marketing experiences, or areas you'd like us to focus on"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Preferred Contact Method</Label>
                        <RadioGroup
                          value={formData.preferredContact}
                          onValueChange={(value) => handleInputChange("preferredContact", value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email-contact" />
                            <Label htmlFor="email-contact">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone-contact" />
                            <Label htmlFor="phone-contact">Phone Call</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="both" id="both-contact" />
                            <Label htmlFor="both-contact">Both</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label>How urgent is this audit?</Label>
                        <RadioGroup
                          value={formData.urgency}
                          onValueChange={(value) => handleInputChange("urgency", value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="asap" id="asap" />
                            <Label htmlFor="asap">ASAP</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="week" id="week" />
                            <Label htmlFor="week">Within a week</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="month" id="month" />
                            <Label htmlFor="month">Within a month</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no-rush" id="no-rush" />
                            <Label htmlFor="no-rush">No rush</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3"
                  >
                    {isSubmitting ? (
                      "Submitting Your Request..."
                    ) : (
                      <>
                        Get My Free Marketing Audit
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* What's Included */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  What's Included in Your Audit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {auditIncludes.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Guarantee */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">100% Free Guarantee</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  No strings attached. No sales pressure. Just valuable insights to help your business grow.
                </p>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">We review your submission within 2 hours</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Our team conducts a comprehensive analysis</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    You receive your detailed audit report within 24-48 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
