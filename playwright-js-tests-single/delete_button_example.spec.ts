import { test, expect } from '@playwright/test';

test('TC1: Add three todo items and delete List2 by using delete array and nth item', async ({ page }) => {
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

test('TC2: Add three todo items and delete List2 using nth index', async ({ page }) => {
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
  
  // Debug: Check how many delete buttons are found
  const buttonCount = await deleteButtons.count();
  console.log(`Total delete buttons found: ${buttonCount}`);
  
  // Debug: Get all button texts to see what's available
  const allButtons = await deleteButtons.all();
  for (let i = 0; i < allButtons.length; i++) {
    const isVisible = await allButtons[i].isVisible();
    console.log(`Delete button ${i}: visible = ${isVisible}`);
  }
  
  // Hover over the second todo item to reveal delete button
  await page.getByTestId('todo-item').nth(1).hover();
  await page.waitForTimeout(1000);
  
  // Debug: Check button count again after hover
  const buttonCountAfterHover = await deleteButtons.count();
  console.log(`Delete buttons after hover: ${buttonCountAfterHover}`);
  
  // Debug: Check visibility of each button after hover
  const allButtonsAfterHover = await deleteButtons.all();
  for (let i = 0; i < allButtonsAfterHover.length; i++) {
    const isVisible = await allButtonsAfterHover[i].isVisible();
    console.log(`Delete button ${i} after hover: visible = ${isVisible}`);
  }
  
  // Click the second delete button (index 1) for List2
  console.log('Attempting to click delete button at index 1...');
  await deleteButtons.nth(1).click();

  // Add delay to see the deletion
  await page.waitForTimeout(2000);
  
  // Assert List2 was deleted
  await expect(page.getByText('List2')).not.toBeVisible();
  
  // Verify List1 and List3 still exist
  await expect(page.getByText('List1')).toBeVisible();
  await expect(page.getByText('List3')).toBeVisible();
});