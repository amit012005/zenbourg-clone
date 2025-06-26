"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, CreditCard, Users, BarChart } from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [bookings, setBookings] = useState([])
  const [payments, setPayments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/signin?callbackUrl=/dashboard")
    }
  }, [status])

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (status !== "authenticated") return

      try {
        // In a real app, fetch from API
        // const bookingsRes = await fetch('/api/bookings/user')
        // const bookingsData = await bookingsRes.json()
        // setBookings(bookingsData.bookings)

        // const paymentsRes = await fetch('/api/payments/user')
        // const paymentsData = await paymentsRes.json()
        // setPayments(paymentsData.payments)

        // Mock data for demo
        setBookings([
          {
            id: "BK-1234",
            service: "Website Development",
            date: "2024-01-15",
            time: "10:00 AM",
            status: "confirmed",
          },
          {
            id: "BK-5678",
            service: "SEO Optimization",
            date: "2024-01-22",
            time: "2:00 PM",
            status: "confirmed",
          },
        ])

        setPayments([
          {
            id: "PAY-1234",
            service: "Website Development",
            amount: 2999,
            date: "2024-01-10",
            status: "paid",
          },
          {
            id: "PAY-5678",
            service: "SEO Optimization",
            amount: 1499,
            date: "2024-01-12",
            status: "paid",
          },
        ])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [status])

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {session?.user?.name || "User"}!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild>
              <Link href="/book">Book New Consultation</Link>
            </Button>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Upcoming Consultations</p>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full mr-4">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold">
                    ${payments.reduce((total: number, payment: any) => total + payment.amount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-full mr-4">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold">{payments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-center text-gray-600 py-4">No bookings found</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking: any) => (
                      <div key={booking.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{booking.service}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                            <Clock className="h-4 w-4 ml-3 mr-1" />
                            <span>{booking.time}</span>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0 flex items-center">
                          <Badge className="bg-green-500">{booking.status}</Badge>
                          <Button variant="ghost" size="sm" className="ml-2">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Your Payments</CardTitle>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <p className="text-center text-gray-600 py-4">No payments found</p>
                ) : (
                  <div className="space-y-4">
                    {payments.map((payment: any) => (
                      <div key={payment.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{payment.service}</h3>
                          <div className="text-sm text-gray-600 mt-1">
                            <span>Payment ID: {payment.id}</span>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0">
                          <div className="text-right">
                            <p className="font-bold">${payment.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">{new Date(payment.date).toLocaleDateString()}</p>
                          </div>
                          <div className="mt-2 flex justify-end">
                            <Button variant="outline" size="sm">
                              Download Invoice
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Your Projects</CardTitle>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <p className="text-center text-gray-600 py-4">No active projects</p>
                ) : (
                  <div className="space-y-4">
                    {payments.map((payment: any) => (
                      <div key={payment.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{payment.service}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Started on {new Date(payment.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className="bg-blue-500">In Progress</Badge>
                        </div>
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">45% Complete</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm" className="mr-2">
                            View Details
                          </Button>
                          <Button size="sm">Contact Manager</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Admin Section (only visible to admins) */}
        {session?.user?.role === "admin" && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="font-medium mb-2">Manage Users</h3>
                    <p className="text-sm text-gray-600 mb-4">View and manage user accounts</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/admin/users">Access</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-medium mb-2">Booking Management</h3>
                    <p className="text-sm text-gray-600 mb-4">View and manage all bookings</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/admin/bookings">Access</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <BarChart className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium mb-2">Analytics Dashboard</h3>
                    <p className="text-sm text-gray-600 mb-4">View business performance metrics</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/admin/analytics">Access</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
