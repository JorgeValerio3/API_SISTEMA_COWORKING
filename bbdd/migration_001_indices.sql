-- =============================================================================
-- Migration: Performance Indices for Booking System
-- Date: 2026-02-16
-- Description: Adds indices to improve overlap checking and query performance
-- =============================================================================

USE SREC2;

-- Índice compuesto para acelerar verificación de solapamiento en reservas
-- Usado en: createBooking (WHERE spaces_id = ? AND timeDate = ? AND statusbooking_id IN ...)
CREATE INDEX idx_booking_overlap
ON Bookings(spaces_id, timeDate, statusbooking_id, timeFrom, until);

-- Índice para queries de reservas por usuario y estado
-- Usado en: getBookings, cancelBooking
CREATE INDEX idx_booking_user_status
ON Bookings(user_id, statusbooking_id);

-- Índice para lookups de pagos por booking_id
-- Usado en: cancelBooking (JOIN Pays), updatePayBooking
CREATE INDEX idx_pay_booking
ON Pays(booking_id);
