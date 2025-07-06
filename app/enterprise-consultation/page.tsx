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

const enterpriseConsultationSchema = z.object({
  fullName: z.string().min(3),
  positionTitle: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  companyName: z.string().min(3),
  companySize: z.enum(["50-200", "200-1000", "1000+"]),
  budgetRange: z.string().optional(),
  projectTimeline: z.string().optional(),
  detailedRequirements: z.string().min(10),
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
    defaultValues: { companySize: "50-200" },
  })

  const companySize = watch("companySize")
  const searchParams = useSearchParams()
  const selectedService = searchParams.get("serviceName") || ""
  const servicePrice = searchParams.get("price") || "0"

  const onSubmit: SubmitHandler<EnterpriseConsultation> = async (data) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/enterprise-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, serviceName: selectedService, servicePrice }),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.message || result.error)

      if (result.stripeUrl) {
        window.location.href = result.stripeUrl
      } else {
        setIsSubmitted(true)
        toast({ title: "Submitted", description: "We'll contact you soon." })
      }
      reset()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unexpected error."
      setError(errorMessage)
      toast({ title: "Submission Failed", description: errorMessage, variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Request Submitted Successfully!</h2>
        <p className="text-gray-600 mb-4">We’ll get back to you soon.</p>
        <Button onClick={() => router.push("/")}>Return to Home</Button>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Enterprise Consultation</CardTitle>
            <CardDescription>
              {selectedService ? (
                <>
                  <strong>Selected Service:</strong> {selectedService}{" "}
                  {servicePrice && `- Starting at $${servicePrice}`}
                </>
              ) : (
                "Tell us about your project and we’ll reach out."
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" {...register("fullName")} />
                  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="positionTitle">Position Title</Label>
                  <Input id="positionTitle" {...register("positionTitle")} />
                  {errors.positionTitle && <p className="text-red-500 text-sm">{errors.positionTitle.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" {...register("phoneNumber")} />
                  {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" {...register("companyName")} />
                  {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
                </div>
                <div>
                  <Label>Company Size</Label>
                  <RadioGroup
                    value={companySize}
                    onValueChange={(value) =>
                      setValue("companySize", value as "50-200" | "200-1000" | "1000+", { shouldValidate: true })
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="50-200" id="size1" />
                      <Label htmlFor="size1">50–200</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="200-1000" id="size2" />
                      <Label htmlFor="size2">200–1000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1000+" id="size3" />
                      <Label htmlFor="size3">1000+</Label>
                    </div>
                  </RadioGroup>
                  {errors.companySize && <p className="text-red-500 text-sm">{errors.companySize.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="budgetRange">Budget Range</Label>
                <Input id="budgetRange" {...register("budgetRange")} placeholder="$50K - $200K" />
              </div>

              <div>
                <Label htmlFor="projectTimeline">Project Timeline</Label>
                <Input id="projectTimeline" {...register("projectTimeline")} placeholder="3–6 months" />
              </div>

              <div>
                <Label htmlFor="detailedRequirements">Detailed Requirements</Label>
                <Textarea
                  id="detailedRequirements"
                  {...register("detailedRequirements")}
                  placeholder="Tell us what you need built..."
                />
                {errors.detailedRequirements && (
                  <p className="text-red-500 text-sm">{errors.detailedRequirements.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="currentChallenges">Current Challenges</Label>
                <Textarea id="currentChallenges" {...register("currentChallenges")} />
              </div>

              <div>
                <Label htmlFor="businessGoals">Business Goals</Label>
                <Textarea id="businessGoals" {...register("businessGoals")} />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
