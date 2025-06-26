import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <p className="text-gray-600 dark:text-gray-300">Last updated: December 2024</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>30-Day Money Back Guarantee</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We offer a 30-day money-back guarantee for all our services. If you're not completely satisfied with our
                work, you can request a full refund within 30 days of project completion.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refund Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>To be eligible for a refund, the following conditions must be met:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request must be made within 30 days of service completion</li>
                <li>You must provide specific reasons for dissatisfaction</li>
                <li>You must allow us an opportunity to address your concerns</li>
                <li>Custom development work may have different terms</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Non-Refundable Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>The following services are non-refundable:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Third-party software licenses and subscriptions</li>
                <li>Domain name registrations</li>
                <li>Hosting services after 7 days</li>
                <li>Marketing campaigns that have already been executed</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refund Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>To request a refund:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact our support team at support@zenbourg.com</li>
                <li>Provide your order number and reason for refund</li>
                <li>Allow 3-5 business days for review</li>
                <li>Refunds will be processed to the original payment method</li>
                <li>Processing time: 5-10 business days</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partial Refunds</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                In some cases, we may offer partial refunds for services that have been partially completed or
                delivered. The refund amount will be calculated based on the work completed and resources used.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>For refund requests or questions about this policy:</p>
              <div className="mt-4">
                <p>Email: refunds@zenbourg.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Business Hours: Monday-Friday, 9 AM - 6 PM EST</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
