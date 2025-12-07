/**
 * Configuration constants for Playwright API tests
 * 
 * This file centralizes all configuration values used across test files
 * following Playwright best practices for maintainable test suites.
 */

export const CONFIG = {
  // Base URLs for different environments
  BASE_URL: 'http://localhost:3001',
  
  // File paths
  PATHS: {
    DATA_INPUT: 'data/input',
    DATA_OUTPUT: 'data/output'
  },
  
  // File naming patterns
  FILE_PATTERNS: {
    INPUT: 'EndToEndTest-{method}-Input-Step{step}.csv',
    OUTPUT: 'EndToEndTest-{method}-Output-Step{step}.csv'
  },
  
  // API endpoints
  ENDPOINTS: {
    AUTH: '/auth',
    BOOKING: '/booking'
  },
  
  // Default credentials
  AUTH: {
    USERNAME: 'admin',
    PASSWORD: 'password123'
  }
} as const;