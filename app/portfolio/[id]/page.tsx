import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Calendar, Users, TrendingUp, Award, CheckCircle } from "lucide-react"
import { Star } from "lucide-react"

const projectData = {
  "1": {
    id: 1,
    title: "TechFlow SaaS Platform",
    domain: "Technology",
    category: "SaaS Development",
    description: "A comprehensive project management platform with AI-powered analytics and team collaboration tools.",
    image: "/projects/techflow-homepage.png",
    liveUrl: "https://techflow-demo.vercel.app",
    completedDate: "March 2024",
    duration: "4 months",
    client: "TechFlow Inc.",
    budget: "$75,000",
    teamSize: "6 developers",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "OpenAI", "Redis", "Docker"],
    challenge:
      "TechFlow needed a scalable project management solution that could handle complex workflows while providing AI-powered insights to improve team productivity and project outcomes.",
    solution:
      "We developed a comprehensive SaaS platform with real-time collaboration, AI-powered analytics, and seamless integrations. The platform features advanced project tracking, automated reporting, and intelligent resource allocation.",
    results: [
      "300% increase in user engagement",
      "50% reduction in project completion time",
      "99.9% uptime achieved",
      "$50K+ monthly recurring revenue",
      "2,500+ active users within 6 months",
    ],
    features: [
      "AI-powered project insights and predictions",
      "Real-time collaboration with live editing",
      "Advanced analytics dashboard with custom reports",
      "Automated workflow management",
      "Payment processing and subscription management",
      "Multi-tenant architecture with role-based access",
      "Mobile-responsive design with PWA capabilities",
      "Third-party integrations (Slack, GitHub, Jira)",
    ],
    testimonials: [
      {
        name: "Sarah Chen",
        role: "CTO at TechFlow",
        avatar: "/avatars/sarah-chen.png",
        rating: 5,
        text: "Zenbourg delivered an exceptional SaaS platform that exceeded our expectations. The AI integration is seamless and our user engagement increased by 300%. The team's technical expertise and attention to detail were outstanding.",
        date: "March 2024",
      },
      {
        name: "Michael Rodriguez",
        role: "Product Manager",
        avatar: "/avatars/michael-rodriguez.png",
        rating: 5,
        text: "The platform's scalability and performance have been incredible. We went from handling 100 users to 2,500+ users without any issues. The automated reporting features save us 20+ hours per week.",
        date: "April 2024",
      },
    ],
    timeline: [
      {
        phase: "Discovery & Planning",
        duration: "2 weeks",
        description: "Requirements gathering, technical architecture design, and project roadmap creation",
      },
      {
        phase: "MVP Development",
        duration: "6 weeks",
        description: "Core platform development with basic project management features",
      },
      {
        phase: "AI Integration",
        duration: "4 weeks",
        description: "Implementation of AI-powered analytics and insights engine",
      },
      {
        phase: "Advanced Features",
        duration: "4 weeks",
        description: "Real-time collaboration, payment processing, and third-party integrations",
      },
      {
        phase: "Testing & Launch",
        duration: "2 weeks",
        description: "Comprehensive testing, performance optimization, and production deployment",
      },
    ],
  },
  "2": {
    id: 2,
    title: "MediCare Plus",
    domain: "Healthcare",
    category: "Healthcare Platform",
    description:
      "HIPAA-compliant telemedicine platform with appointment scheduling, video consultations, and patient management.",
    image: "/projects/medicare-homepage.png",
    liveUrl: "https://medicare-plus-demo.vercel.app",
    completedDate: "February 2024",
    duration: "6 months",
    client: "MediCare Plus Healthcare",
    budget: "$120,000",
    teamSize: "8 developers",
    technologies: ["React", "Node.js", "MongoDB", "WebRTC", "AWS", "Socket.io", "Stripe", "Twilio"],
    challenge:
      "MediCare Plus needed a comprehensive telemedicine platform that could handle secure video consultations, patient records management, and appointment scheduling while maintaining strict HIPAA compliance and ensuring seamless user experience for both doctors and patients.",
    solution:
      "We built a fully HIPAA-compliant telemedicine platform with HD video consultations, electronic health records, prescription management, and insurance integration. The platform includes advanced security measures, real-time communication, and mobile accessibility.",
    results: [
      "5,000+ registered patients and doctors",
      "15,000+ successful video consultations",
      "4.9/5 average patient satisfaction rating",
      "60% reduction in no-show appointments",
      "40% increase in patient engagement",
      "100% HIPAA compliance maintained",
    ],
    features: [
      "HIPAA-compliant infrastructure with end-to-end encryption",
      "HD video consultations with screen sharing",
      "Electronic health records (EHR) management",
      "Automated appointment scheduling and reminders",
      "Prescription management and e-prescribing",
      "Insurance verification and billing integration",
      "Patient portal with medical history access",
      "Doctor dashboard with patient management tools",
      "Mobile apps for iOS and Android",
      "Real-time chat and file sharing",
      "Telehealth analytics and reporting",
      "Multi-language support",
    ],
    testimonials: [
      {
        name: "Dr. Emily Watson",
        role: "Chief Medical Officer",
        avatar: "/avatars/emily-watson.png",
        rating: 5,
        text: "This platform revolutionized our practice. Patient satisfaction increased dramatically, and we can now serve 3x more patients efficiently. The HIPAA compliance and security features give us complete peace of mind.",
        date: "February 2024",
      },
      {
        name: "James Thompson",
        role: "Healthcare Administrator",
        avatar: "/avatars/james-thompson.png",
        rating: 5,
        text: "The platform's intuitive interface and robust functionality have streamlined our entire workflow. Our staff loves how easy it is to manage appointments and patient records. The video quality is exceptional.",
        date: "March 2024",
      },
    ],
    timeline: [
      {
        phase: "Compliance & Security Setup",
        duration: "3 weeks",
        description: "HIPAA compliance framework, security architecture, and regulatory requirements analysis",
      },
      {
        phase: "Core Platform Development",
        duration: "8 weeks",
        description: "Patient/doctor portals, appointment system, and basic EHR functionality",
      },
      {
        phase: "Video Consultation System",
        duration: "6 weeks",
        description: "WebRTC implementation, HD video streaming, and real-time communication features",
      },
      {
        phase: "Advanced Healthcare Features",
        duration: "6 weeks",
        description: "Prescription management, insurance integration, and advanced EHR capabilities",
      },
      {
        phase: "Mobile Apps & Testing",
        duration: "4 weeks",
        description: "iOS/Android app development, comprehensive testing, and security audits",
      },
      {
        phase: "Deployment & Training",
        duration: "1 week",
        description: "Production deployment, staff training, and go-live support",
      },
    ],
  },
}

