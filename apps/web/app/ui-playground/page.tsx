'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@sports-platform/ui'
import { useAuth } from '@/lib/auth'

export default function UIPlaygroundPage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">UI Playground</h1>
        <p className="text-gray-600">Visual editing playground for Builder.io Fusion</p>
        <div className="mt-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            Current User: {user.displayName} ({user.role})
          </span>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Card Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Card</CardTitle>
              <CardDescription>Training Session - Tomorrow 2:00 PM</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Weekly team training session at Main Field</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">📍 Main Field</span>
                <span>👥 Capacity: 20</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Match Card</CardTitle>
              <CardDescription>vs Rivals - Next Week 3:00 PM</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Important league match at Stadium</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">📍 Stadium</span>
                <span>👥 Capacity: 50</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Card</CardTitle>
              <CardDescription>Senior Team - Active</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Main competitive team for the season</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">👥 15 Members</span>
                <span>🏆 League Champions</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Button Components</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button size="sm">Small Button</Button>
          <Button size="lg">Large Button</Button>
          <Button disabled>Disabled Button</Button>
        </div>
      </div>

      {/* Role-specific Content */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Role-specific Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.role === 'MEMBER' && (
            <Card>
              <CardHeader>
                <CardTitle>Member Dashboard</CardTitle>
                <CardDescription>Your personal event management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>RSVP to events</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>View event details</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>Check attendance history</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {user.role === 'COACH' && (
            <Card>
              <CardHeader>
                <CardTitle>Coach Dashboard</CardTitle>
                <CardDescription>Team management tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>Create team events</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>Mark attendance</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>View team RSVPs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {user.role === 'ADMIN' && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Panel</CardTitle>
                <CardDescription>Full organization control</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>Manage all events</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>View all RSVPs</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>Full organization access</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {user.role === 'PARENT' && (
            <Card>
              <CardHeader>
                <CardTitle>Parent Portal</CardTitle>
                <CardDescription>Manage your child's events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>RSVP for your child</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>View child events</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>Track child attendance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interactive Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>RSVP Section</CardTitle>
              <CardDescription>Event RSVP controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Going
                </Button>
                <Button variant="outline" className="w-full">
                  Maybe
                </Button>
                <Button variant="outline" className="w-full">
                  Not Going
                </Button>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Your current status: <span className="font-medium">Going</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Tracking</CardTitle>
              <CardDescription>Coach attendance controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Alice Member</span>
                  <div className="flex gap-1">
                    <Button size="sm" className="bg-green-100 text-green-800">Present</Button>
                    <Button size="sm" variant="outline">Late</Button>
                    <Button size="sm" variant="outline">Absent</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">Bob Member</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">Present</Button>
                    <Button size="sm" className="bg-yellow-100 text-yellow-800">Late</Button>
                    <Button size="sm" variant="outline">Absent</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
