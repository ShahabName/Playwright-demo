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

});
