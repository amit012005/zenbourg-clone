import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const CustomSolutionsPage = () => {
  return (
    <div className="container mx-auto py-10">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Custom Solutions Tailored for You</h1>
        <p className="text-gray-600 mb-8">
          We understand that every business is unique. That's why we offer custom solutions designed to meet your
          specific needs and challenges.
        </p>
        <Link href="/custom-quote">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Request Custom Quote <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </section>

      {/* Services Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* Service Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Software Development</h2>
          <p className="text-gray-700">
            Custom software solutions to streamline your operations and improve efficiency.
          </p>
        </div>

        {/* Service Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Data Analytics</h2>
          <p className="text-gray-700">Unlock the power of your data with our comprehensive data analytics services.</p>
        </div>

        {/* Service Card 3 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Cloud Solutions</h2>
          <p className="text-gray-700">
            Migrate to the cloud and optimize your infrastructure for scalability and cost savings.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Case Studies</h2>
        <p className="text-gray-600 mb-8">
          See how we've helped other businesses achieve their goals with our custom solutions.
        </p>
        {/* Add case study components here */}
      </section>

      {/* Bottom CTA */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8">
          Contact us today to discuss your specific needs and how we can help you achieve your business objectives.
        </p>
        <Link href="/custom-quote">
          <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Request Custom Quote <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  )
}

export default CustomSolutionsPage
