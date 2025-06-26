import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CookieConsent from "@/components/cookie-consent"
import ChatBot from "@/components/chatbot"
import PageTransition from "@/components/page-transition"
import ScrollObserver from "@/components/scroll-observer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zenbourg - Premium Business Services",
  description: "Professional web development, design, and digital marketing services",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="zenbourg-theme"
        >
          <AuthProvider>
            <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
              <Header />
              <main className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </div>
            <ScrollObserver />
            <CookieConsent />
            <ChatBot />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
