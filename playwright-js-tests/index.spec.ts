import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('JavaScript Basics - Index Page', () => {
    test('TC1 : should have the correct page title', async ({ page }) => {
        // Navigate to the local HTML file
        const filePath = path.join(__dirname, '../js-example/01 Basic JS in Index File/index.html');
        await page.goto(`file://${filePath}`);
        
        // Check page title using Assertion
        await expect(page).toHaveTitle('JavaScript Basics');

        // Add delay to see browser execution
        await page.waitForTimeout(5000);
    });

    test('TC 2: should display heading text', async ({ page }) => {
        // Navigate to the local HTML file
        const filePath = path.join(__dirname, '../js-example/01 Basic JS in Index File/index.html');
        await page.goto(`file://${filePath}`);
        
        // Check heading
        const heading = page.locator('h1');
        await expect(heading).toHaveText('Welcome to JavaScript Basics');

        // Add delay to see browser execution
        await page.waitForTimeout(5000);
    });

    test('TC 3: should display the correct message after JavaScript execution', async ({ page }) => {
        // Navigate to the local HTML file
        const filePath = path.join(__dirname, '../js-example/01 Basic JS in Index File/index.html');
        await page.goto(`file://${filePath}`);
        
        // Get the message element by using CSS locator
        const messageElement = page.locator('#message');

        // Check if the message contains either the initial or JavaScript-updated text
        const messageText = await messageElement.textContent();

        // Assert that the message should be the JavaScript-updated text (pass)
        expect(messageText).toBe("Hello, JavaScript is working!"); 

        // Add delay to see browser execution
        await page.waitForTimeout(5000);
    });

}); 