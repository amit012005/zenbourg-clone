import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ExternalLink, Calendar } from "lucide-react"

import { getAllPublishedProjects } from "@/lib/data/portfolio-data"
import { getPageTextContent } from "@/lib/data/page-content-data"
import type { ProjectData, PageTextContent } from "@/types/page-data"

export default async function PortfolioPage() {
  const projects: ProjectData[] = await getAllPublishedProjects()
  const pageContent: PageTextContent = await getPageTextContent("portfolio_page")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {pageContent.main_title || "Our Project Portfolio"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {pageContent.main_description ||
                "Explore our successful projects across various industries. Each project showcases our expertise in delivering cutting-edge solutions that drive real business results."}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Project Image */}
                <div className="relative group">
                  <Image
                    src={project.image_url || "/placeholder.svg?height=400&width=600&query=project+image"}
                    alt={`${project.title} Homepage`}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button asChild variant="secondary" size="lg">
                      <Link href={project.live_url || "#"} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        View Live Site
                      </Link>
                    </Button>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{project.domain}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1 h-4 w-4" />
                      {project.completed_date_text}
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                  <p className="text-gray-600">{project.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {project.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  {Object.keys(project.metrics).length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Project Impact</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-lg font-bold text-blue-600">{value}</div>
                            <div className="text-xs text-gray-500 capitalize">{key.replace(/_/g, " ")}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reviews */}
                  {project.reviews && project.reviews.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Client Reviews</h4>
                      <div className="space-y-4">
                        {project.reviews.map((review) => (
                          <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <Image
                                src={review.reviewer_avatar_url || "/placeholder.svg?height=40&width=40&query=avatar"}
                                alt={review.reviewer_name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <div>
                                    <p className="font-medium text-sm">{review.reviewer_name}</p>
                                    <p className="text-xs text-gray-500">{review.reviewer_role}</p>
                                  </div>
                                  <div className="flex">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{review.review_text}</p>
                                <p className="text-xs text-gray-400 mt-1">{review.review_date_text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button asChild className="flex-1">
                      <Link href={project.live_url || "#"} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live Site
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={`/portfolio/${project.slug}`}>View Case Study</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {pageContent.cta_section_title || "Ready to Start Your Project?"}
          </h2>
          <p className="text-xl mb-8">
            {pageContent.cta_section_description ||
              "Let's discuss how we can bring your vision to life with our proven expertise."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/book">{pageContent.cta_button1_text || "Book Free Consultation"}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/contact">{pageContent.cta_button2_text || "Get Custom Quote"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
