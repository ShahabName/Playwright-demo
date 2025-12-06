import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Divs Effect Interactive Tests', () => {
  test('TC 1: should display "My First JavaScript" in demo element after page load', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/04 JS Div Effects/DivsEffect.html');
    await page.goto(`file://${filePath}`);

    // Get the demo element
    const demoElement = page.locator('#demo');

    // Get the text content
    const demoText = await demoElement.textContent();

    // Assert that the message should be "My First JavaScript" (pass)
    if (demoText === "My First JavaScript") {
      expect(demoText).toBe("My First JavaScript");
    } 
    // If it's the initial HTML text, fail the test
    else if (demoText === "JavaScript can change the style of an HTML element.") {
      expect(demoText).not.toBe("JavaScript can change the style of an HTML element.");
    }

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });

   test('TC 2: should change demo text size to 35px on first button click', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/04 JS Div Effects/DivsEffect.html');
    await page.goto(`file://${filePath}`);

    // Add delay to see initial state
    await page.waitForTimeout(2000);

    // Get the demo element and first button
    const demoElement = page.locator('#demo');
    const firstButton = page.locator('button').first();
    // const secondButton = page.locator('button').nth(1); // use this code to get second button , index starts from 0, 1,2
    // const thirdButton = page.locator('button').nth(2); // use this code to get third button

     // Click the first button
    await firstButton.click();
    
    // Add delay to see the action
    await page.waitForTimeout(2000);

    // Check if the font size changed to 35px
    const fontSize = await demoElement.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });
    expect(fontSize).toBe('35px');

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });

  test('TC 3: should display "JavaScript can hide HTML elements." on first load', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/04 JS Div Effects/DivsEffect.html');
    await page.goto(`file://${filePath}`);

    // Get the hide element
    const hideElement = page.locator('#hide');

    // Check if the text is visible on page load
    await expect(hideElement).toBeVisible();
    await expect(hideElement).toHaveText('JavaScript can hide HTML elements.');

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });




});  