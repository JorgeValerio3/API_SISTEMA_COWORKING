export interface CreateBookingDto {
    spaces_id: number;
    timeDate: string;
    timeFrom: string;
    until: string;
    numberPersons?: number;
}
export interface ExtendBookingDto {
    until: string;
}
import type { RowDataPacket } from "mysql2";
export interface BookingRow extends RowDataPacket {
    booking_id: number;
    user_id: number;
    spaces_id: number;
    spacesType_id: number;
    spacesType: string;
    membershipType_id: number;
    membershipType: string;
    capacity: number;
    priceHour: number;
    priceDay: number;
    location_id: number;
    location: string;
    statusbooking_id: number;
    statusbooking: string;
    dateAct: string;
    timeDate: string;
    timeFrom: string;
    until: string;
    numberPersons: number;
}
export interface BookingWithPay extends BookingRow {
    totalPay: number;
    statusPay_id: number;
}
export interface PricingResult {
    subtotal: number;
    discounts: {
        name: string;
        amount: number;
    }[];
    total: number;
}
export interface BookingResult {
    bookingId: number;
    pricing: PricingResult;
}
export interface CancelResult {
    refundPercent: number;
    totalRefund: number;
}
//# sourceMappingURL=booking.types.d.ts.map