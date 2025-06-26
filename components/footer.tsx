import Link from "next/link"
import { Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black border-t border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-white">Zenbourg</h3>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Premium business services for modern companies. We help you grow with cutting-edge solutions.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>
                  105, Ab Rd, Sector C, Slice 5, Part 2, Shalimar Township, Indore, Madhya Pradesh 452010, India
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span>+91 7772828027</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span>+91 8094102789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <span>support@zenbourg.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Services</h4>
            <div className="space-y-2">
              <Link
                href="/web-development"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
              >
                Web Development
              </Link>
              <Link
                href="/digital-marketing"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
              >
                Digital Marketing
              </Link>
              <Link
                href="/custom-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
              >
                Custom Solutions
              </Link>
              <Link
                href="/services"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
              >
                Consulting
              </Link>
            </div>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Legal & Policies</h4>
            <div className="space-y-2">
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
              >
                Terms of Service
              </Link>
              <Link
                href="/refund-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
              >
                Refund Policy
              </Link>
              <Link
                href="/cookie-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
              >
                Cookie Policy
              </Link>
              <Link
                href="/disclaimer"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
              >
                Disclaimer
              </Link>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Stay Connected</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm sm:text-base"
                />
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-sm sm:text-base">
                  Subscribe
                </Button>
              </div>
              <div>
                <p className="text-sm text-gray-300 mb-2">Follow Us</p>
                <div className="flex space-x-4">
                  <Link
                    href="https://www.linkedin.com/company/zenbourg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/zenbourg_01?igsh=MXJsMTVvb3o2aHJ6Nw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-pink-400 transition-colors"
                  >
                    <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                  <Link
                    href="https://x.com/zenbourg7797"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:opacity-80 transition-opacity"
                  >
                    <img src="/icons/x-logo.png" alt="X logo" className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-300">
          <p className="text-xs sm:text-sm">&copy; 2024 Zenbourg. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
