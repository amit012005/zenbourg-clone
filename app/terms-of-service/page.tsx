import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-300">Last updated: December 2024</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                By accessing and using Zenbourg's services, you accept and agree to be bound by the terms and provision
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use License</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Permission is granted to temporarily use Zenbourg's services for personal, non-commercial transitory
                viewing only. This is the grant of a license, not a transfer of title, and under this license you may
                not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Our services are provided on an "as is" basis. We reserve the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or discontinue services at any time</li>
                <li>Refuse service to anyone for any reason</li>
                <li>Update these terms without prior notice</li>
                <li>Terminate accounts that violate our policies</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Payment for services is due upon completion unless otherwise agreed upon in writing. Late payments may
                incur additional fees. All prices are subject to change with 30 days notice.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                In no event shall Zenbourg or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on Zenbourg's website.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
