"use client"

import { motion } from "framer-motion"
import { ArrowRight, Target, TrendingUp, BarChart3, Zap, Heart, CheckCircle, DollarSign, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const benefits = [
  {
    icon: Target,
    title: "Expanded Brand Awareness & Precise Targeting",
    description: "Reach millions of buyers with laser-focused precision",
    details: [
      "Over 5.5 billion people use the internet daily",
      "4.7 billion are active on social media",
      "Advanced targeting by demographics, interests, and behavior",
      "Pay only to reach your ideal customers",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: DollarSign,
    title: "Cost-Effective Lead Generation",
    description: "Lower costs, higher quality leads",
    details: [
      "40-60% lower cost per lead vs traditional channels",
      "Boutique fitness studio example: $3,000 spend",
      "200,000 impressions, 4,000 clicks (2% CTR)",
      "160 leads at $18.75 cost per lead",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Higher Conversion Rates with A/B Testing",
    description: "Data-driven optimization for maximum results",
    details: [
      "Boost conversion rates by up to 50% within weeks",
      "Test headlines, images, and calls to action",
      "E-commerce example: 2% to 3% conversion improvement",
      "2,000 visits = 60 orders instead of 40",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Measurable ROI & Real-Time Analytics",
    description: "Track every dollar with precision",
    details: [
      "Granular dashboards showing clicks and conversions",
      "Track performance down to individual keywords",
      "Smart budget allocation in real-time",
      "No waiting months for audit reports",
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Zap,
    title: "Scalable & Automated Campaigns",
    description: "AI-powered optimization for better results",
    details: [
      "Machine-learning algorithms optimize bids automatically",
      "Retargeting delivers 30% more conversions",
      "Automated email sequences (welcome, cart abandonment)",
      "3-5x return on email marketing budget",
    ],
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Heart,
    title: "Enhanced Customer Loyalty & Lifetime Value",
    description: "Build lasting relationships that drive repeat business",
    details: [
      "Personalized journeys based on behavior",
      "Increase average order value by 10-20%",
      "Social proof and user-generated content",
      "Turn buyers into brand advocates",
    ],
    color: "from-pink-500 to-rose-500",
  },
]

export default function DigitalMarketingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30"
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          className="pt-32 pb-20 px-4 sm:px-6 lg:px-8"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm font-medium">
                Digital Marketing Excellence
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Strategic Digital Marketing
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Drives Growth</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              In the age of smartphones and social feeds, digital marketing is your most powerful engine for reaching
              new customers, reinforcing your brand, and multiplying sales.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
              >
                <Link href="/marketing-audit">
                  Get Free Marketing Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
                <Link href="/portfolio">View Case Studies</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          className="py-20 px-4 sm:px-6 lg:px-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Digital Marketing Transforms Businesses
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover how strategic digital marketing delivers measurable results and sustainable growth
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} p-4 mb-4`}>
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {benefit.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                        {benefit.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {benefit.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ROI Calculator Section */}
        <motion.section
          className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Sample ROI Calculation
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                See the dramatic difference digital marketing makes
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="overflow-x-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Metric</th>
                      <th className="px-6 py-4 text-center font-semibold">Traditional Marketing</th>
                      <th className="px-6 py-4 text-center font-semibold">Digital Marketing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Monthly Spend</td>
                      <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">$5,000</td>
                      <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">$5,000</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Monthly Leads</td>
                      <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">100 (flyers, radio)</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">267 (online ads)</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Cost per Lead (CPL)</td>
                      <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">$50</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">$18.75</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Conversion Rate</td>
                      <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">2% (2 sales)</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">4% (11 sales)</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Average Order Value</td>
                      <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">$200</td>
                      <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">$200</td>
                    </tr>
                    <tr className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">Monthly Revenue</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">$400</td>
                      <td className="px-6 py-4 text-center font-bold text-green-600 text-lg">$2,200</td>
                    </tr>
                    <tr className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">Return on Ad Spend (ROAS)</td>
                      <td className="px-6 py-4 text-center font-bold text-red-600">0.08×</td>
                      <td className="px-6 py-4 text-center font-bold text-green-600 text-lg">0.44×</td>
                    </tr>
                    <tr className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">Net Increase in Revenue</td>
                      <td className="px-6 py-4 text-center text-gray-500">—</td>
                      <td className="px-6 py-4 text-center font-bold text-green-600 text-xl">+$1,800</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <span className="font-bold text-green-600">450% increase</span> in monthly revenue with the same
                marketing budget
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Your SMB Needs Digital Marketing */}
        <motion.section
          className="py-20 px-4 sm:px-6 lg:px-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Your SMB Needs Digital Marketing Now
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Eye, title: "Immediate Visibility", desc: "Go live in days, not months" },
                { icon: DollarSign, title: "Cost Control", desc: "Scale budgets up or down in real time" },
                { icon: Target, title: "Precision Targeting", desc: "Reach pinpoint audiences at every funnel stage" },
                { icon: TrendingUp, title: "Data-Driven Growth", desc: "Optimize continuously for maximum ROI" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 p-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Supercharge Your Growth?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Partner with us to craft a custom digital marketing strategy—complete with audience research, compelling
              creatives, and ongoing optimization—so your business captures more leads, wins more sales, and builds
              long-term customer loyalty.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Link href="/marketing-audit">
                  Get Free Audit & ROI Estimate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              >
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
