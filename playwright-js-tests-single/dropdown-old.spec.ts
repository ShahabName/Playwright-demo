import { test, expect } from '@playwright/test';

test('select values from a custom React dropdown', async ({ page }) => {
  // Navigate to the page with custom dropdown
  await page.goto('https://nokacreative.github.io/generic-react-form-demo/#/overview');

  // Wait for page to load
  await page.waitForTimeout(2000);

  // Custom dropdown - click to open
  const countryDropdown = page.getByLabel('Country');
  await countryDropdown.click();
  
  // Add delay to see dropdown open
  await page.waitForTimeout(1000);

  // Select "United States" - using text content instead of role
  await page.locator('.dropdown-option').filter({ hasText: 'United States' }).click();
  
  // Verify selection
  await expect(countryDropdown).toHaveValue('United States');
  await page.waitForTimeout(2000);

  // Select "Canada" from the dropdown
  await countryDropdown.click();
  await page.waitForTimeout(1000);
  await page.locator('.dropdown-option').filter({ hasText: 'Canada' }).click();
  
  // Verify selection
  await expect(countryDropdown).toHaveValue('Canada');
  await page.waitForTimeout(2000);

  // Select another country
  await countryDropdown.click();
  await page.waitForTimeout(1000);
  await page.locator('.dropdown-option').filter({ hasText: 'United Kingdom' }).click();
  
  // Verify selection
  await expect(countryDropdown).toHaveValue('United Kingdom');
  await page.waitForTimeout(2000);
});
