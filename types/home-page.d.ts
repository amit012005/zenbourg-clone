export interface HomePageFeature {
  id: number
  icon_name: string // "Zap", "Users", "Award"
  title: string
  description: string
  display_order: number
}

export interface HomePageTestimonial {
  id: number
  name: string
  company?: string
  text: string
  rating: number
  display_order: number
  // avatar_url?: string;
}

export interface HomePageService {
  id: number
  service_slug: string
  name: string
  price?: number // Made optional as some services might not show price directly
  description?: string
  features: string[] // Parsed from JSONB
  is_popular: boolean
  display_order: number
}

export interface HomePageProject {
  id: number
  project_slug: string
  name: string
  domain?: string
  image_path: string
  description?: string
  live_url?: string
  metrics?: string
  display_order: number
}

export interface HomePageData {
  features: HomePageFeature[]
  testimonials: HomePageTestimonial[]
  services: HomePageService[]
  projects: HomePageProject[]
}
