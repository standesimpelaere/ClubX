'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth'

export default function Home() {
  const { user } = useAuth()

  const getRoleSpecificContent = () => {
    switch (user.role) {
      case 'MEMBER':
        return {
          title: 'Welcome, Member!',
          description: 'View and RSVP to upcoming events',
          primaryAction: { text: 'View My Events', href: '/my-clubs/events', color: 'bg-blue-600 hover:bg-blue-700' },
          secondaryAction: { text: 'All Events', href: '/events', color: 'bg-gray-600 hover:bg-gray-700' },
          features: ['RSVP to events', 'View event details', 'Check your attendance history']
        }
      case 'COACH':
        return {
          title: 'Coach Dashboard',
          description: 'Manage your team events and track attendance',
          primaryAction: { text: 'Manage Events', href: '/my-clubs/events', color: 'bg-green-600 hover:bg-green-700' },
          secondaryAction: { text: 'All Events', href: '/events', color: 'bg-gray-600 hover:bg-gray-700' },
          features: ['Create team events', 'Mark attendance', 'View team RSVPs', 'Manage event capacity']
        }
      case 'ADMIN':
        return {
          title: 'Admin Panel',
          description: 'Full control over organization events and members',
          primaryAction: { text: 'Manage All Events', href: '/my-clubs/events', color: 'bg-purple-600 hover:bg-purple-700' },
          secondaryAction: { text: 'All Events', href: '/events', color: 'bg-gray-600 hover:bg-gray-700' },
          features: ['Manage all events', 'View all RSVPs', 'Mark any attendance', 'Full organization access']
        }
      case 'PARENT':
        return {
          title: 'Parent Portal',
          description: 'Manage RSVPs for your child',
          primaryAction: { text: 'Child Events', href: '/my-clubs/events', color: 'bg-orange-600 hover:bg-orange-700' },
          secondaryAction: { text: 'All Events', href: '/events', color: 'bg-gray-600 hover:bg-gray-700' },
          features: ['RSVP for your child', 'View child events', 'Track child attendance']
        }
      default:
        return {
          title: 'Sports Platform',
          description: 'Manage your sports club events and RSVPs',
          primaryAction: { text: 'View Events', href: '/my-clubs/events', color: 'bg-blue-600 hover:bg-blue-700' },
          secondaryAction: { text: 'All Events', href: '/events', color: 'bg-gray-600 hover:bg-gray-700' },
          features: ['View events', 'RSVP to events']
        }
    }
  }

  const content = getRoleSpecificContent()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="mb-4">
            <span className="inline-block bg-white text-gray-800 text-sm px-3 py-1 rounded-full mb-2">
              {user.role}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {content.description}
          </p>
          <div className="space-x-4 mb-8">
            <Link
              href={content.primaryAction.href}
              className={`inline-block text-white px-6 py-3 rounded-lg transition-colors ${content.primaryAction.color}`}
            >
              {content.primaryAction.text}
            </Link>
            <Link
              href={content.secondaryAction.href}
              className={`inline-block text-white px-6 py-3 rounded-lg transition-colors ${content.secondaryAction.color}`}
            >
              {content.secondaryAction.text}
            </Link>
          </div>
          
          {/* Role-specific features */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your capabilities:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
