const { 
    bookingData, 
    findBookingData, 
    deleteBooking,
    findAllBookings,
    createNewBooking
} = require("../../utils/booking");
const { findEventData } = require("../../utils/event");

module.exports = {
    bookings: async(args, req) => {
        try {
            if (!req.isUserAuthorized) throw new Error("User is unauthenticated!");

            const bookings = await findAllBookings();

            return bookings.map(booking => bookingData(booking));
        } catch(err) {
            console.log(err);
            throw err;
        };
    },
    createBooking: async ({ eventId, userId }, req) => {
        try {
            if (!req.isUserAuthorized) throw new Error("User is unauthenticated!");

            console.log("Booking with user:", userId);
            const booking = await createNewBooking(userId, eventId);

            console.log("booking created!")

            await booking.save();

            return bookingData(booking);

        } catch(err) {
            console.log(err);
            throw err;
        };
    },
    cancelBooking: async ({ bookingId }, req) => {
        try {
            if (!req.isUserAuthorized) throw new Error("User is unauthenticated!");
            
            const booking = await findBookingData(bookingId);
            const event = await findEventData(booking.event._id);

            await deleteBooking(bookingId);

            return { ...event };
        } catch(err) {
            console.log(err);
            throw err;
        };
    },
}