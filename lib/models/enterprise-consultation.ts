import { query } from "../database"
import { z } from "zod"

export const enterpriseConsultationSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  positionTitle: z.string().min(1, "Position/Title is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  companyName: z.string().min(1, "Company Name is required"),
  companySize: z.enum(["50-200", "200-1000", "1000+"]),
  budgetRange: z.string().optional(),
  projectTimeline: z.string().optional(),
  detailedRequirements: z.string().min(1, "Detailed Requirements are required"),
  currentChallenges: z.string().optional(),
  businessGoals: z.string().optional(),
})

export type EnterpriseConsultation = z.infer<typeof enterpriseConsultationSchema>

export class EnterpriseConsultationModel {
  static async create(data: EnterpriseConsultation) {
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
    } = enterpriseConsultationSchema.parse(data)

    const result = await query(
      `INSERT INTO enterprise_consultations (
        full_name, position_title, email, phone_number, company_name, company_size,
        budget_range, project_timeline, detailed_requirements, current_challenges, business_goals
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id`,
      [
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
      ],
    )
    return result.rows[0]
  }
}
