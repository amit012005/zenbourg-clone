import { NextResponse } from "next/server"
import { z } from "zod"
import { query } from "@/lib/db"
import { sendConfirmationEmail } from "@/lib/email/send-confirmation"
import { createStripeCheckoutSession } from "@/lib/stripe/create-checkout"

const schema = z.object({
  fullName: z.string(),
  positionTitle: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  companyName: z.string(),
  companySize: z.string(),
  budgetRange: z.string().optional(),
  projectTimeline: z.string().optional(),
  detailedRequirements: z.string(),
  currentChallenges: z.string().optional(),
  businessGoals: z.string().optional(),
  serviceName: z.string(),
  servicePrice: z.string()
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // 1. Insert into enterprise_consultations
    const result = await query(
      `INSERT INTO enterprise_consultations 
      (full_name, position_title, email, phone_number, company_name, company_size, budget_range, project_timeline, detailed_requirements, current_challenges, business_goals)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id`,
      [
        data.fullName,
        data.positionTitle,
        data.email,
        data.phoneNumber,
        data.companyName,
        data.companySize,
        data.budgetRange || "",
        data.projectTimeline || "",
        data.detailedRequirements,
        data.currentChallenges || "",
        data.businessGoals || ""
      ]
    )
    const insertedId = result.rows[0].id

    // 2. Send confirmation email
    sendConfirmationEmail(data.email, data.fullName, data.serviceName)

    // 3. Stripe Checkout Session
    const stripeUrl = await createStripeCheckoutSession({
      email: data.email,
      name: data.fullName,
      amount: parseFloat(data.servicePrice),
      metadata: {
        consultation_id: insertedId.toString(),
        service_name: data.serviceName,
        email: data.email
      }
    })

    return NextResponse.json({ message: "Success", stripeUrl })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Failed to submit consultation request", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 })
}
