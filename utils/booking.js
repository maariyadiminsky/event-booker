const { findDate } = require("./date");
const { findUserData } = require("./user");
const { findEventData } = require("./event");

const Booking = require("../models/booking");

const bookingData = async(booking) => {
    try {
        return { 
            ...booking._doc,
            user: await findUserData(booking.user._id),
            event: await findEventData(booking.event._id),
            createdAt: findDate(booking.createdAt),
            updatedAt: findDate(booking.updatedAt),
        }
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const findBookingData = async(bookingId) => {
    try {
        const booking = await Booking.findById(bookingId);
        return bookingData(booking);
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const deleteBooking = async (bookingId) => {
    try {
        return await Booking.deleteOne({ _id: bookingId });
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const findAllBookings = () => Booking.find();

const createNewBooking = async(eventId) => {
    try {
        return new Booking({
            user: "612d43fa7858eae664785e47", // wip temp until I add auth
            event: await findEventData(eventId)
        })
    } catch(err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    bookingData,
    findBookingData,
    deleteBooking,
    findAllBookings,
    createNewBooking
};