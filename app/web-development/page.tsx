"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  TrendingUp,
  MessageCircle,
  BarChart3,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  Target,
  Rocket,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import AnimatedSection from "@/components/animated-section"

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

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
                Professional Web Development
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              How Professional Web Development
              <br />
              <span className="text-green-600 dark:text-green-400">Fuels Growth</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              In today's digital-first world, your website is more than just an online storefront—it's a powerful engine
              that drives visibility, credibility, and revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3"
                asChild
              >
                <Link href="/book">
                  Get Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 text-blue-500/20 dark:text-blue-400/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Globe className="h-16 w-16" />
        </motion.div>

        <motion.div
          className="absolute top-32 right-16 text-purple-500/20 dark:text-purple-400/20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Rocket className="h-12 w-12" />
        </motion.div>
      </section>

      {/* Benefits Section */}
      <AnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Transform Your Business with Professional Web Development
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover how a well-built website can unlock new markets, streamline operations, and turbocharge your
                bottom line.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Benefit Cards */}
              <motion.div variants={fadeInUp} {...scaleOnHover}>
                <Card className="h-full border-2 border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-xl">Amplified Visibility & Credibility</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">24/7 Global Access</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Reach 5+ billion internet users worldwide, day or night
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Instant Trust</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Professional design signals reliability and lowers bounce rates
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp} {...scaleOnHover}>
                <Card className="h-full border-2 border-green-100 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle className="text-xl">Accelerated Revenue Growth</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">50% Faster Growth</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Optimized websites outperform offline-only businesses
                          </p>
                        </div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">
                          Real Impact: Local café generating $12,000 extra monthly revenue
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp} {...scaleOnHover}>
                <Card className="h-full border-2 border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <CardTitle className="text-xl">Higher Conversions</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">9% Higher Conversion</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Sites loading under 2 seconds perform better
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Double Lead Generation</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Strategic CTAs can turn 1% into 2% conversion rates
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp} {...scaleOnHover}>
                <Card className="h-full border-2 border-orange-100 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                        <MessageCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <CardTitle className="text-xl">Streamlined Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">50% Profit Boost</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            5% retention increase from proactive support
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">30% Fewer Tickets</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Self-service portals reduce support load
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp} {...scaleOnHover}>
                <Card className="h-full border-2 border-indigo-100 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                        <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <CardTitle className="text-xl">Cost-Effective Marketing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">126% More Leads</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Consistent blogging drives qualified traffic
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Data-Driven Decisions</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Analytics reveal high-performing channels
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp} {...scaleOnHover}>
                <Card className="h-full border-2 border-pink-100 dark:border-pink-800 hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-pink-100 dark:bg-pink-900 rounded-lg">
                        <ShoppingCart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                      </div>
                      <CardTitle className="text-xl">E-Commerce Power</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">24/7 Selling</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Tap into national and international markets
                          </p>
                        </div>
                      </div>
                      <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg">
                        <p className="text-sm font-medium text-pink-800 dark:text-pink-200">
                          Success Story: Jewelry brand doubled sales from $20,000 to $40,000 monthly
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* ROI Calculator Section */}
      <AnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sample ROI Calculation</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                See how professional web development can transform your business metrics
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl"
              variants={fadeInUp}
              {...scaleOnHover}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                      <th className="text-left py-4 px-4 font-bold text-gray-900 dark:text-white">Metric</th>
                      <th className="text-center py-4 px-4 font-bold text-red-600">Before Website</th>
                      <th className="text-center py-4 px-4 font-bold text-green-600">After Website</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-4 px-4 font-medium text-left">Monthly Visitors</td>
                      <td className="py-4 px-4">2,000</td>
                      <td className="py-4 px-4 text-green-600 font-bold">8,000</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-4 px-4 font-medium text-left">Conversion Rate</td>
                      <td className="py-4 px-4">1% (20 leads)</td>
                      <td className="py-4 px-4 text-green-600 font-bold">2% (160 leads)</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-4 px-4 font-medium text-left">Average Order Value</td>
                      <td className="py-4 px-4">$1,500</td>
                      <td className="py-4 px-4 text-green-600 font-bold">$1,800</td>
                    </tr>
                    <tr className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                      <td className="py-4 px-4 font-bold text-left">Monthly Revenue</td>
                      <td className="py-4 px-4 font-bold">$30,000</td>
                      <td className="py-4 px-4 font-bold text-green-600 text-xl">$288,000</td>
                    </tr>
                    <tr className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                      <td className="py-4 px-4 font-bold text-left">Net Increase</td>
                      <td className="py-4 px-4">—</td>
                      <td className="py-4 px-4 font-bold text-orange-600 text-xl">+$258,000 (860% increase)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    By refining site speed, design, and checkout UX, this hypothetical retailer jumps from $30,000 to
                    $288,000 per month—an 860% increase!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                A professionally developed website is no longer optional—it's your most versatile sales and marketing
                asset. From boosting credibility and conversions to enabling new revenue streams, the right digital
                strategy will pay for itself many times over.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div {...scaleOnHover}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3"
                    asChild
                  >
                    <Link href="/book">
                      Get Free Consultation & ROI Estimate <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div {...scaleOnHover}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3"
                    asChild
                  >
                    <Link href="/portfolio">View Our Work</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
