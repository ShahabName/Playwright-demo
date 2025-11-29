// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // ------------------------------
  // Test Directories & Timeouts
  // ------------------------------
  testDir: './tests',                       // Directory for test files
  testMatch: '**/*.spec.ts',                // Pattern to match test files
  outputDir: './test-results',              // Path for artifacts (screenshots, traces)
  snapshotDir: './__snapshots__',           // Path for screenshot snapshots
  globalTimeout: 60 * 60 * 1000,            // Max total time for all tests (1 hour)
  timeout: 30 * 1000,                       // Max time for each test (30 seconds)
  expect: {
    timeout: 5000,                          // Timeout for expect() assertions
  },

  // ------------------------------
  // Parallelism & Retries
  // ------------------------------
  fullyParallel: true,                      // Run all tests in parallel
  forbidOnly: !!process.env.CI,             // Fail CI if test.only is left
  retries: process.env.CI ? 2 : 0,          // Retry on failure in CI
  workers: process.env.CI ? 2 : undefined,  // Number of parallel workers

  // ------------------------------
  // Reporter Configurations
  // ------------------------------
  reporter: [
    ['list'],                               // Default list reporter
    ['dot'],                                // Minimal dot reporter
    ['junit', { outputFile: 'results.xml' }],// JUnit XML for CI tools
    ['json', { outputFile: 'results.json' }],// JSON results
    ['html', { open: 'never' }],             // HTML report
  ],

  // ------------------------------
  // Shared Context / Browser Settings
  // ------------------------------
  use: {
    browserName: 'chromium',                 // Default browser (chromium, firefox, webkit)
    headless: true,                          // Headless or headed mode
    channel: 'chrome',                       // Browser channel (chrome, msedge, etc.)
    baseURL: 'https://playwright.dev',       // Base URL for tests
    viewport: { width: 1280, height: 720 },  // Browser viewport size
    ignoreHTTPSErrors: true,                 // Ignore HTTPS errors
    video: 'retain-on-failure',              // Video recording: off, on, retain-on-failure
    screenshot: 'only-on-failure',           // Screenshot on: off, on, only-on-failure
    trace: 'on-first-retry',                 // Trace recording: off, on, retain-on-failure
    actionTimeout: 0,                        // Timeout per action (ms)
    navigationTimeout: 30 * 1000,            // Timeout per navigation (ms)
    storageState: './auth.json',             // Reuse login state
    locale: 'en-US',                         // Browser locale
    geolocation: { latitude: 37.7749, longitude: -122.4194 }, // Fake geolocation
    permissions: ['geolocation'],            // Permissions granted to context
    colorScheme: 'light',                    // Color scheme: light/dark
    timezoneId: 'America/Los_Angeles',       // Time zone emulation
    launchOptions: {                         // Browser launch options
      slowMo: 50,                            // Slow down actions (ms)
      args: ['--start-maximized'],           // Extra args
    },
    httpCredentials: {                       // Basic HTTP authentication
      username: 'admin',
      password: 'password',
    },
    extraHTTPHeaders: {                      // Custom headers
      'x-api-key': '12345'
    },
    deviceScaleFactor: 1,                    // Device scale factor
    hasTouch: false,                         // Emulate touch screen
    isMobile: false,                         // Emulate mobile device
    offline: false,                          // Emulate offline mode
    userAgent: 'Custom UA String',           // Custom User-Agent
    contextOptions: {                        // Extra context-level options
      reducedMotion: 'reduce',               // Reduce motion setting
    },
  },

  // ------------------------------
  // Projects: Cross-browser & Devices
  // ------------------------------
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] }, // Predefined device config
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],

  // ------------------------------
  // Web Server for Local Testing
  // ------------------------------
  webServer: {
    command: 'npm run start',                // Command to start app
    url: 'http://localhost:3000',            // App URL
    reuseExistingServer: !process.env.CI,    // Reuse server if already running
    timeout: 120 * 1000,                     // Server startup timeout
  },
});
