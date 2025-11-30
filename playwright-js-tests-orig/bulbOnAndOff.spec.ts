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

test.describe('Bulb On/Off Interactive Tests', () => {
  test('TC 1: should display initial state of bulb as off', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/03 Interactive Bulb Example/BulbOnAndOff.html');
    await page.goto(`file://${filePath}`);

    // Get the image element
    const bulbImage = page.locator('#myImage');

    // Check if the initial bulb image is pic_bulboff.gif
    const srcAttribute = await bulbImage.getAttribute('src');
    expect(srcAttribute).toBe('pic_bulboff.gif');

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });

  test('TC 2: should not change bulb when "Turn off the light" clicked initially', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/03 Interactive Bulb Example/BulbOnAndOff.html');
    await page.goto(`file://${filePath}`);

    // Add delay to see initial state
    await page.waitForTimeout(2000);

    // Get the image and button elements
    const bulbImage = page.locator('#myImage');
    const turnOffButton = page.getByRole('button', { name: 'Turn off the light' });

    // Verify initial state is off
    let srcAttribute = await bulbImage.getAttribute('src');
    expect(srcAttribute).toBe('pic_bulboff.gif');

    // Click the "Turn off the light" button
    await turnOffButton.click();

    // Add delay to see the action
    await page.waitForTimeout(2000);

    // Verify the bulb is still off (no change should happen)
    srcAttribute = await bulbImage.getAttribute('src');
    expect(srcAttribute).toBe('pic_bulboff.gif');

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });

  test('TC 3: should turn on bulb when "Turn on the light" clicked', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/03 Interactive Bulb Example/BulbOnAndOff.html');
    await page.goto(`file://${filePath}`);

    // Add delay to see initial state
    await page.waitForTimeout(2000);

    // Get the image and button elements
    const bulbImage = page.locator('#myImage');
    const turnOnButton = page.getByRole('button', { name: 'Turn on the light' });

    // Verify initial state is off
    let srcAttribute = await bulbImage.getAttribute('src');
    expect(srcAttribute).toBe('pic_bulboff.gif');

    // Click the "Turn on the light" button
    await turnOnButton.click();

    // Add delay to see the action
    await page.waitForTimeout(2000);

    // Verify the bulb changed to pic_bulbon.gif
    srcAttribute = await bulbImage.getAttribute('src');
    expect(srcAttribute).toBe('pic_bulbon.gif');

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });

  test('TC 4: should turn off bulb when "Turn off the light" clicked after turning on', async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = path.join(__dirname, '../js-example/03 Interactive Bulb Example/BulbOnAndOff.html');
    await page.goto(`file://${filePath}`);

    // Add delay to see initial state
    await page.waitForTimeout(2000);

    // Get the image and button elements
    const bulbImage = page.locator('#myImage');
    const turnOnButton = page.getByRole('button', { name: 'Turn on the light' });
    const turnOffButton = page.getByRole('button', { name: 'Turn off the light' });

    // First, turn on the light
    await turnOnButton.click();

    // Add delay to see the turn on action
    await page.waitForTimeout(2000);

    // Verify the bulb is on
    let srcAttribute = await bulbImage.getAttribute('src');
    expect(srcAttribute).toBe('pic_bulbon.gif');

    // Now click "Turn off the light" button
    await turnOffButton.click();

    // Add delay to see the turn off action
    await page.waitForTimeout(2000);

    // Verify the bulb changed back to pic_bulboff.gif
    srcAttribute = await bulbImage.getAttribute('src');
    expect(srcAttribute).toBe('pic_bulboff.gif');

    // Add delay to see browser execution
    await page.waitForTimeout(3000);
  });
});
