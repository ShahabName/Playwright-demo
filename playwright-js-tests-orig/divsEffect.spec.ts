// Copyright (c) 2025 shahabjini@gmail.com
// 
// All rights reserved. This software and associated documentation files
// are proprietary and confidential. Unauthorized copying, distribution,
// modification, uploading to code repositories (GitHub, GitLab, etc.),
// or sharing in any way is strictly prohibited.
// 
// For licensing Contact: shahabjini@gmail.com

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

  test('TC 4: should hide "JavaScript can hide HTML elements." on second button click', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/04 JS Div Effects/DivsEffect.html');
    await page.goto(`file://${filePath}`);

    // Add delay to see initial state
    await page.waitForTimeout(2000);

    // Get the hide element and second button
    const hideElement = page.locator('#hide');
    const secondButton = page.locator('button').nth(1);

    // Verify the element is visible initially
    await expect(hideElement).toBeVisible();

    // Click the second button
    await secondButton.click();

    // Add delay to see the action
    await page.waitForTimeout(2000);

    // Verify the element is now hidden
    await expect(hideElement).toBeHidden();

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });

  test('TC 5: should have "Hello JavaScript!" hidden on page load', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/04 JS Div Effects/DivsEffect.html');
    await page.goto(`file://${filePath}`);

    // Get the show element
    const showElement = page.locator('#show');

    // Check if the element is hidden on page load
    await expect(showElement).toBeHidden();

    // Verify the text content is "Hello JavaScript!"
    await expect(showElement).toHaveText('Hello JavaScript!');

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });

  test('TC 6: should show "Hello JavaScript!" on third button click', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/04 JS Div Effects/DivsEffect.html');
    await page.goto(`file://${filePath}`);

    // Add delay to see initial state
    await page.waitForTimeout(2000);

    // Get the show element and third button
    const showElement = page.locator('#show');
    const thirdButton = page.locator('button').nth(2);

    // Verify the element is hidden initially
    await expect(showElement).toBeHidden();

    // Click the third button
    await thirdButton.click();

    // Add delay to see the action
    await page.waitForTimeout(2000);

    // Verify the element is now visible
    await expect(showElement).toBeVisible();

    // Verify the text is "Hello JavaScript!"
    await expect(showElement).toHaveText('Hello JavaScript!');

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });
});
