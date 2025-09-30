'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@sports-platform/ui'
import { format } from 'date-fns'
import Link from 'next/link'
import { trpc } from '@/lib/trpc'
import { useAuth } from '@/lib/auth'

export default function EventsPage() {
  const { user } = useAuth()
  const [selectedTeam, setSelectedTeam] = useState<string>('all')
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')

  // Mock data for now - will be replaced with actual tRPC calls
  const events: any[] = [
    {
      id: 'event-1',
      title: 'Training Session',
      description: 'Weekly team training',
      location: 'Main Field',
      startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      capacity: 20,
      teamId: 'team-1'
    },
    {
      id: 'event-2',
      title: 'Match vs Rivals',
      description: 'Important league match',
      location: 'Stadium',
      startsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      capacity: 50,
      teamId: 'team-1'
    }
  ]
  const isLoading = false
  const error = null

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading events...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-red-600 mb-2">Error loading events</h3>
          <p className="text-gray-600">Failed to load events</p>
        </div>
      </div>
    )
  }

  const getRoleSpecificHeader = () => {
    switch (user.role) {
      case 'MEMBER':
        return {
          title: 'My Events',
          description: 'View and RSVP to your club events',
          badge: 'MEMBER'
        }
      case 'COACH':
        return {
          title: 'Team Events Management',
          description: 'Manage your team events and track attendance',
          badge: 'COACH'
        }
      case 'ADMIN':
        return {
          title: 'All Organization Events',
          description: 'Manage all events across the organization',
          badge: 'ADMIN'
        }
      case 'PARENT':
        return {
          title: 'Child Events',
          description: 'Manage RSVPs for your child',
          badge: 'PARENT'
        }
      default:
        return {
          title: 'My Club Events',
          description: 'View and manage events for your clubs',
          badge: 'USER'
        }
    }
  }

  const header = getRoleSpecificHeader()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{header.title}</h1>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {header.badge}
          </span>
        </div>
        <p className="text-gray-600">{header.description}</p>
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Teams</option>
              <option value="team-1">Senior Team</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {event.teamId && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                          Team Event
                        </span>
                      )}
                      {format(new Date(event.startsAt), 'PPP p')} - {format(new Date(event.endsAt), 'p')}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/events/${event.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details →
                    </Link>
                    {user.role === 'COACH' && event.teamId && (
                      <Link
                        href={`/events/${event.id}/attendance`}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        Mark Attendance
                      </Link>
                    )}
                    {user.role === 'ADMIN' && (
                      <Link
                        href={`/events/${event.id}/attendance`}
                        className="text-purple-600 hover:text-purple-800 font-medium"
                      >
                        Manage Event
                      </Link>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">📍 {event.location}</span>
                  {event.capacity && (
                    <span>👥 Capacity: {event.capacity}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
