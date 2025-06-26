"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, CreditCard, Users } from "lucide-react"

export default function AdminDashboardPage() {
  const { data: session } = useSession()
  const [bookings, setBookings] = useState([])
  const [customRequests, setCustomRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // In a real app, fetch from API
        // const bookingsRes = await fetch('/api/admin/bookings')
        // const bookingsData = await bookingsRes.json()
        // setBookings(bookingsData.bookings)

        // const requestsRes = await fetch('/api/admin/custom-requests')
        // const requestsData = await requestsRes.json()
        // setCustomRequests(requestsData.requests)

        // Mock data for demo
        setBookings([
          {
            id: "BK-1234",
            fullName: "John Doe",
            email: "john@example.com",
            service: "Website Development",
            date: "2024-01-15",
            time: "10:00 AM",
            status: "confirmed",
          },
          {
            id: "BK-5678",
            fullName: "Jane Smith",
            email: "jane@example.com",
            service: "SEO Optimization",
            date: "2024-01-22",
            time: "2:00 PM",
            status: "confirmed",
          },
          {
            id: "BK-9012",
            fullName: "Mike Johnson",
            email: "mike@example.com",
            service: "Digital Marketing",
            date: "2024-01-25",
            time: "11:30 AM",
            status: "confirmed",
          },
        ])

        setCustomRequests([
          {
            id: "REQ-1234",
            fullName: "Sarah Wilson",
            email: "sarah@example.com",
            businessName: "Wilson Enterprises",
            projectDescription: "E-commerce website with custom product configurator",
            budgetRange: "$10,000 - $25,000",
            timeline: "2-3 months",
            status: "pending",
          },
          {
            id: "REQ-5678",
            fullName: "David Brown",
            email: "david@example.com",
            businessName: "Brown Solutions",
            projectDescription: "Corporate website with blog and customer portal",
            budgetRange: "$5,000 - $10,000",
            timeline: "1-2 months",
            status: "pending",
          },
        ])
      } catch (error) {
        console.error("Error fetching admin data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  if (isLoading) {
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
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {session?.user?.name || "Admin"}!</p>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Upcoming Bookings</p>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full mr-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Custom Requests</p>
                  <p className="text-2xl font-bold">{customRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-full mr-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">124</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-full mr-4">
                  <CreditCard className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold">$24,500</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="custom-requests">Custom Requests</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">ID</th>
                        <th className="text-left py-3 px-4 font-medium">Name</th>
                        <th className="text-left py-3 px-4 font-medium">Email</th>
                        <th className="text-left py-3 px-4 font-medium">Service</th>
                        <th className="text-left py-3 px-4 font-medium">Date & Time</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking: any) => (
                        <tr key={booking.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{booking.id}</td>
                          <td className="py-3 px-4">{booking.fullName}</td>
                          <td className="py-3 px-4">{booking.email}</td>
                          <td className="py-3 px-4">{booking.service}</td>
                          <td className="py-3 px-4">
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className="bg-green-500">{booking.status}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom-requests">
            <Card>
              <CardHeader>
                <CardTitle>Custom Website Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {customRequests.map((request: any) => (
                    <div key={request.id} className="border rounded-lg p-6">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{request.businessName}</h3>
                          <p className="text-gray-600">
                            {request.fullName} ({request.email})
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Badge className="bg-blue-500">{request.status}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Budget Range:</p>
                          <p className="font-medium">{request.budgetRange}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Timeline:</p>
                          <p className="font-medium">{request.timeline}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Project Description:</p>
                        <p className="mt-1">{request.projectDescription}</p>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Generate Quote</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">User management interface coming soon.</p>
                  <Button asChild>
                    <Link href="/admin/users">Go to Full User Management</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
