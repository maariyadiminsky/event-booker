const { 
    bookingData, 
    findBookingData, 
    deleteBooking,
    findAllBookings,
    createNewBooking,
    isValidBookingUser
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
    createBooking: async ({ eventId }, req) => {
        try {
            if (!req.isUserAuthorized) throw new Error("User is unauthenticated!");
            
            const booking = await createNewBooking(req.userId, eventId);

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

            // make sure booking really exists
            if (!booking || booking && !booking.user || booking && booking.user && !booking.user._id) throw new Error("Booking with that id does not exist!");

            // make sure person deleting booking is the same one who created it
            if(!isValidBookingUser(req.userId, booking.user._id.toString())) throw new Error("You can only delete your own bookings.");

            const event = await findEventData(booking.event._id);

            await deleteBooking(bookingId);

            return { ...event };
        } catch(err) {
            console.log(err);
            throw err;
        };
    },
}