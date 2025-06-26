import { NextResponse } from "next/server"
import { z } from "zod"

const enterpriseConsultationSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  positionTitle: z.string().min(3, { message: "Position title must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  companyName: z.string().min(3, { message: "Company name must be at least 3 characters." }),
  companySize: z.string(),
  budgetRange: z.string().optional(),
  projectTimeline: z.string().optional(),
  detailedRequirements: z.string(),
  currentChallenges: z.string().optional(),
  businessGoals: z.string().optional(),
})

const requestSchema = enterpriseConsultationSchema.extend({
  selectedService: z.string().optional(),
  servicePrice: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validatedData = requestSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json({ errors: validatedData.error.flatten().fieldErrors }, { status: 400 })
    }

    const {
      fullName,
      positionTitle,
      email,
      phoneNumber,
      companyName,
      companySize,
      budgetRange,
      projectTimeline,
      detailedRequirements,
      currentChallenges,
      businessGoals,
      selectedService,
      servicePrice,
    } = validatedData.data

    // Simulate database operation with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful database insertion
    const mockId = Math.floor(Math.random() * 10000) + 1

    // Log the data for demonstration purposes
    console.log("Enterprise Consultation Submitted:", {
      id: mockId,
      fullName,
      positionTitle,
      email,
      phoneNumber,
      companyName,
      companySize,
      budgetRange,
      projectTimeline,
      detailedRequirements,
      currentChallenges,
      businessGoals,
      selectedService,
      servicePrice,
      timestamp: new Date().toISOString(),
    })

    // Simulate email sending (in production, you would send actual emails here)
    console.log("Sending confirmation email to:", email)
    console.log("Sending notification email to: mayankbhayal29@gmail.com")

    return NextResponse.json(
      {
        id: mockId,
        message: "Enterprise consultation request submitted successfully!",
        success: true,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Error processing enterprise consultation:", error)
    return NextResponse.json(
      {
        message: "Failed to submit consultation request. Please try again.",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Enterprise Consultations API is working",
    timestamp: new Date().toISOString(),
  })
}
