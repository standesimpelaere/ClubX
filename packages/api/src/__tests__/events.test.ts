import { describe, it, expect, beforeEach } from 'vitest'
import { appRouter } from '../index'
import { createContext } from '../context'

describe('Events Router', () => {
  const ctx = createContext()
  const caller = appRouter.createCaller(ctx)

  beforeEach(async () => {
    // Reset database state if needed
  })

  describe('list', () => {
    it('should list events for organization', async () => {
      const result = await caller.events.list({
        orgId: 'org-1'
      })

      expect(Array.isArray(result)).toBe(true)
      // In a real test, you'd check specific event data
    })

    it('should filter events by team', async () => {
      const result = await caller.events.list({
        orgId: 'org-1',
        teamId: 'team-1'
      })

      expect(Array.isArray(result)).toBe(true)
    })

    it('should filter events by date range', async () => {
      const from = new Date('2024-01-01').toISOString()
      const to = new Date('2024-12-31').toISOString()

      const result = await caller.events.list({
        orgId: 'org-1',
        from,
        to
      })

      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('create', () => {
    it('should create event with valid data', async () => {
      const eventData = {
        orgId: 'org-1',
        teamId: 'team-1',
        title: 'Test Event',
        description: 'Test Description',
        location: 'Test Location',
        startsAt: new Date('2024-02-01T18:00:00Z').toISOString(),
        endsAt: new Date('2024-02-01T20:00:00Z').toISOString(),
        capacity: 10
      }

      const result = await caller.events.create(eventData)

      expect(result).toBeDefined()
      expect(result.title).toBe(eventData.title)
      expect(result.orgId).toBe(eventData.orgId)
    })

    it('should reject event with invalid date range', async () => {
      const eventData = {
        orgId: 'org-1',
        teamId: 'team-1',
        title: 'Test Event',
        description: 'Test Description',
        location: 'Test Location',
        startsAt: new Date('2024-02-01T20:00:00Z').toISOString(),
        endsAt: new Date('2024-02-01T18:00:00Z').toISOString(), // ends before starts
        capacity: 10
      }

      await expect(caller.events.create(eventData)).rejects.toThrow()
    })
  })

  describe('update', () => {
    it('should update existing event', async () => {
      // First create an event
      const eventData = {
        orgId: 'org-1',
        teamId: 'team-1',
        title: 'Test Event',
        description: 'Test Description',
        location: 'Test Location',
        startsAt: new Date('2024-02-01T18:00:00Z').toISOString(),
        endsAt: new Date('2024-02-01T20:00:00Z').toISOString(),
        capacity: 10
      }

      const created = await caller.events.create(eventData)

      // Then update it
      const updateData = {
        ...eventData,
        eventId: created.id,
        title: 'Updated Event Title'
      }

      const result = await caller.events.update(updateData)

      expect(result.title).toBe('Updated Event Title')
    })
  })
})
