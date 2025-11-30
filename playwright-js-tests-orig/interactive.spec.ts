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

test.describe('Interactive Webpage Tests', () => {
  test('TC 1: should display initial message', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/02 Interactive Webpage/interactive.html');
    await page.goto(`file://${filePath}`);

    // Get the message element
    const messageElement = page.locator('#message');

    // Check if the initial message is displayed
    await expect(messageElement).toHaveText('Click the button to change this message!');

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });

  test('TC 2: should change message and color after button click', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/02 Interactive Webpage/interactive.html');
    await page.goto(`file://${filePath}`);

    // Add delay to see initial state
    await page.waitForTimeout(2000);

    // Get the message and button elements
    const messageElement = page.locator('#message');
    const changeButton = page.locator('#changeButton');

    // Click the button
    await changeButton.click();

    // Add delay to see the click action
    await page.waitForTimeout(2000);

    // Check if the text changed to "You clicked the button!"
    await expect(messageElement).toHaveText('You clicked the button!');

    // Check if the font color is blue
    const color = await messageElement.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    
    // RGB value for blue is "rgb(0, 0, 255)"
    expect(color).toBe('rgb(0, 0, 255)');

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });
});
