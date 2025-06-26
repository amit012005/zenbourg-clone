// General type for page content fetched from page_content table
export interface PageTextContent {
  [element_key: string]: string
}

// For services (using existing ServiceModel structure but ensuring it's used)
// We can reuse lib/models/service.ts 'Service' interface if it matches.
// For this example, let's assume it's:
export interface ServiceData {
  id: string // or number, depending on your DB schema for services.id
  slug: string
  name: string
  price: number
  description: string
  features: string[]
  is_popular: boolean // Renamed from 'popular' for consistency
}

// For portfolio projects
export interface ProjectReviewData {
  id: number
  reviewer_name: string
  reviewer_role: string
  reviewer_avatar_url: string
  rating: number
  review_text: string
  review_date_text: string
}

export interface ProjectData {
  id: number
  slug: string
  title: string
  domain: string
  category: string
  description: string
  image_url: string
  live_url: string
  case_study_content?: string // For individual project page
  completed_date_text: string
  duration_text: string
  technologies: string[]
  features: string[]
  metrics: { [key: string]: string }
  reviews: ProjectReviewData[] // Reviews will be fetched separately and joined
}
