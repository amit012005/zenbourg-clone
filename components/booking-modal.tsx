"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, CreditCard, Smartphone, Bitcoin, Building, Wallet } from "lucide-react"

interface Service {
  id: string
  name: string
  price: number
  description: string
}

interface BookingModalProps {
  service: Service
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ service, isOpen, onClose }: BookingModalProps) {
  const [paymentType, setPaymentType] = useState<"full" | "installments">("full")
  const [paymentMethod, setPaymentMethod] = useState<string>("")

  const installmentSchedule = [
    { phase: "Upfront", percentage: 50, amount: service.price * 0.5 },
    { phase: "Second Payment", percentage: 25, amount: service.price * 0.25 },
    { phase: "Final Payment", percentage: 25, amount: service.price * 0.25 },
  ]

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Visa, MasterCard, AMEX",
    },
    { id: "upi", name: "UPI", icon: <Smartphone className="h-5 w-5" />, description: "PhonePe, GPay, Paytm" },
    { id: "crypto", name: "Cryptocurrency", icon: <Bitcoin className="h-5 w-5" />, description: "BTC, ETH, USDT" },
    { id: "wire", name: "Wire Transfer", icon: <Building className="h-5 w-5" />, description: "International SWIFT" },
    {
      id: "banking",
      name: "Internet Banking",
      icon: <Building className="h-5 w-5" />,
      description: "Major Indian banks",
    },
    { id: "paypal", name: "PayPal", icon: <Wallet className="h-5 w-5" />, description: "Secure PayPal payment" },
  ]

  const handleProceedToPayment = () => {
    // Redirect to checkout page with selected options
    const params = new URLSearchParams({
      service: service.id,
      paymentType,
      paymentMethod,
      amount: paymentType === "full" ? service.price.toString() : installmentSchedule[0].amount.toString(),
    })

    window.location.href = `/checkout?${params.toString()}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book {service.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Summary */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="text-2xl font-bold text-blue-600">${service.price.toLocaleString()}</p>
            </CardContent>
          </Card>

          {/* Payment Type Selection */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Choose Payment Option</h3>
            <RadioGroup value={paymentType} onValueChange={(value: "full" | "installments") => setPaymentType(value)}>
              <div className="space-y-3">
                <Label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="full" />
                  <div className="flex-1">
                    <div className="font-medium">Full Payment</div>
                    <div className="text-sm text-gray-600">Pay ${service.price.toLocaleString()} now</div>
                  </div>
                  <div className="text-lg font-bold text-green-600">${service.price.toLocaleString()}</div>
                </Label>

                <Label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="installments" />
                  <div className="flex-1">
                    <div className="font-medium">Installments</div>
                    <div className="text-sm text-gray-600">Split into 3 payments</div>
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    ${installmentSchedule[0].amount.toLocaleString()} now
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {paymentType === "installments" && (
              <Card className="mt-4">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Payment Schedule</h4>
                  <div className="space-y-2">
                    {installmentSchedule.map((installment, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div>
                          <span className="font-medium">{installment.phase}</span>
                          <span className="text-sm text-gray-600 ml-2">({installment.percentage}%)</span>
                        </div>
                        <span className="font-semibold">${installment.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Payment Method Selection */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Select Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <Label
                    key={method.id}
                    className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <RadioGroupItem value={method.id} />
                    <div className="flex items-center space-x-3 flex-1">
                      {method.icon}
                      <div>
                        <div className="font-medium">{method.name}</div>
                        <div className="text-xs text-gray-600">{method.description}</div>
                      </div>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleProceedToPayment} disabled={!paymentMethod} className="flex-1">
              Proceed to Payment
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
