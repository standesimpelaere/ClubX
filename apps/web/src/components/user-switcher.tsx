'use client'

import { useAuth } from '@/lib/auth'
import { Button } from '@sports-platform/ui'
import { useState } from 'react'

export function UserSwitcher() {
  const { user, switchUser, availableUsers } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="flex items-center gap-2"
      >
        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-xs font-medium text-blue-800">
            {user.displayName.charAt(0)}
          </span>
        </div>
        <span className="hidden sm:inline">{user.displayName}</span>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{user.role}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-3 border-b">
            <h3 className="font-medium text-gray-900">Switch User</h3>
            <p className="text-sm text-gray-600">Select a user to test different roles</p>
          </div>
          <div className="p-2">
            {availableUsers.map((availableUser) => (
              <button
                key={availableUser.id}
                onClick={() => {
                  switchUser(availableUser.id)
                  setIsOpen(false)
                }}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  user.id === availableUser.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {availableUser.displayName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{availableUser.displayName}</div>
                    <div className="text-sm text-gray-600">{availableUser.role}</div>
                  </div>
                  {user.id === availableUser.id && (
                    <div className="ml-auto">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
