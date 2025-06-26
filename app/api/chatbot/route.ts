import { type NextRequest, NextResponse } from "next/server"

const CHATBOT_RESPONSES = {
  greeting: [
    "Hello! I'm here to help you with any questions about Zenbourg's services.",
    "Hi there! How can I assist you with your business needs today?",
    "Welcome to Zenbourg! I'm here to help you find the perfect solution for your business.",
  ],
  services: [
    "We offer a wide range of services including Website Development ($2,999), UI/UX Design ($1,999), SEO Optimization ($1,499), Digital Marketing ($2,499), and more. Would you like details about any specific service?",
    "Our services include web development, design, marketing, AI integration, and business growth consulting. Each service is tailored to help your business succeed. What interests you most?",
  ],
  pricing: [
    "Our pricing varies by service. For example: Website Development starts at $2,999, UI/UX Design at $1,999, and SEO Optimization at $1,499. We also offer custom quotes for unique projects.",
    "We have competitive pricing for all our services. You can view detailed pricing on our Services page, or book a free consultation to discuss your specific needs and get a custom quote.",
  ],
  booking: [
    "You can book a free consultation by clicking 'Book Consultation' in our navigation menu. We'll discuss your project requirements and provide personalized recommendations.",
    "To book a consultation, simply visit our booking page where you can select your preferred date and time. All consultations are free and typically last 30 minutes.",
  ],
  contact: [
    "You can reach us at support@zenbourg.com or call +1 (555) 123-4567. We're available Monday-Friday, 9 AM-5 PM.",
    "Feel free to contact us through our Contact page, email us directly, or book a consultation. We're always happy to discuss your project needs!",
  ],
  default: [
    "I'd be happy to help! Could you please be more specific about what you'd like to know about Zenbourg's services?",
    "I'm here to assist with questions about our services, pricing, booking consultations, or general inquiries. What would you like to know?",
    "That's a great question! For detailed information, I recommend booking a free consultation with our experts who can provide personalized guidance.",
  ],
}

function getResponseType(message: string): keyof typeof CHATBOT_RESPONSES {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "greeting"
  }
  if (
    lowerMessage.includes("service") ||
    lowerMessage.includes("what do you") ||
    lowerMessage.includes("what can you")
  ) {
    return "services"
  }
  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("how much")) {
    return "pricing"
  }
  if (lowerMessage.includes("book") || lowerMessage.includes("consultation") || lowerMessage.includes("appointment")) {
    return "booking"
  }
  if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("reach") ||
    lowerMessage.includes("phone") ||
    lowerMessage.includes("email")
  ) {
    return "contact"
  }

  return "default"
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Determine response type based on message content
    const responseType = getResponseType(message)
    const responses = CHATBOT_RESPONSES[responseType]
    const response = responses[Math.floor(Math.random() * responses.length)]

    // In production, you would integrate with OpenAI or similar AI service:
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "system",
    //       content: "You are a helpful assistant for Zenbourg, a business services company..."
    //     },
    //     {
    //       role: "user",
    //       content: message
    //     }
    //   ],
    // });

    // Log chat for analytics (in production, save to database)
    console.log("Chat log:", {
      message,
      response,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chatbot error:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
