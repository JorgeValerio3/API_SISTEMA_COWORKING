import type { BookingRow } from "../types/booking.types.js";
import type { ResultSetHeader } from "mysql2";
declare const mBooking: {
    createBooking: (data: any) => Promise<ResultSetHeader>;
    getBookings: (user_id: number) => Promise<BookingRow[]>;
    getBooking: (user_id: number, id: number) => Promise<BookingRow[]>;
    cancelBooking: (user_id: number, id: number) => Promise<ResultSetHeader>;
    extendBooking: (data: {
        user_id: number;
        booking_id: number;
        until: string;
    }) => Promise<ResultSetHeader>;
    refund: (data: {
        refundPercent: number;
        booking_id: number;
        totalRefund: number;
    }) => Promise<ResultSetHeader>;
    refundPay: (booking_id: number) => Promise<ResultSetHeader>;
    payBooking: (data: {
        booking_id: number;
        totalPay: number;
    }) => Promise<ResultSetHeader>;
    updatePayBooking: (data: {
        booking_id: number;
        totalPay: number;
    }) => Promise<ResultSetHeader>;
};
export default mBooking;
//# sourceMappingURL=mBooking.d.ts.map