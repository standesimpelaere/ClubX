import { test, expect } from '@playwright/test';

test.describe('RSVP Flow', () => {
  test('member can RSVP to event and status persists after reload', async ({ page }) => {
    // Navigate to events page
    await page.goto('http://localhost:3002/my-clubs/events');
    
    // Wait for events to load
    await expect(page.locator('h1')).toContainText('My Club Events');
    
    // Click on first event to view details
    await page.click('text=View Details →');
    
    // Wait for event detail page to load
    await expect(page.locator('h1')).toContainText('Training Session');
    
    // Check initial RSVP status (should be "Going" based on mock data)
    await expect(page.locator('text=Your current status: Going')).toBeVisible();
    
    // Change RSVP to "Maybe"
    await page.click('button:has-text("Maybe")');
    
    // Wait for status to update
    await expect(page.locator('text=Your current status: Maybe')).toBeVisible();
    
    // Reload the page
    await page.reload();
    
    // Verify status persists
    await expect(page.locator('text=Your current status: Maybe')).toBeVisible();
    
    // Change to "Not Going"
    await page.click('button:has-text("Not Going")');
    
    // Wait for status to update
    await expect(page.locator('text=Your current status: Not going')).toBeVisible();
    
    // Reload again to verify persistence
    await page.reload();
    
    // Verify final status persists
    await expect(page.locator('text=Your current status: Not going')).toBeVisible();
  });

  test('RSVP buttons are disabled for past events', async ({ page }) => {
    // Navigate to a past event (this would need to be set up in test data)
    await page.goto('http://localhost:3002/events/past-event');
    
    // Check that RSVP section shows event has passed
    await expect(page.locator('text=This event has already passed')).toBeVisible();
    
    // Verify RSVP buttons are not visible or disabled
    await expect(page.locator('button:has-text("Going")')).not.toBeVisible();
  });

  test('capacity limits are enforced', async ({ page }) => {
    // Navigate to a full event
    await page.goto('http://localhost:3002/events/full-event');
    
    // Check that capacity warning is shown
    await expect(page.locator('text=This event is at capacity')).toBeVisible();
    
    // Verify only "Going" button is enabled if user is already confirmed
    // Other buttons should be disabled
    await expect(page.locator('button:has-text("Maybe")')).toBeDisabled();
    await expect(page.locator('button:has-text("Not Going")')).toBeDisabled();
  });
});
