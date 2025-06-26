"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Send, MessageSquare, Zap } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  type?: "text" | "options" | "form" | "booking"
  options?: string[]
  formData?: any
}

interface UserData {
  name?: string
  email?: string
  phone?: string
  address?: string
  country?: string
  service?: string
  budget?: string
  timeline?: string
  description?: string
}

const services = [
  "Website Development",
  "UI/UX Design",
  "SEO Optimization",
  "Digital Marketing",
  "Social Media Marketing",
  "Business Growth",
  "Shopify Development",
  "AI Tools Integration",
  "Lead Generation",
  "Cloud Services",
  "Data Analytics",
  "Custom Solutions",
]

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
  "Japan",
  "Singapore",
  "UAE",
  "Netherlands",
  "Sweden",
  "Other",
]

const budgetRanges = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "Above $50,000",
]

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hello! I'm Zenbourg's AI assistant. I'm here to help you find the perfect solution for your business needs. What's your name?",
      isUser: false,
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<UserData>({})
  const [currentStep, setCurrentStep] = useState("name")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle click outside to close chatbot
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Handle escape key to close chatbot
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("mousedown", handleEscapeKey)
    }
  }, [isOpen])

  const addMessage = (
    text: string,
    isUser: boolean,
    type: "text" | "options" | "form" | "booking" = "text",
    options?: string[],
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
      type,
      options,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const simulateTyping = async (callback: () => void, delay = 1500) => {
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, delay))
    setIsTyping(false)
    callback()
  }

  const handleNextStep = async (userInput: string) => {
    const updatedUserData = { ...userData }

    switch (currentStep) {
      case "name":
        updatedUserData.name = userInput
        setUserData(updatedUserData)
        setCurrentStep("email")
        await simulateTyping(() => {
          addMessage(
            `Nice to meet you, ${userInput}! 😊 Could you please share your email address so we can send you detailed information?`,
            false,
          )
        })
        break

      case "email":
        if (!userInput.includes("@")) {
          addMessage("Please enter a valid email address.", false)
          return
        }
        updatedUserData.email = userInput
        setUserData(updatedUserData)
        setCurrentStep("phone")
        await simulateTyping(() => {
          addMessage("Great! What's your phone number? This helps us provide better support.", false)
        })
        break

      case "phone":
        updatedUserData.phone = userInput
        setUserData(updatedUserData)
        setCurrentStep("country")
        await simulateTyping(() => {
          addMessage("Which country are you located in?", false, "options", countries)
        })
        break

      case "country":
        updatedUserData.country = userInput
        setUserData(updatedUserData)
        setCurrentStep("service")
        await simulateTyping(() => {
          addMessage("Perfect! What type of service are you looking for?", false, "options", services)
        })
        break

      case "service":
        updatedUserData.service = userInput
        setUserData(updatedUserData)
        setCurrentStep("budget")
        await simulateTyping(() => {
          addMessage("What's your budget range for this project?", false, "options", budgetRanges)
        })
        break

      case "budget":
        updatedUserData.budget = userInput
        setUserData(updatedUserData)
        setCurrentStep("timeline")
        await simulateTyping(() => {
          addMessage("When would you like to start this project?", false, "options", [
            "ASAP",
            "Within 1 month",
            "1-3 months",
            "3-6 months",
            "Not sure yet",
          ])
        })
        break

      case "timeline":
        updatedUserData.timeline = userInput
        setUserData(updatedUserData)
        setCurrentStep("description")
        await simulateTyping(() => {
          addMessage("Could you briefly describe your project requirements or any specific needs?", false)
        })
        break

      case "description":
        updatedUserData.description = userInput
        setUserData(updatedUserData)
        setCurrentStep("booking")
        await simulateTyping(() => {
          addMessage(
            `Thank you for the detailed information! 🎉\n\nHere's what I've gathered:\n👤 Name: ${updatedUserData.name}\n📧 Email: ${updatedUserData.email}\n📱 Phone: ${updatedUserData.phone}\n🌍 Country: ${updatedUserData.country}\n💼 Service: ${updatedUserData.service}\n💰 Budget: ${updatedUserData.budget}\n⏰ Timeline: ${updatedUserData.timeline}\n\nWould you like to book a free consultation call with our experts?`,
            false,
            "options",
            ["Yes, book a call", "Send me a quote first", "I need more information"],
          )
        })
        break

      case "booking":
        await handleBookingChoice(userInput, updatedUserData)
        break
    }
  }

  const handleBookingChoice = async (choice: string, userData: UserData) => {
    setIsLoading(true)

    try {
      if (choice === "Yes, book a call") {
        // Save lead and redirect to booking
        await fetch("/api/chatbot-leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...userData, action: "book_call" }),
        })

        await simulateTyping(() => {
          addMessage(
            "Perfect! I'm redirecting you to our booking page where you can select your preferred date and time. Our team will contact you within 24 hours! 📅",
            false,
          )
        })

        setTimeout(() => {
          window.open("/book", "_blank")
        }, 2000)
      } else if (choice === "Send me a quote first") {
        await fetch("/api/chatbot-leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...userData, action: "request_quote" }),
        })

        await simulateTyping(() => {
          addMessage(
            "Excellent! We'll prepare a detailed quote based on your requirements and send it to your email within 24 hours. You'll also receive a follow-up call from our team. 📋✨",
            false,
          )
        })
      } else {
        await fetch("/api/chatbot-leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...userData, action: "more_info" }),
        })

        await simulateTyping(() => {
          addMessage(
            "No problem! I've saved your information and our team will send you comprehensive information about our services. You can also explore our website or contact us anytime. 📚",
            false,
          )
        })
      }

      // Reset for new conversation
      setTimeout(() => {
        addMessage("Is there anything else I can help you with today? 😊", false)
        setCurrentStep("general")
      }, 3000)
    } catch (error) {
      addMessage(
        "I apologize, but there was a technical issue. Please try contacting us directly at support@zenbourg.com or +91 7772828027",
        false,
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    addMessage(inputValue, true)
    const userInput = inputValue
    setInputValue("")

    if (currentStep === "general") {
      // Handle general queries
      setIsLoading(true)
      try {
        const response = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userInput }),
        })
        const data = await response.json()
        await simulateTyping(() => {
          addMessage(data.response || "I'm here to help! Would you like to start a new consultation?", false)
        })
      } catch (error) {
        addMessage("I'm experiencing some technical difficulties. Please try again later.", false)
      } finally {
        setIsLoading(false)
      }
    } else {
      await handleNextStep(userInput)
    }
  }

  const handleOptionClick = async (option: string) => {
    addMessage(option, true)
    await handleNextStep(option)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const resetChat = () => {
    setMessages([
      {
        id: "1",
        text: "👋 Hello! I'm Zenbourg's AI assistant. I'm here to help you find the perfect solution for your business needs. What's your name?",
        isUser: false,
        timestamp: new Date(),
        type: "text",
      },
    ])
    setUserData({})
    setCurrentStep("name")
  }

  return (
    <div ref={chatContainerRef} className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-2xl bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:scale-110 group"
        size="lg"
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <div className="relative flex items-center justify-center">
            <div className="relative">
              <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <Zap className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 text-yellow-500 animate-pulse" />
            </div>
          </div>
        )}

        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white rounded-full"></div>
          </div>
        )}

        {/* Pulse Ring Animation */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20"></div>
        )}
      </Button>

      {/* Chat Window - Mobile Responsive */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-20 top-4 sm:right-4 sm:left-auto sm:w-80 md:w-96 z-50 animate-in slide-in-from-right-5 duration-300">
          <Card className="w-full h-full shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl flex flex-col overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-white/20 rounded-full flex items-center justify-center relative">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                    <div className="absolute -bottom-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg font-bold">Zenbourg Assistant</CardTitle>
                    <p className="text-xs text-blue-100 flex items-center">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-400 rounded-full mr-1 sm:mr-2 animate-pulse"></div>
                      Online • Ready to help
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </CardHeader>

            <div className="flex-1 flex flex-col min-h-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[85%]">
                      {!message.isUser && (
                        <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <MessageSquare className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">AI Assistant</span>
                        </div>
                      )}
                      <div
                        className={`p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm shadow-lg whitespace-pre-line leading-relaxed ${
                          message.isUser
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto rounded-br-md"
                            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-md"
                        }`}
                      >
                        {message.text}
                      </div>

                      {/* Options */}
                      {message.type === "options" && message.options && (
                        <div className="mt-2 space-y-1">
                          {message.options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleOptionClick(option)}
                              className="w-full justify-start text-left h-auto py-2 px-2.5 sm:px-3 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 cursor-pointer bg-white dark:bg-gray-800"
                              disabled={isLoading || isTyping}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {(isLoading || isTyping) && (
                  <>
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          AI Assistant is typing...
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2.5 sm:p-3 rounded-2xl rounded-bl-md text-xs sm:text-sm shadow-lg">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    disabled={isLoading || isTyping}
                    className="flex-1 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-full h-8 sm:h-10 px-3 text-xs sm:text-sm bg-white dark:bg-gray-800"
                    autoFocus
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading || isTyping}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full h-8 w-8 sm:h-10 sm:w-10 p-0 flex-shrink-0"
                  >
                    <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <MessageSquare className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                    Powered by Zenbourg AI
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetChat}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 h-5 sm:h-6 px-2"
                  >
                    New Chat
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
