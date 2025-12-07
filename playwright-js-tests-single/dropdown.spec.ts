import { test, expect } from '@playwright/test';

test('select values from Country dropdown', async ({ page }) => {
  // Navigate to the forms page
  await page.goto('https://shahabname.github.io/ShahabMotivationWorld/forms.html');

  // Wait for page to load
  await page.waitForTimeout(2000);

  // Locate the Country dropdown
  const countryDropdown = page.locator('#country');
  


  // Select "Canada"
  await countryDropdown.selectOption('Canada');
  
  // Verify selection
  await expect(countryDropdown).toHaveValue('???');
  await page.waitForTimeout(2000);

    // Select "United States"
  await countryDropdown.selectOption('????'); // check for india
  
  // Verify selection
  await expect(countryDropdown).toHaveValue('??');
  await page.waitForTimeout(2000);
});
