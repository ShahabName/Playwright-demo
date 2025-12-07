import { test, expect } from '@playwright/test';

test('check and uncheck a todo item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  // Add a new task
  await page.getByPlaceholder('What needs to be done?')
            .fill('Learn Playwright');
  await page.keyboard.press('Enter');

  // Grab the first item’s checkbox
  const todoCheckbox = page.locator('.todo-list li').first().getByRole('checkbox');

  // Check it
  await todoCheckbox.check();
  await expect(todoCheckbox).toBeChecked();
    // Add delay to see the items
  await page.waitForTimeout(2000);

  // Uncheck it
  await todoCheckbox.uncheck();
  await expect(todoCheckbox).not.toBeChecked();
    // Add delay to see the items
  await page.waitForTimeout(2000);

  // Force state
  await todoCheckbox.setChecked(true);
  await expect(todoCheckbox).toBeChecked();
    // Add delay to see the items
  await page.waitForTimeout(2000);
});
