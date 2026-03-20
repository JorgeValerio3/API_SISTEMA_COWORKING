declare const mAdmin: {
    getBooking: (user_id: number, id: number) => Promise<import("mysql2").QueryResult>;
    getBookings: (user_id: number) => Promise<import("mysql2").QueryResult>;
    cancelBooking: (user_id: number, id: number) => Promise<import("mysql2").QueryResult>;
    extendBooking: (data: any) => Promise<import("mysql2").QueryResult>;
    refund: (data: any) => Promise<import("mysql2").QueryResult>;
    refundPay: (booking_id: any) => Promise<import("mysql2").QueryResult>;
    payBooking: (data: any) => Promise<import("mysql2").QueryResult>;
    updatePayBooking: (data: any) => Promise<import("mysql2").QueryResult>;
};
export default mAdmin;
//# sourceMappingURL=mAdmin.d.ts.map