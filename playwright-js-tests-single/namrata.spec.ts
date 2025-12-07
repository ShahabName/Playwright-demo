import { test, expect } from '@playwright/test';
 
test.describe('TodoMVC', () => {
  test('TC 1: Add 3 to-do-list, add assertion for each to-do', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('learn playwright 2');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('learn playwright 3');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Learn Playwright');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.waitForTimeout(5000);
  await expect(page.locator('body')).toContainText('Learn Playwright');
  await expect(page.locator('body')).toContainText('learn playwright 2');
  await expect(page.locator('body')).toContainText('learn playwright 3');
  await page.waitForTimeout(5000);
});
 
test('TC 2: Edit one of the  to-do-list and change it,', async ({ page }) => {
 
await page.goto('https://demo.playwright.dev/todomvc/#/');
await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('learn playwright1');
await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('learn playwright2');
await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('learn playwright3');
await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
await page.getByText('learn playwright1').dblclick();
await page.getByRole('textbox', { name: 'Edit' }).fill('learn playwright1 - changed');
await page.getByRole('textbox', { name: 'Edit' }).press('Enter');
await expect(page.locator('body')).toContainText('learn playwright1 - changed');
 
 
 
});
 
test('TC 3: Delete one to do list.', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('learn playwright 2');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('learn playwright 3');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Learn Playwright');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
 
  await page.waitForTimeout(2000);
  await page.getByText('learn playwright 2').click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.waitForTimeout(2000);
  await expect(page.locator('body')).not.toContainText('learn playwright 2');
});
});

 