export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const project = projectData[params.id as keyof typeof projectData]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button asChild>
            <Link href="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button asChild variant="outline">
              <Link href="/portfolio">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>
            <div className="flex space-x-3">
              <Button asChild>
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Site
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Get Similar Project</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4">{project.domain}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{project.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{project.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <Calendar className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-sm font-medium">{project.duration}</div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <div>
                  <Users className="h-5 w-5 mx-auto mb-1 text-green-600" />
                  <div className="text-sm font-medium">{project.teamSize}</div>
                  <div className="text-xs text-gray-500">Team Size</div>
                </div>
                <div>
                  <TrendingUp className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                  <div className="text-sm font-medium">{project.budget}</div>
                  <div className="text-xs text-gray-500">Budget</div>
                </div>
                <div>
                  <Award className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                  <div className="text-sm font-medium">{project.completedDate}</div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={`${project.title} Homepage`}
                width={600}
                height={400}
                className="w-full rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Button asChild size="lg" variant="secondary">
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    View Live Site
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-red-600">The Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{project.challenge}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-green-600">Our Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{project.solution}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Project Results</h2>
            <p className="text-xl text-gray-600">Measurable impact and success metrics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.results.map((result, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-lg">{result}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technologies Used</h2>
            <p className="text-xl text-gray-600">Cutting-edge tools and frameworks</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-lg px-4 py-2">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600">Comprehensive functionality and capabilities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Project Timeline</h2>
            <p className="text-xl text-gray-600">Development phases and milestones</p>
          </div>

          <div className="space-y-8">
            {project.timeline.map((phase, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-lg font-semibold">{phase.phase}</h3>
                    <Badge variant="outline">{phase.duration}</Badge>
                  </div>
                  <p className="text-gray-600">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-600">What our clients say about this project</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-2">"{testimonial.text}"</p>
                      <p className="text-xs text-gray-400">{testimonial.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8">Let's discuss how we can create a similar solution for your business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/book">Book Free Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/custom-quote">Get Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
