"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        necessary: true,
        functional: true,
        analytics: true,
        marketing: true,
      }),
    )
    setShowConsent(false)
  }

  const handleRejectAll = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
      }),
    )
    setShowConsent(false)
  }

  const handleCustomize = () => {
    setShowCustomize(true)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-sm">Cookie Consent</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowConsent(false)} className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            We use cookies to enhance your experience and provide personalized content. Choose your preferences below.
          </p>

          {showCustomize ? (
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" checked disabled />
                  <span>Necessary (Required)</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked />
                  <span>Functional</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked />
                  <span>Analytics</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked />
                  <span>Marketing</span>
                </label>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleAcceptAll} className="flex-1">
                  Save Preferences
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowCustomize(false)} className="flex-1">
                  Back
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleAcceptAll} className="flex-1">
                  Accept All
                </Button>
                <Button size="sm" variant="outline" onClick={handleRejectAll} className="flex-1">
                  Reject All
                </Button>
              </div>
              <Button size="sm" variant="ghost" onClick={handleCustomize} className="text-xs">
                Customize
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
