import { type NextRequest, NextResponse } from "next/server"

// Mock services data (in a real app, this would come from the database)
const services = [
  {
    id: "website-development",
    name: "Website Development",
    price: 2999,
    description: "Custom websites built for performance and scalability",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile First", "CMS Integration"],
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    price: 1999,
    description: "Beautiful, user-friendly interfaces that convert",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
  },
  {
    id: "seo-optimization",
    name: "SEO Optimization",
    price: 1499,
    description: "Boost your search rankings and organic traffic",
    features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Content Strategy", "Analytics"],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    price: 2499,
    description: "Comprehensive marketing strategies that drive results",
    features: ["Social Media", "PPC Campaigns", "Email Marketing", "Content Marketing", "Analytics"],
  },
  {
    id: "social-media-marketing",
    name: "Social Media Marketing",
    price: 1799,
    description: "Engage your audience across all social platforms",
    features: ["Content Creation", "Community Management", "Paid Advertising", "Influencer Outreach", "Analytics"],
  },
  {
    id: "business-growth",
    name: "Business Growth",
    price: 3999,
    description: "Strategic consulting to scale your business",
    features: ["Growth Strategy", "Market Analysis", "Process Optimization", "Team Training", "KPI Tracking"],
  },
  {
    id: "shopify-development",
    name: "Shopify Development",
    price: 1999,
    description: "Professional e-commerce stores that sell",
    features: ["Custom Themes", "App Integration", "Payment Setup", "Inventory Management", "SEO Setup"],
  },
  {
    id: "ai-tools-integration",
    name: "AI Tools Integration",
    price: 4999,
    description: "Cutting-edge AI solutions for your business",
    features: ["AI Chatbots", "Process Automation", "Data Analysis", "Custom AI Models", "Integration Support"],
  },
  {
    id: "lead-generation",
    name: "Lead Generation",
    price: 2299,
    description: "Generate high-quality leads for your business",
    features: ["Lead Magnets", "Landing Pages", "Email Sequences", "CRM Setup", "Lead Scoring"],
  },
  {
    id: "cloud-services",
    name: "Cloud Services",
    price: 3499,
    description: "Scalable cloud infrastructure and migration",
    features: ["Cloud Migration", "Infrastructure Setup", "Security Configuration", "Monitoring", "24/7 Support"],
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    price: 3799,
    description: "Turn your data into actionable insights",
    features: ["Data Visualization", "Custom Dashboards", "Reporting Automation", "Predictive Analytics", "Training"],
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In a real app, fetch from database
    // const result = await query('SELECT * FROM services WHERE id = $1', [id])
    // const service = result.rows[0]

    // For demo purposes, use mock data
    const service = services.find((s) => s.id === id)

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ service })
  } catch (error) {
    console.error("Error fetching service:", error)
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 })
  }
}
