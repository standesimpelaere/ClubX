'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type User = {
  id: string
  role: string
  orgId: string
  teamIds: string[]
  memberProfileId: string
  displayName: string
}

const mockUsers: User[] = [
  {
    id: 'user-1',
    role: 'MEMBER',
    orgId: 'org-1',
    teamIds: ['team-1'],
    memberProfileId: 'member-1',
    displayName: 'Alice Member'
  },
  {
    id: 'user-2',
    role: 'COACH',
    orgId: 'org-1',
    teamIds: ['team-1'],
    memberProfileId: 'member-2',
    displayName: 'Jane Coach'
  },
  {
    id: 'user-3',
    role: 'ADMIN',
    orgId: 'org-1',
    teamIds: [],
    memberProfileId: 'member-3',
    displayName: 'John Admin'
  },
  {
    id: 'user-4',
    role: 'PARENT',
    orgId: 'org-1',
    teamIds: [],
    memberProfileId: 'member-4',
    displayName: 'Bob Parent'
  }
]

type AuthContextType = {
  user: User
  switchUser: (userId: string) => void
  availableUsers: User[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUserId, setCurrentUserId] = useState('user-1')
  const currentUser = mockUsers.find(u => u.id === currentUserId) || mockUsers[0]

  const switchUser = (userId: string) => {
    setCurrentUserId(userId)
  }

  return (
    <AuthContext.Provider value={{
      user: currentUser,
      switchUser,
      availableUsers: mockUsers
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
