import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-gray-600 dark:text-gray-300">Last updated: December 2024</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What Are Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit our
                website. They help us provide you with a better experience by remembering your preferences and analyzing
                how you use our site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types of Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Essential Cookies</h4>
                <p>
                  These cookies are necessary for the website to function properly. They enable basic functions like
                  page navigation and access to secure areas.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                <p>
                  We use these cookies to understand how visitors interact with our website, helping us improve our
                  services.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Preference Cookies</h4>
                <p>These cookies remember your preferences, such as language settings and theme choices.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Managing Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                You can control and manage cookies in various ways. Most browsers allow you to refuse cookies or delete
                existing ones. However, disabling cookies may affect the functionality of our website.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We may use third-party services like Google Analytics that place cookies on your device. These services
                have their own privacy policies and cookie practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
