'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@sports-platform/ui'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { trpc } from '@/lib/trpc'
import { useAuth } from '@/lib/auth'

export default function AttendancePage() {
  const { user } = useAuth()
  const params = useParams()
  const eventId = params.id as string
  
  // Mock data for now - will be replaced with actual tRPC calls
  const event: any = { id: eventId, title: 'Training Session', startsAt: new Date() }
  const teamMembers: any[] = [
    { id: 'member-1', displayName: 'Alice Member', role: 'MEMBER' },
    { id: 'member-2', displayName: 'Bob Member', role: 'MEMBER' }
  ]
  const attendance: any[] = []
  const eventLoading = false
  const membersLoading = false
  const eventError = null

  const handleAttendanceChange = async (memberProfileId: string, status: 'PRESENT' | 'LATE' | 'ABSENT') => {
    console.log('Attendance change:', { memberProfileId, status })
    // TODO: Implement actual tRPC call
  }

  if (eventLoading || membersLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading attendance data...</p>
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

  const eventData = event[0]
  const teamMembersForEvent = teamMembers?.filter(member => member.teamId === eventData.teamId) || []
  const attendanceMap = new Map(attendance?.map(a => [a.memberProfileId, a.status]) || [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <a href={`/events/${eventId}`} className="hover:text-blue-600">← Back to Event</a>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance - {eventData.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>📅 {format(new Date(eventData.startsAt), 'PPP p')}</span>
          <span>📍 {eventData.location}</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>
            Mark attendance for team members. Changes are saved automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {teamMembersForEvent.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No team members found for this event.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {teamMembersForEvent.map((member) => {
                const currentStatus = attendanceMap.get(member.id)
                
                return (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {member.displayName?.charAt(0) || '?'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.displayName}</h3>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={currentStatus === 'PRESENT' ? 'default' : 'outline'}
                        onClick={() => handleAttendanceChange(member.id, 'PRESENT')}
                        disabled={false}
                        className={currentStatus === 'PRESENT' ? 'bg-green-600 hover:bg-green-700' : ''}
                      >
                        Present
                      </Button>
                      <Button
                        size="sm"
                        variant={currentStatus === 'LATE' ? 'default' : 'outline'}
                        onClick={() => handleAttendanceChange(member.id, 'LATE')}
                        disabled={false}
                        className={currentStatus === 'LATE' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
                      >
                        Late
                      </Button>
                      <Button
                        size="sm"
                        variant={currentStatus === 'ABSENT' ? 'default' : 'outline'}
                        onClick={() => handleAttendanceChange(member.id, 'ABSENT')}
                        disabled={false}
                        className={currentStatus === 'ABSENT' ? 'bg-red-600 hover:bg-red-700' : ''}
                      >
                        Absent
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
