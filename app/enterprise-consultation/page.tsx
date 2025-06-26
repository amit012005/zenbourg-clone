"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

// Define the schema directly here
const enterpriseConsultationSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  positionTitle: z.string().min(3, { message: "Position title must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  companyName: z.string().min(3, { message: "Company name must be at least 3 characters." }),
  companySize: z.enum(["50-200", "200-1000", "1000+"]),
  budgetRange: z.string().optional(),
  projectTimeline: z.string().optional(),
  detailedRequirements: z.string().min(10, { message: "Please provide detailed requirements." }),
  currentChallenges: z.string().optional(),
  businessGoals: z.string().optional(),
})

type EnterpriseConsultation = z.infer<typeof enterpriseConsultationSchema>

export default function EnterpriseConsultationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<EnterpriseConsultation>({
    resolver: zodResolver(enterpriseConsultationSchema),
    defaultValues: {
      companySize: "50-200",
    },
  })

  const companySize = watch("companySize")

  const searchParams = useSearchParams()
  const selectedService = searchParams.get("serviceName") || ""
  const servicePrice = searchParams.get("price") || ""

  const onSubmit: SubmitHandler<EnterpriseConsultation> = async (data) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/enterprise-consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          selectedService,
          servicePrice,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || result.error || "Something went wrong")
      }

      // Show success state
      setIsSubmitted(true)
      toast({
        title: "Request Submitted Successfully!",
        description: "We'll contact you within 24 hours with a custom proposal.",
      })

      // Reset form
      reset()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred."
      setError(errorMessage)
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewSubmission = () => {
    setIsSubmitted(false)
    setError(null)
    reset()
  }

  if (isSubmitted) {
    return (
      <div className="bg-gray-50/50 dark:bg-gray-900/50 py-8 sm:py-12 lg:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardContent className="p-6 sm:p-8 text-center">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Request Submitted Successfully!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                Thank you for your interest in our services. We've received your enterprise consultation request and
                will get back to you within 24 hours with a custom proposal.
              </p>
              {selectedService && (
                <div className="mb-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-semibold text-sm sm:text-base">Selected Service: {selectedService}</p>
                  {servicePrice && (
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Starting at ${servicePrice}</p>
                  )}
                </div>
              )}
              <div className="space-y-3">
                <Button onClick={handleNewSubmission} variant="outline" className="w-full">
                  Submit Another Request
                </Button>
                <Button onClick={() => router.push("/")} className="w-full">
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50/50 dark:bg-gray-900/50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center p-4 sm:p-6 lg:p-8">
            <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">Enterprise Consultation</CardTitle>
            <CardDescription className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-400">
              {selectedService && (
                <div className="mb-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="font-semibold">Selected Service: </span>
                  {selectedService} {servicePrice && `- Starting at $${servicePrice}`}
                </div>
              )}
              Tell us about your project, and we'll get back to you with a tailored proposal.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                <p className="font-medium">Error: {error}</p>
                <p className="text-sm mt-1">Please try again or contact support if the issue persists.</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm sm:text-base">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="John Doe"
                    className="text-sm sm:text-base"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs sm:text-sm">{errors.fullName.message}</p>}
                </div>

                {/* Position/Title */}
                <div className="space-y-2">
                  <Label htmlFor="positionTitle" className="text-sm sm:text-base">
                    Position/Title *
                  </Label>
                  <Input
                    id="positionTitle"
                    {...register("positionTitle")}
                    placeholder="CTO, VP Engineering, etc."
                    className="text-sm sm:text-base"
                  />
                  {errors.positionTitle && (
                    <p className="text-red-500 text-xs sm:text-sm">{errors.positionTitle.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@company.com"
                    className="text-sm sm:text-base"
                  />
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm">{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm sm:text-base">
                    Phone Number *
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    {...register("phoneNumber")}
                    placeholder="+1 (555) 123-4567"
                    className="text-sm sm:text-base"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs sm:text-sm">{errors.phoneNumber.message}</p>
                  )}
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm sm:text-base">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    {...register("companyName")}
                    placeholder="Your Company Inc."
                    className="text-sm sm:text-base"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-xs sm:text-sm">{errors.companyName.message}</p>
                  )}
                </div>

                {/* Company Size */}
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Company Size *</Label>
                  <RadioGroup
                    value={companySize}
                    onValueChange={(value) =>
                      setValue("companySize", value as "50-200" | "200-1000" | "1000+", { shouldValidate: true })
                    }
                    className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="50-200" id="size1" />
                      <Label htmlFor="size1" className="text-sm sm:text-base">
                        50-200 employees
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="200-1000" id="size2" />
                      <Label htmlFor="size2" className="text-sm sm:text-base">
                        200-1000 employees
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1000+" id="size3" />
                      <Label htmlFor="size3" className="text-sm sm:text-base">
                        1000+ employees
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.companySize && (
                    <p className="text-red-500 text-xs sm:text-sm">{errors.companySize.message}</p>
                  )}
                </div>

                {/* Estimated Budget Range */}
                <div className="space-y-2">
                  <Label htmlFor="budgetRange" className="text-sm sm:text-base">
                    Estimated Budget Range
                  </Label>
                  <Input
                    id="budgetRange"
                    {...register("budgetRange")}
                    placeholder="$50K - $500K"
                    className="text-sm sm:text-base"
                  />
                </div>

                {/* Project Timeline */}
                <div className="space-y-2">
                  <Label htmlFor="projectTimeline" className="text-sm sm:text-base">
                    Project Timeline
                  </Label>
                  <Input
                    id="projectTimeline"
                    {...register("projectTimeline")}
                    placeholder="3-6 months"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Detailed Requirements */}
              <div className="space-y-2">
                <Label htmlFor="detailedRequirements" className="text-sm sm:text-base">
                  Detailed Requirements *
                </Label>
                <Textarea
                  id="detailedRequirements"
                  {...register("detailedRequirements")}
                  placeholder="Describe your specific requirements, technical needs, and project scope..."
                  rows={4}
                  className="text-sm sm:text-base resize-none"
                />
                {errors.detailedRequirements && (
                  <p className="text-red-500 text-xs sm:text-sm">{errors.detailedRequirements.message}</p>
                )}
              </div>

              {/* Current Challenges */}
              <div className="space-y-2">
                <Label htmlFor="currentChallenges" className="text-sm sm:text-base">
                  Current Challenges
                </Label>
                <Textarea
                  id="currentChallenges"
                  {...register("currentChallenges")}
                  placeholder="What challenges is your organization currently facing?"
                  rows={3}
                  className="text-sm sm:text-base resize-none"
                />
              </div>

              {/* Business Goals */}
              <div className="space-y-2">
                <Label htmlFor="businessGoals" className="text-sm sm:text-base">
                  Business Goals
                </Label>
                <Textarea
                  id="businessGoals"
                  {...register("businessGoals")}
                  placeholder="What are your main business objectives for this project?"
                  rows={3}
                  className="text-sm sm:text-base resize-none"
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
