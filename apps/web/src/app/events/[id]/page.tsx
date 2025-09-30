'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@sports-platform/ui'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { trpc } from '@/lib/trpc'
import { useAuth } from '@/lib/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const rsvpSchema = z.object({
  status: z.enum(['GOING', 'MAYBE', 'NOT_GOING']),
  note: z.string().max(400).optional()
})

type RSVPForm = z.infer<typeof rsvpSchema>

export default function EventDetailPage() {
  const { user } = useAuth()
  const params = useParams()
  const eventId = params.id as string
  
  const { register, handleSubmit, setValue, watch } = useForm<RSVPForm>({
    resolver: zodResolver(rsvpSchema)
  })

  // Mock data for now - will be replaced with actual tRPC calls
  const event: any = { 
    id: eventId, 
    title: 'Training Session', 
    description: 'Weekly team training',
    location: 'Main Field',
    startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // Tomorrow + 2 hours
    capacity: 20
  }
  const currentRsvp: any = { status: 'GOING' }
  const eventLoading = false
  const eventError = null

  const handleRsvp = async (data: RSVPForm) => {
    console.log('RSVP change:', data)
    // TODO: Implement actual tRPC call
  }

  if (eventLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading event...</p>
        </div>
      </div>
    )
  }

  if (eventError || !event || event.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-red-600 mb-2">Event not found</h3>
          <p className="text-gray-600">The event you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const eventData = event
  const currentRsvpStatus = currentRsvp?.status
  const isEventPast = new Date() > new Date(eventData.startsAt)
  const isAtCapacity = eventData.capacity && 5 >= eventData.capacity // Mock: 5 current attendees

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <a href="/my-clubs/events" className="hover:text-blue-600">← Back to Events</a>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{eventData.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          {eventData.teamId && (
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              Team Event
            </span>
          )}
          <span>📅 {format(new Date(eventData.startsAt), 'PPP p')} - {format(new Date(eventData.endsAt), 'p')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Description</h4>
                <p className="text-gray-600">{eventData.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Location</h4>
                <p className="text-gray-600">📍 {eventData.location}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-1">Time</h4>
                <p className="text-gray-600">
                  {format(new Date(eventData.startsAt), 'EEEE, MMMM do, yyyy')}<br />
                  {format(new Date(eventData.startsAt), 'h:mm a')} - {format(new Date(eventData.endsAt), 'h:mm a')}
                </p>
              </div>

              {eventData.capacity && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Capacity</h4>
                  <p className="text-gray-600">
                    5 / {eventData.capacity} attendees
                    {isAtCapacity && (
                      <span className="ml-2 text-red-600 font-medium">(At capacity)</span>
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RSVP Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>RSVP</CardTitle>
              <CardDescription>
                Let us know if you'll be attending
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isEventPast ? (
                <p className="text-gray-500 text-sm">This event has already passed</p>
              ) : (
                <form onSubmit={handleSubmit(handleRsvp)} className="space-y-3">
                  <div className="space-y-2">
                    <Button
                      type="button"
                      onClick={() => {
                        setValue('status', 'GOING')
                        handleSubmit(handleRsvp)()
                      }}
                      disabled={false}
                      className={`w-full ${
                        currentRsvpStatus === 'GOING' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      Going
                    </Button>
                    
                    <Button
                      type="button"
                      onClick={() => {
                        setValue('status', 'MAYBE')
                        handleSubmit(handleRsvp)()
                      }}
                      disabled={{ isPending: false }.isPending}
                      variant={currentRsvpStatus === 'MAYBE' ? 'default' : 'outline'}
                      className="w-full"
                    >
                      Maybe
                    </Button>
                    
                    <Button
                      type="button"
                      onClick={() => {
                        setValue('status', 'NOT_GOING')
                        handleSubmit(handleRsvp)()
                      }}
                      disabled={{ isPending: false }.isPending}
                      variant={currentRsvpStatus === 'NOT_GOING' ? 'default' : 'outline'}
                      className="w-full"
                    >
                      Not Going
                    </Button>
                  </div>

                  {isAtCapacity && currentRsvpStatus !== 'GOING' && (
                    <p className="text-sm text-red-600">
                      This event is at capacity. You can only RSVP as "Going" if you're already confirmed.
                    </p>
                  )}

                  {currentRsvpStatus && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Your current status: <span className="font-medium capitalize">{currentRsvpStatus.toLowerCase().replace('_', ' ')}</span>
                      </p>
                    </div>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
