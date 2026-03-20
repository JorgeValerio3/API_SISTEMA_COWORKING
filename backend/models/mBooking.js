import db from "../config/db.js";
const baseSelectBookings = `SELECT 
    b.booking_id,
    b.user_id,
    b.spaces_id,
    s.spacesType_id,
    st.spacesType,
    st.membershipType_id,
    ms.membershipType,
    st.capacity,
    st.priceHour,
    st.priceDay,
    s.location_id,
    l.location,
    b.statusbooking_id,
    sb.statusbooking,
    b.dateAct,
    b.timeDate,
    b.timeFrom,
    b.until
FROM Bookings b
INNER JOIN Spaces s ON b.spaces_id = s.spaces_id
INNER JOIN StatusBookings sb ON b.statusbooking_id = sb.statusbooking_id
INNER JOIN SpacesTypes st ON s.spacesType_id = st.spacesType_id
INNER JOIN Locations l ON s.location_id = l.location_id
INNER JOIN MembershipTypes ms ON st.membershipType_id = ms.membershipType_id`;
const mBooking = {
    createBooking: async (data) => {
        try {
            const { user_id, spaces_id, timeDate, timeFrom, until } = data;
            const [results] = await db.query(`
                INSERT INTO Bookings (
                    user_id, dateAct, spaces_id, statusbooking_id, timeDate, timeFrom, until
                )
                SELECT ?, NOW(), ?, 2, ?, ?, ?
                FROM Users u
                INNER JOIN Spaces s ON s.spaces_id = ?
                INNER JOIN SpacesTypes st ON s.spacesType_id = st.spacesType_id
                WHERE 
                    u.user_id = ?
                    AND u.membershipType_id >= st.membershipType_id
                    AND NOT EXISTS (
                        SELECT 1
                        FROM Bookings b
                        WHERE b.user_id = u.user_id
                          AND b.timeDate = ?
                          AND (
                              (b.timeFrom < ? AND b.until > ?)
                          )
                    );                
            `, [user_id, spaces_id, timeDate, timeFrom, until, spaces_id, user_id, timeDate, until, timeFrom]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    getBookings: async (user_id) => {
        try {
            const [results] = await db.query(`${baseSelectBookings} WHERE b.user_id = ?
            `, [user_id]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    getBooking: async (user_id, id) => {
        try {
            const [results] = await db.query(`${baseSelectBookings} WHERE b.user_id = ? AND b.booking_id = ?`, [user_id, id]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    cancelBooking: async (user_id, id) => {
        try {
            const [results] = await db.query("UPDATE Bookings SET statusbooking_id = 3 WHERE user_id = ? AND booking_id = ? AND statusbooking_id = 2", [user_id, id]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    extendBooking: async (data) => {
        const { user_id, booking_id, until } = data;
        try {
            const [results] = await db.query("UPDATE Bookings SET until = ? WHERE user_id = ? AND booking_id = ?", [until, user_id, booking_id]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    refund: async (data) => {
        try {
            const { refundPercent, booking_id, totalRefund } = data;
            const [results] = await db.query("INSERT INTO Refunds (dateAct, refundPercent, booking_id, totalRefund) VALUES (NOW(), ?, ?, ?)", [refundPercent, booking_id, totalRefund]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    refundPay: async (booking_id) => {
        try {
            const [results] = await db.query("UPDATE Pays SET statusPay_id = 2 WHERE booking_id = ?", [booking_id]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    payBooking: async (data) => {
        try {
            const { booking_id, totalPay } = data;
            const [results] = await db.query("INSERT INTO Pays (booking_id, statusPay_id, totalPay) VALUES (?, 1, ?)", [booking_id, totalPay]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    updatePayBooking: async (data) => {
        try {
            const { booking_id, totalPay } = data;
            const [results] = await db.query("UPDATE Pays SET totalPay = ? WHERE booking_id = ?", [totalPay, booking_id]);
            return results;
        }
        catch (err) {
            throw err;
        }
    }
};
export default mBooking;
//# sourceMappingURL=mBooking.js.map