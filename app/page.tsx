import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Users, Award, Zap, ExternalLink, CheckCircle, HelpCircle } from "lucide-react" // Added HelpCircle for default icon
import { Badge } from "@/components/ui/badge"

// Import data fetching functions and types
import {
  getHomePageFeatures,
  getHomePageTestimonials,
  getHomePageServices,
  getHomePageProjects,
} from "@/lib/data/home-page-data"
import type { HomePageFeature, HomePageTestimonial, HomePageService, HomePageProject } from "@/types/home-page"
import type { LucideIcon, LucideProps } from "lucide-react"

// Helper to map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Zap: Zap,
  Users: Users,
  Award: Award,
  Default: HelpCircle, // Default icon if not found
}

const FeatureIcon = ({ name, ...props }: { name: string } & LucideProps) => {
  const IconComponent = iconMap[name] || iconMap.Default
  return <IconComponent {...props} />
}

// Make the component async to fetch data
export default async function HomePage() {
  // Fetch data in parallel
  const [featuresData, testimonialsData, servicesData, projectsData] = await Promise.all([
    getHomePageFeatures(),
    getHomePageTestimonials(),
    getHomePageServices(),
    getHomePageProjects(),
  ])

  // Use fetched data or provide empty arrays as fallbacks
  const features: HomePageFeature[] = featuresData || []
  const testimonials: HomePageTestimonial[] = testimonialsData || []
  const homeServices: HomePageService[] = servicesData || []
  const homeProjects: HomePageProject[] = projectsData || []

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section (remains static as per current design, or can be made dynamic too) */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Premium Business Services for
              <span className="text-blue-600 dark:text-blue-400 block sm:inline"> Modern Companies</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              From web development to digital marketing, we provide comprehensive solutions to help your business grow
              and succeed in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                asChild
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link href="/services">
                  View Our Services
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Link href="/book">Book Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Dynamic */}
      {features.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Zenbourg?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                We combine expertise, innovation, and dedication to deliver exceptional results for your business.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className="text-center p-4 sm:p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <FeatureIcon name={feature.icon_name} className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Services Section - Dynamic */}
      {homeServices.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Services
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                Choose from our comprehensive range of professional services designed to help your business grow and
                succeed.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {homeServices.map((service) => (
                <Card
                  key={service.id}
                  className={`relative hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${
                    service.is_popular ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {service.is_popular && (
                    <Badge className="absolute -top-2 left-4 bg-blue-500 text-white text-xs sm:text-sm">
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    {service.price && (
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        ${service.price.toLocaleString()}
                      </div>
                    )}
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                        {service.features.map((featureItem, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{featureItem}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base" asChild>
                      <Link href={`/services#${service.service_slug}`}>
                        Book Now
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/services">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials - Dynamic */}
      {testimonials.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                Don't just take our word for it - hear from our satisfied clients
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="flex mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <Star
                          key={`empty-${i}`}
                          className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300 dark:text-gray-600 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      {testimonial.company && (
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Work Section - Dynamic */}
      {homeProjects.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Recent Work
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                Explore our successful projects across various industries and see the impact we've made
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {homeProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <div className="relative">
                    <Image
                      src={project.image_path || "/placeholder.svg?width=400&height=300&query=project+thumbnail"}
                      alt={`${project.name} Homepage`}
                      width={400}
                      height={300}
                      className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.live_url && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button asChild variant="secondary" size="sm">
                          <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="text-xs sm:text-sm">View Live Site</span>
                          </Link>
                        </Button>
                      </div>
                    )}
                    {project.domain && (
                      <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-blue-600 text-white text-xs">
                        {project.domain}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3">
                      {project.description}
                    </p>
                    {project.metrics && (
                      <p className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 mb-3 sm:mb-4">
                        {project.metrics}
                      </p>
                    )}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      {project.live_url && (
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
                        >
                          <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                            View Live
                          </Link>
                        </Button>
                      )}
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs sm:text-sm"
                      >
                        {/* Link to a dynamic case study page if project_slug is available */}
                        <Link href={project.project_slug ? `/portfolio/${project.project_slug}` : "/portfolio"}>
                          Case Study
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/portfolio">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section (remains static or can be made dynamic) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Let's discuss how we can help you achieve your goals with our premium services.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button asChild size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 py-3">
              <Link href="/book">Book Free Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
