import { test, expect } from '@playwright/test';

test('TC1: Go to the website and enter Learn Playwright', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Learn Playwright');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.getByTestId('todo-title')).toContainText('Learn Playwright');
});

test('TC1: Go to the website and enter Learn Playwright Extensions', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('LEarn Playwright Extensions');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.getByTestId('todo-title')).toContainText('LEarn Playwright Extensions');
});

test('TC3: Go to the website and edit a to-do-list Learn Playwright Extensions', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByText('LEarn Playwright Extensions').click();
  await page.getByRole('textbox', { name: 'Edit' }).fill('Learn Playwright Extensions');
  await page.getByRole('textbox', { name: 'Edit' }).press('Enter');
  await expect(page.getByTestId('todo-title')).toContainText('Learn Playwright Extensions');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('my todo 2');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('my todo 2');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
      // Add delay to see the action
    await page.waitForTimeout(2000);
  await page.getByText('my todo 2').click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByTestId('todo-title')).not.toContainText('my todo 2');
  await page.getByRole('heading', { name: 'todos' }).click();
  
});

test('TC4: Add three todo items and delete List2', async ({ page }) => {
  // Navigate to the page
  await page.goto('/todomvc/#/');
  
  // Add List1
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('List1');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  // Add List2
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('List2');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  // Add List3
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('List3');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  // Verify all three items are added
  await expect(page.getByText('List1')).toBeVisible();
  await expect(page.getByText('List2')).toBeVisible();
  await expect(page.getByText('List3')).toBeVisible();
  
  // Add delay to see the items
  await page.waitForTimeout(2000);
  
  // Hover over List 2 to reveal delete button and click it
  await page.getByText('List2').hover();
  await page.getByText('List2').locator('..').getByRole('button', { name: 'Delete' }).click();
  
  // Add delay to see the deletion
  await page.waitForTimeout(2000);
  
  // Assert List 2 was deleted
  await expect(page.getByText('List2')).not.toBeVisible();
  
  // Verify List1 and List3 still exist
  await expect(page.getByText('List1')).toBeVisible();
  await expect(page.getByText('List3')).toBeVisible();
});
















test('TC5: Add three todo items and delete List2 using nth index', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  
  // Add List1
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('List1');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  // Add List2
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('List2');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  // Add List3
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('List3');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  // Verify all three items are added
  await expect(page.getByText('List1')).toBeVisible();
  await expect(page.getByText('List2')).toBeVisible();
  await expect(page.getByText('List3')).toBeVisible();
  
  // Add delay to see the items
  await page.waitForTimeout(2000);
  
  // Find all delete buttons and get the second one (index 1) for List2
  const deleteButtons = page.getByRole('button', { name: 'Delete' });
  
  // Hover over the second todo item to reveal delete button
  await page.getByTestId('todo-item').nth(1).hover();
  await page.waitForTimeout(1000);
  
  // Click the second delete button (index 1) for List2
  await deleteButtons.nth(1).click();
  
  // Add delay to see the deletion
  await page.waitForTimeout(2000);
  
  // Assert List2 was deleted
  await expect(page.getByText('List2')).not.toBeVisible();
  
  // Verify List1 and List3 still exist
  await expect(page.getByText('List1')).toBeVisible();
  await expect(page.getByText('List3')).toBeVisible();
});