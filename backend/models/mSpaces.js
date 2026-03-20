import db from "../config/db.js";
const mSpaces = {
    getSpaces: async () => {
        try {
            const [results] = await db.query(`SELECT 
                    s.spaces_id,
                    s.spacesType_id,
                    st.spacesType,
                    s.location_id,
                    l.location,
                    st.membershipType_id,
                    ms.membershipType,
                    st.capacity,
                    st.priceHour,
                    st.priceDay
                FROM Spaces s
                INNER JOIN SpacesTypes st ON s.spacesType_id = st.spacesType_id
                INNER JOIN Locations l ON s.location_id = l.location_id
                INNER JOIN MembershipTypes ms ON st.membershipType_id = ms.membershipType_id
            `);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    getSpace: async (id) => {
        try {
            const [results] = await db.query(`SELECT 
                    s.spaces_id,
                    s.spacesType_id,
                    st.spacesType,
                    s.location_id,
                    l.location,
                    st.membershipType_id,
                    ms.membershipType,
                    st.capacity,
                    st.priceHour,
                    st.priceDay
                FROM Spaces s
                INNER JOIN SpacesTypes st ON s.spacesType_id = st.spacesType_id
                INNER JOIN Locations l ON s.location_id = l.location_id
                INNER JOIN MembershipTypes ms ON st.membershipType_id = ms.membershipType_id
                WHERE s.spaces_id = ?
            `, [id]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    getSpacesperType: async (id) => {
        try {
            const [results] = await db.query(`SELECT 
                    s.spaces_id,
                    s.spacesType_id,
                    st.spacesType,
                    s.location_id,
                    l.location,
                    st.membershipType_id,
                    ms.membershipType,
                    st.capacity,
                    st.priceHour,
                    st.priceDay
                FROM Spaces s
                INNER JOIN SpacesTypes st ON s.spacesType_id = st.spacesType_id
                INNER JOIN Locations l ON s.location_id = l.location_id
                INNER JOIN MembershipTypes ms ON st.membershipType_id = ms.membershipType_id
                WHERE s.spacesType_id = ?
            `, [id]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    getSpacesCapacity: async (capacity) => {
        try {
            const [results] = await db.query(`SELECT 
                    s.spaces_id,
                    s.spacesType_id,
                    st.spacesType,
                    s.location_id,
                    l.location,
                    st.membershipType_id,
                    ms.membershipType,
                    st.capacity,
                    st.priceHour,
                    st.priceDay
                FROM Spaces s
                INNER JOIN SpacesTypes st ON s.spacesType_id = st.spacesType_id
                INNER JOIN Locations l ON s.location_id = l.location_id
                INNER JOIN MembershipTypes ms ON st.membershipType_id = ms.membershipType_id
                WHERE st.capacity >= ?
            `, [capacity]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    getSpacesperLocation: async (id) => {
        try {
            const [results] = await db.query(`SELECT 
                    s.spaces_id,
                    s.spacesType_id,
                    st.spacesType,
                    s.location_id,
                    l.location,
                    st.membershipType_id,
                    ms.membershipType,
                    st.capacity,
                    st.priceHour,
                    st.priceDay
                FROM Spaces s
                INNER JOIN SpacesTypes st ON s.spacesType_id = st.spacesType_id
                INNER JOIN Locations l ON s.location_id = l.location_id
                INNER JOIN MembershipTypes ms ON st.membershipType_id = ms.membershipType_id
                WHERE s.location_id = ?
            `, [id]);
            return results;
        }
        catch (err) {
            throw err;
        }
    },
    getSpaceAvailable: async (data) => {
        const { timeDate, timeFrom, until } = data;
        try {
            const [results] = await db.query(`SELECT 
                    s.spaces_id,
                    s.spacesType_id,
                    st.spacesType,
                    s.location_id,
                    l.location,
                    st.membershipType_id,
                    ms.membershipType,
                    st.capacity,
                    st.priceHour,
                    st.priceDay
                FROM Spaces s
                INNER JOIN SpacesTypes st ON s.spacesType_id = st.spacesType_id
                INNER JOIN Locations l ON s.location_id = l.location_id
                INNER JOIN MembershipTypes ms ON st.membershipType_id = ms.membershipType_id
                WHERE s.spaces_id NOT IN (
                  SELECT b.spaces_id
                  FROM Bookings b
                  INNER JOIN StatusBookings sb ON b.statusbooking_id = sb.statusbooking_id
                  WHERE 
                    b.timeDate = ?
                    AND sb.statusbooking IN ('pending', 'confirm')
                    AND NOT (b.until <= ? OR b.timeFrom >= ?)
                )
                ORDER BY st.spacesType, l.location;
              `, [timeDate, timeFrom, until]);
            return results;
        }
        catch (err) {
            throw err;
        }
    }
};
export default mSpaces;
//# sourceMappingURL=mSpaces.js.map