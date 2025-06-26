import { NextResponse, type NextRequest } from "next/server"
import { getPageTextContent } from "@/lib/data/page-content-data" // Adjust path as needed

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pageKey = searchParams.get("pageKey")

  if (!pageKey) {
    return NextResponse.json({ error: "pageKey is required" }, { status: 400 })
  }

  try {
    const content = await getPageTextContent(pageKey)
    if (Object.keys(content).length === 0 && pageKey === "book_consultation_page") {
      // Provide fallback if DB is empty for this specific key for demo
      return NextResponse.json({
        main_title: "Book Your Free Consultation (DB Fallback)",
        main_description:
          "Schedule a personalized consultation with our experts to discuss your project requirements and goals. (DB Fallback)",
        sidebar_timezone_title: "Your Timezone",
        sidebar_timezone_note: "All times are shown in your local timezone",
        sidebar_availability_title: "Availability",
        sidebar_availability_line1: "Monday - Friday",
        sidebar_availability_line2: "9:00 AM - 5:00 PM",
        sidebar_availability_line3: "30-minute sessions",
        sidebar_expect_title: "What to Expect",
        sidebar_expect_item1: "Project requirements discussion",
        sidebar_expect_item2: "Timeline and budget planning",
        sidebar_expect_item3: "Technology recommendations",
        sidebar_expect_item4: "Next steps outline",
        sidebar_expect_item5: "Q&A session",
      })
    }
    return NextResponse.json(content)
  } catch (error) {
    console.error(`API error fetching page content for ${pageKey}:`, error)
    return NextResponse.json({ error: "Failed to fetch page content" }, { status: 500 })
  }
}
