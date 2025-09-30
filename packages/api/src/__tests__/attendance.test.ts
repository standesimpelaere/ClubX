import { describe, it, expect, beforeEach } from 'vitest'
import { appRouter } from '../index'
import { createContext } from '../context'

describe('Attendance Router', () => {
  const ctx = createContext()
  const caller = appRouter.createCaller(ctx)

  beforeEach(async () => {
    // Reset database state if needed
  })

  describe('mark', () => {
    it('should mark attendance for team member', async () => {
      const attendanceData = {
        orgId: 'org-1',
        eventId: 'event-1',
        memberProfileId: 'member-1',
        status: 'PRESENT' as const
      }

      const result = await caller.attendance.mark(attendanceData)

      expect(result).toBeDefined()
      expect(result.status).toBe('PRESENT')
      expect(result.memberProfileId).toBe(attendanceData.memberProfileId)
    })

    it('should update existing attendance record', async () => {
      // First mark as present
      const initialData = {
        orgId: 'org-1',
        eventId: 'event-1',
        memberProfileId: 'member-1',
        status: 'PRESENT' as const
      }

      await caller.attendance.mark(initialData)

      // Then update to late
      const updateData = {
        ...initialData,
        status: 'LATE' as const
      }

      const result = await caller.attendance.mark(updateData)

      expect(result.status).toBe('LATE')
    })

    it('should allow COACH to mark attendance for team members', async () => {
      // Create context with COACH role
      const coachCtx = createContext({ query: { userId: 'user-2' } })
      const coachCaller = appRouter.createCaller(coachCtx)

      const attendanceData = {
        orgId: 'org-1',
        eventId: 'event-1',
        memberProfileId: 'member-1', // Team member
        status: 'PRESENT' as const
      }

      const result = await coachCaller.attendance.mark(attendanceData)
      expect(result.status).toBe('PRESENT')
    })

    it('should reject MEMBER from marking attendance', async () => {
      // Create context with MEMBER role
      const memberCtx = createContext({ query: { userId: 'user-1' } })
      const memberCaller = appRouter.createCaller(memberCtx)

      const attendanceData = {
        orgId: 'org-1',
        eventId: 'event-1',
        memberProfileId: 'member-1',
        status: 'PRESENT' as const
      }

      await expect(memberCaller.attendance.mark(attendanceData)).rejects.toThrow('FORBIDDEN')
    })

    it('should allow ADMIN to mark attendance for any member', async () => {
      // Create context with ADMIN role
      const adminCtx = createContext({ query: { userId: 'user-3' } })
      const adminCaller = appRouter.createCaller(adminCtx)

      const attendanceData = {
        orgId: 'org-1',
        eventId: 'event-1',
        memberProfileId: 'member-1',
        status: 'PRESENT' as const
      }

      const result = await adminCaller.attendance.mark(attendanceData)
      expect(result.status).toBe('PRESENT')
    })

    it('should reject COACH from marking attendance for non-team members', async () => {
      // Create context with COACH role
      const coachCtx = createContext({ query: { userId: 'user-2' } })
      const coachCaller = appRouter.createCaller(coachCtx)

      const attendanceData = {
        orgId: 'org-1',
        eventId: 'event-1',
        memberProfileId: 'member-3', // Different team member
        status: 'PRESENT' as const
      }

      await expect(coachCaller.attendance.mark(attendanceData)).rejects.toThrow('FORBIDDEN')
    })
  })

  describe('listForEvent', () => {
    it('should list attendance for event', async () => {
      const result = await caller.attendance.listForEvent({
        orgId: 'org-1',
        eventId: 'event-1'
      })

      expect(Array.isArray(result)).toBe(true)
    })

    it('should allow COACH to list attendance for team events', async () => {
      // Create context with COACH role
      const coachCtx = createContext({ query: { userId: 'user-2' } })
      const coachCaller = appRouter.createCaller(coachCtx)

      const result = await coachCaller.attendance.listForEvent({
        orgId: 'org-1',
        eventId: 'event-1'
      })

      expect(Array.isArray(result)).toBe(true)
    })

    it('should reject MEMBER from listing attendance', async () => {
      // Create context with MEMBER role
      const memberCtx = createContext({ query: { userId: 'user-1' } })
      const memberCaller = appRouter.createCaller(memberCtx)

      await expect(memberCaller.attendance.listForEvent({
        orgId: 'org-1',
        eventId: 'event-1'
      })).rejects.toThrow('FORBIDDEN')
    })

    it('should allow ADMIN to list attendance for any event', async () => {
      // Create context with ADMIN role
      const adminCtx = createContext({ query: { userId: 'user-3' } })
      const adminCaller = appRouter.createCaller(adminCtx)

      const result = await adminCaller.attendance.listForEvent({
        orgId: 'org-1',
        eventId: 'event-1'
      })

      expect(Array.isArray(result)).toBe(true)
    })
  })
})
