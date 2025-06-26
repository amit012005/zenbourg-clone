import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
          <p className="text-gray-600 dark:text-gray-300">Last updated: December 2024</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                The information on this website is provided on an "as is" basis. To the fullest extent permitted by law,
                Zenbourg excludes all representations, warranties, obligations, and liabilities arising out of or in
                connection with this website.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Advice</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                The content on this website is for general information purposes only and should not be considered as
                professional advice. Always seek the advice of qualified professionals for specific situations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>External Links</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our website may contain links to external websites. We have no control over the content and nature of
                these sites and are not responsible for their content or availability.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Zenbourg will not be liable for any loss or damage arising from the use of this website or reliance on
                the information provided herein.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
