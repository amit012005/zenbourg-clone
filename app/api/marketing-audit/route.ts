import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Insert marketing audit request into database
    const result = await sql`
      INSERT INTO marketing_audit_requests (
        business_name,
        website,
        industry,
        business_size,
        contact_name,
        email,
        phone,
        current_marketing,
        monthly_budget,
        primary_goals,
        target_audience,
        biggest_challenges,
        current_roi,
        competitor_concerns,
        additional_info,
        preferred_contact,
        urgency,
        created_at
      ) VALUES (
        ${data.businessName},
        ${data.website},
        ${data.industry},
        ${data.businessSize},
        ${data.contactName},
        ${data.email},
        ${data.phone || null},
        ${JSON.stringify(data.currentMarketing)},
        ${data.monthlyBudget},
        ${JSON.stringify(data.primaryGoals)},
        ${data.targetAudience},
        ${JSON.stringify(data.biggestChallenges)},
        ${data.currentROI},
        ${data.competitorConcerns},
        ${data.additionalInfo},
        ${data.preferredContact},
        ${data.urgency},
        NOW()
      )
      RETURNING id
    `

    // Send notification email (you can implement this based on your email service)
    // await sendNotificationEmail(data)

    return NextResponse.json({
      success: true,
      message: "Marketing audit request submitted successfully",
      id: result[0].id,
    })
  } catch (error) {
    console.error("Error submitting marketing audit request:", error)
    return NextResponse.json({ success: false, message: "Failed to submit marketing audit request" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const requests = await sql`
      SELECT 
        id,
        business_name,
        website,
        industry,
        business_size,
        contact_name,
        email,
        phone,
        current_marketing,
        monthly_budget,
        primary_goals,
        target_audience,
        biggest_challenges,
        current_roi,
        competitor_concerns,
        additional_info,
        preferred_contact,
        urgency,
        created_at,
        status
      FROM marketing_audit_requests 
      ORDER BY created_at DESC
    `

    return NextResponse.json({ success: true, data: requests })
  } catch (error) {
    console.error("Error fetching marketing audit requests:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch marketing audit requests" }, { status: 500 })
  }
}
