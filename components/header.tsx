"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Our Work", href: "/portfolio" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Book Consultation", href: "/book" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="font-bold text-xl sm:text-2xl text-black dark:text-white">
              Zenbourg
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <div className="flex items-baseline space-x-1 xl:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors nav-animate link-animate"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="ml-2 xl:ml-4">
              <ThemeToggle />
            </div>

            {/* Auth Section */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden xl:inline">{session.user?.name || session.user?.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <DropdownMenuItem asChild className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                    <Link href="/dashboard" className="text-gray-900 dark:text-gray-100">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-900 dark:text-gray-100"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="ml-2 bg-blue-600 hover:bg-blue-700 text-white btn-animate ripple-effect">
                <Link href="/signin">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-4 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-2 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-3 transition-colors rounded-md nav-animate link-animate text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                {session ? (
                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-left w-full text-base font-medium"
                      onClick={() => {
                        signOut()
                        setIsMenuOpen(false)
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/signin"
                    className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
