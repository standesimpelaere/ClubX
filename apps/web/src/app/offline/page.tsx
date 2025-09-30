'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@sports-platform/ui'

export default function OfflinePage() {
  const router = useRouter()

  const handleRetry = () => {
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Je bent offline
          </h1>
          <p className="text-gray-600 mb-6">
            Er is geen internetverbinding. Je hebt beperkte functionaliteit beschikbaar.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button onClick={handleRetry} className="w-full">
            Opnieuw proberen
          </Button>
          
          <p className="text-sm text-gray-500">
            Controleer je internetverbinding en probeer het opnieuw.
          </p>
        </div>
      </div>
    </div>
  )
}
