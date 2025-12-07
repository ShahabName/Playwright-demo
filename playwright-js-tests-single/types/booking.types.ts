/**
 * Type definitions for booking-related data structures.
 * 
 * This file contains interfaces and types used across multiple test files
 * for consistent data modeling in the RESTful Booker API tests.
 * 
 * Following Playwright best practices, type definitions are organized
 * in a dedicated 'types' directory for better project structure.
 */

/** Request model for creating a booking */
export interface BookingRequest {
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

/** Response model for booking creation */
export interface BookingResponse {
  bookingid: number;
  booking: BookingData;
}

/** Booking data structure returned by API */
export interface BookingData {
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

/** Authentication request model */
export interface AuthRequest {
  username: string;
  password: string;
}

/** Authentication response model */
export interface AuthResponse {
  token: string;
}