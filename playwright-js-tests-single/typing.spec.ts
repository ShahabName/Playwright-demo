import { test, expect } from '@playwright/test';

test('type into the ToDoMVC input and validate', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  const input = page.getByPlaceholder('What needs to be done?'); // accessible locator

  // 1) Replace text and assert value
  await input.fill('Learn Playwright');
  await expect(input).toHaveValue('Learn Playwright'); // web-first assertion

  // 2) Submit using key press
  await input.press('Enter');
    await page.waitForTimeout(2000);

  // 3) Verify item was created (bonus: shows end-to-end flow)
  const firstItem = page.locator('.todo-list li').first();
  await expect(firstItem).toHaveText('Learn Playwright');

  // 4) Type again using keystrokes (when per-key handlers matter)
  await input.type('Write more tests', { delay: 100 });
  await expect(input).toHaveValue('Write more tests');
    await page.waitForTimeout(2000);
});