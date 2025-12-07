/**
 * Data transformation utilities for Playwright API tests
 * 
 * This module provides functions to convert between different data formats
 * used in API testing, following Playwright best practices.
 */

import { BookingRequest } from '../types/booking.types';

/**
 * Converts a row object with string values into a `BookingRequest` object.
 *
 * @param row - A record containing booking information as strings.
 * @returns A `BookingRequest` object with properly typed fields.
 *
 * @remarks
 * - Converts `totalprice` to a number.
 * - Converts `depositpaid` to a boolean based on its string value.
 * - Sets `additionalneeds` to `undefined` if not provided.
 */
export function toBookingRequest(row: Record<string, string>): BookingRequest {
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