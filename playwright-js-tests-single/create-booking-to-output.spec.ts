/**
 * End-to-end Playwright API test for creating a booking and saving the response to an output CSV file.
 *
 * - Reads the first record from an input CSV file containing booking details.
 * - Sends a POST request to the `/booking` endpoint to create a new booking.
 * - Extracts the booking ID and booking details from the API response.
 * - Appends a new row to the output CSV file with the booking information and status.
 *
 * ## File Naming Conventions
 * - Input:  `EndToEndTest-<APIMethod>-Input-Step<Step>.csv`
 * - Output: `EndToEndTest-<APIMethod>-Output-Step<Step>.csv`
 *
 * ## CSV Columns
 * - BookingID
 * - Status
 * - FirstName
 * - LastName
 * - TotalPrice
 * - DepositPaid
 * - CheckIn
 * - CheckOut
 * - AdditionalNeeds
 *
 * ## Utilities
 * - `readCsvSimple`: Reads and parses CSV files into an array of objects.
 * - `toBookingRequest`: Converts a CSV row to a typed booking request object.
 * - `fileExists`: Checks for file existence.
 * - `ensureDir`: Ensures a directory exists, creating it if necessary.
 * - `appendCsvRow`: Appends a row to a CSV file, writing headers if the file is new.
 *
 * ## Test Lifecycle
 * - `beforeAll`: Initializes API context and ensures output directory exists.
 * - `afterAll`: Disposes API context.
 *
 * @fileoverview End-to-end test for CreateBooking API with CSV input/output integration.
 */
import { test, expect, request, APIRequestContext } from '@playwright/test';
import * as path from 'path';
import { BookingRequest } from './types/booking.types';
import { CONFIG } from './config';
import { readCsvSimple, ensureDir, appendCsvRow } from './utils/csvUtils';
import { toBookingRequest } from './utils/dataTransform';

// Following Playwright best practices: centralized configuration
const BASE_URL = CONFIG.BASE_URL;

// File paths using configuration constants
const INPUT_CSV = path.join(CONFIG.PATHS.DATA_INPUT, 'EndToEndTest-CreateBooking-Input-Step2.csv');
const OUTPUT_CSV = path.join(CONFIG.PATHS.DATA_OUTPUT, 'EndToEndTest-CreateBooking-Output-Step2.csv');

let api: APIRequestContext;

test.beforeAll(async () => {
  api = await request.newContext({ baseURL: BASE_URL });
  // Ensure output directory exists (won't recreate if already present)
  await ensureDir(path.dirname(OUTPUT_CSV));
});

test.afterAll(async () => {
  await api.dispose();
});

/**
 * Read first record from input CSV → CreateBooking → Save response to OUTPUT CSV
 * Columns: BookingID, Status, FirstName, LastName, TotalPrice, DepositPaid, CheckIn, CheckOut, AdditionalNeeds
 */
test('EndToEndTest: CreateBooking (Step 7) — save response to Output CSV with Status "Booked"', async () => {
  console.log(`Reading input from: ${INPUT_CSV}`);

  // 1) Input: first record from CSV
  const rows = await readCsvSimple(INPUT_CSV);
  expect(rows.length).toBeGreaterThan(0);
  const first = rows[0];
  const payload = toBookingRequest(first);

  // 2) Call CreateBooking
  const response = await api.post(CONFIG.ENDPOINTS.BOOKING, {
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });
  expect(response.ok()).toBeTruthy();

  // 3) Extract response and shape for CSV
  const body = await response.json();
  expect(body).toHaveProperty('bookingid');
  expect(body).toHaveProperty('booking');

  const bookingId: number = body.bookingid;
  const booking = body.booking;

  // 4) Build flat CSV row
  const headers = [
    'BookingID', 'Status',
    'FirstName', 'LastName', 'TotalPrice', 'DepositPaid',
    'CheckIn', 'CheckOut', 'AdditionalNeeds'
  ];

  const values = [
    bookingId, 'Booked',
    booking.firstname, booking.lastname, booking.totalprice, booking.depositpaid,
    booking.bookingdates?.checkin, booking.bookingdates?.checkout, booking.additionalneeds
  ];

  // 5) Append to output CSV (header only if file is new)
  await appendCsvRow(OUTPUT_CSV, headers, values);

  console.log('=== OUTPUT FILE UPDATED ===');
  console.log(`Saved: ${OUTPUT_CSV}`);
  console.log(`Row → BookingID=${bookingId}, Status=Booked`);
});
