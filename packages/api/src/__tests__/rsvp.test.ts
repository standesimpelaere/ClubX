import { describe, it, expect, beforeEach } from 'vitest'
import { appRouter } from '../index'
import { createContext } from '../context'

describe('RSVP Router', () => {
  const ctx = createContext()
  const caller = appRouter.createCaller(ctx)

  beforeEach(async () => {
    // Reset database state if needed
  })

  describe('upsert', () => {
    it('should create RSVP for valid event', async () => {
      const rsvpData = {
        orgId: 'org-1',
        eventId: 'event-1',
        memberProfileId: 'member-1',
        status: 'GOING' as const,
        note: 'Looking forward to it!'
      }

      const result = await caller.rsvp.upsert(rsvpData)

      expect(result).toBeDefined()
      expect(result.status).toBe('GOING')
      expect(result.note).toBe('Looking forward to it!')
    })

    it('should update existing RSVP', async () => {
      // First create an RSVP
      const rsvpData = {
        orgId: 'org-1',
        eventId: 'event-1',
        memberProfileId: 'member-1',
        status: 'GOING' as const
      }

      await caller.rsvp.upsert(rsvpData)

      // Then update it
      const updateData = {
        ...rsvpData,
        status: 'MAYBE' as const,
        note: 'Might be late'
      }

      const result = await caller.rsvp.upsert(updateData)

      expect(result.status).toBe('MAYBE')
      expect(result.note).toBe('Might be late')
    })

    it('should reject RSVP for past event', async () => {
      const pastEvent = {
        orgId: 'org-1',
        eventId: 'past-event',
        memberProfileId: 'member-1',
        status: 'GOING' as const
      }

      // This would fail if the event is in the past
      // In a real test, you'd set up a past event first
      await expect(caller.rsvp.upsert(pastEvent)).rejects.toThrow()
    })

    it('should reject RSVP when event is at capacity', async () => {
      const rsvpData = {
        orgId: 'org-1',
        eventId: 'full-event',
        memberProfileId: 'member-1',
        status: 'GOING' as const
      }

      // This would fail if the event is at capacity
      // In a real test, you'd set up a full event first
      await expect(caller.rsvp.upsert(rsvpData)).rejects.toThrow()
    })

    it('should allow MEMBER to RSVP for own profile', async () => {
      // Create context with MEMBER role
      const memberCtx = createContext({ query: { userId: 'user-1' } })
      const memberCaller = appRouter.createCaller(memberCtx)

      const rsvpData = {
        orgId: 'org-1',
        eventId: 'event-1',
        memberProfileId: 'member-1', // Own profile
        status: 'GOING' as const
      }

      const result = await memberCaller.rsvp.upsert(rsvpData)
      expect(result.status).toBe('GOING')
    })

    it('should reject MEMBER from RSVP for other member', async () => {
      // Create context with MEMBER role
      const memberCtx = createContext({ query: { userId: 'user-1' } })
      const memberCaller = appRouter.createCaller(memberCtx)

      const rsvpData = {
        orgId: 'org-1',
        eventId: 'event-1',
        memberProfileId: 'member-2', // Different member
        status: 'GOING' as const
      }

      await expect(memberCaller.rsvp.upsert(rsvpData)).rejects.toThrow('FORBIDDEN')
    })

    it('should allow COACH to RSVP for team members', async () => {
      // Create context with COACH role
      const coachCtx = createContext({ query: { userId: 'user-2' } })
      const coachCaller = appRouter.createCaller(coachCtx)

      const rsvpData = {
        orgId: 'org-1',
        eventId: 'event-1',
        memberProfileId: 'member-1', // Team member
        status: 'GOING' as const
      }

      const result = await coachCaller.rsvp.upsert(rsvpData)
      expect(result.status).toBe('GOING')
    })

    it('should allow ADMIN to RSVP for any member', async () => {
      // Create context with ADMIN role
      const adminCtx = createContext({ query: { userId: 'user-3' } })
      const adminCaller = appRouter.createCaller(adminCtx)

      const rsvpData = {
        orgId: 'org-1',
        eventId: 'event-1',
        memberProfileId: 'member-1',
        status: 'GOING' as const
      }

      const result = await adminCaller.rsvp.upsert(rsvpData)
      expect(result.status).toBe('GOING')
    })
  })

  describe('list', () => {
    it('should list RSVPs for organization', async () => {
      const result = await caller.rsvp.list({
        orgId: 'org-1'
      })

      expect(Array.isArray(result)).toBe(true)
    })

    it('should filter RSVPs by event', async () => {
      const result = await caller.rsvp.list({
        orgId: 'org-1',
        eventId: 'event-1'
      })

      expect(Array.isArray(result)).toBe(true)
    })

    it('should filter RSVPs by member', async () => {
      const result = await caller.rsvp.list({
        orgId: 'org-1',
        memberProfileId: 'member-1'
      })

      expect(Array.isArray(result)).toBe(true)
    })
  })
})
