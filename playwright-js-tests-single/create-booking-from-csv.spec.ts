import { test, expect, request, APIRequestContext } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const BASE_URL = 'http://localhost:3001'; // Hardcoded per instructions

/** Booking model (request shape) — kept inline for simplicity in this step */
interface BookingRequest {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
}

/** CSV path — relative to project root */
const INPUT_CSV = path.join('data', 'input', 'EndToEndTest-CreateBooking-Input-Step2.csv');

let api: APIRequestContext;

/** Minimal CSV reader (no external library): assumes no commas inside values */
async function readCsvSimple(csvPath: string): Promise<Record<string, string>[]> {
  const raw = fs.readFileSync(csvPath, 'utf-8');
  const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
  const header = lines[0].split(',').map(h => h.trim());

  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(',').map(c => c.trim());
    const row: Record<string, string> = {};
    header.forEach((h, idx) => (row[h] = cells[idx]));
    rows.push(row);
  }
  return rows;
}

/** Map CSV row → BookingRequest (adds typing and conversion) */
function toBookingRequest(row: Record<string, string>): BookingRequest {
  return {
    firstname: row.firstname,
    lastname: row.lastname,
    totalprice: Number(row.totalprice),
    depositpaid: row.depositpaid?.toLowerCase() === 'true',
    bookingdates: {
      checkin: row.checkin,
      checkout: row.checkout,
    },
    additionalneeds: row.additionalneeds || undefined,
  };
}

test.beforeAll(async () => {
  api = await request.newContext({ baseURL: BASE_URL });
});

test.afterAll(async () => {
  await api.dispose();
});

test('CreateBooking using first record from CSV', async () => {
  // 1) Read CSV
  const rows = await readCsvSimple(INPUT_CSV);
  expect(rows.length).toBeGreaterThan(0);

  // 2) Use the first record for now (later we’ll iterate/rotate)
  const first = rows[0];
  const payload = toBookingRequest(first);

  // 3) Call CreateBooking
  const response = await api.post('/booking', {
    headers: { 'Content-Type': 'application/json' },
    data: payload,
  });

  expect(response.ok()).toBeTruthy();

  // 4) Validate a few fields
  const body = await response.json();
  expect(body).toHaveProperty('bookingid');
  expect(body).toHaveProperty('booking');

  const { bookingid, booking } = body;
  console.log('Created bookingId:', bookingid);

  // Basic checks to validate mapping worked
  expect(booking.firstname).toBe(payload.firstname);
  expect(booking.lastname).toBe(payload.lastname);
  expect(booking.bookingdates.checkin).toBe(payload.bookingdates.checkin);
  expect(booking.bookingdates.checkout).toBe(payload.bookingdates.checkout);
});
