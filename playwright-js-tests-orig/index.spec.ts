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

test.describe('JavaScript Basics - Index Page', () => {
  test('should display the correct message after JavaScript execution', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/01 Basic JS in Index File/index.html');
    await page.goto(`file://${filePath}`);

    // Get the message element
    const messageElement = page.locator('#message');

    // Check if the message contains either the initial or JavaScript-updated text
    const messageText = await messageElement.textContent();
    
    // Assert that the message should be the JavaScript-updated text (pass)
    if (messageText === "Hello, JavaScript is working!") {
      expect(messageText).toBe("Hello, JavaScript is working!");
    } 
    // If it's the initial text, fail the test
    else if (messageText === "We need to show a message through JS here") {
      expect(messageText).not.toBe("We need to show a message through JS here");
    }

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });

  test('should have the correct page title', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/01 Basic JS in Index File/index.html');
    await page.goto(`file://${filePath}`);

    // Check page title
    await expect(page).toHaveTitle('JavaScript Basics');

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });

  test('should display heading text', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/01 Basic JS in Index File/index.html');
    await page.goto(`file://${filePath}`);

    // Check heading
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Welcome to JavaScript Basics');

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });
});
