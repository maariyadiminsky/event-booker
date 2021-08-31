const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");

const findUserData = async(userId) => {
    try {
        const user = await User.findById(userId);
        return { 
            ...user._doc,
            password: null,
        }
    } catch(err) {
        console.log(`ERROR: ${err}`);
        throw err;
    }
}

const findBookingData = async(bookingId) => {
    try {
        const booking = await Booking.findById(bookingId);
        return { 
            ...booking._doc,
            user: await findUserData(booking.user._id),
            event: await findEventData(booking.event._id),
            createdAt: new Date(booking.createdAt).toISOString(),
            updatedAt: new Date(booking.updatedAt).toISOString(),
        }
    } catch(err) {
        console.log(`ERROR: ${err}`);
        throw err;
    }
}

const deleteBooking = async (bookingId) => {
    try {
        return await Booking.deleteOne({ _id: bookingId });
    } catch(err) {
        console.log(`ERROR: ${err}`);
        throw err;
    }
}

const findEventData = async(eventId) => {
    try {
        const event = await Event.findById(eventId);
        return { 
            ...event._doc, 
            user: await findUserData(event.user._id)
        }
    } catch(err) {
        console.log(`ERROR: ${err}`);
        throw err;
    }
}

const findEventsData = async(eventIds) => {
    try {
        const events = await Event.find({ _id: { $in: eventIds }})

        return events.map(event => {
            return { 
                ...event._doc,
                date: new Date(event.date).toISOString(),
                user: findUserData(event.user._id)
            }
        })
    } catch(err) {
        console.log(`ERROR: ${err}`);
        throw err;
    }
}

module.exports = {
    users: async() => {
        try {
            const users = await User.find();

            return users.map(user => ({ 
                ...user._doc,
                createdEvents: findEventsData(user._doc.createdEvents)
            }));

        } catch(err) {
            console.log(`ERROR: ${err}`);
            throw err;
        };
    },
    events: async() => {
        try {
            const events = await Event.find();

            return events.map(event => {
                return { 
                    ...event._doc,
                    date: new Date(event.date).toISOString(),
                    user: findUserData(event.user._id)
                };
            });

        } catch(err) {
            console.log(`ERROR: ${err}`);
            throw err;
        };
    },
    bookings: async() => {
        try {
            const bookings = await Booking.find();

            return bookings.map(booking => {
                return {
                    ...booking._doc,
                    user: findUserData(booking.user._id),
                    event: findEventData(booking.event._id),
                    createdAt: new Date(booking.createdAt).toISOString(),
                    updatedAt: new Date(booking.updatedAt).toISOString(),
                }
            });
        } catch(err) {
            console.log(`ERROR: ${err}`);
            throw err;
        };
    },
    createBooking: async ({ eventId }) => {
        try {
            const booking = await new Booking({
                user: "612d43fa7858eae664785e47", // wip temp until I add auth
                event: await findEventData(eventId)
            })

            await booking.save();

            return {
                ...booking._doc,
                user: findUserData(booking.user._id),
                event: findEventData(booking.event._id),
                createdAt: new Date(booking.createdAt).toISOString(),
                updatedAt: new Date(booking.updatedAt).toISOString()
            }

        } catch(err) {
            console.log(`ERROR: ${err}`);
            throw err;
        };
    },
    cancelBooking: async ({ bookingId }) => {
        try {
            const booking = await findBookingData(bookingId);
            const event = await findEventData(booking.event._id);

            await deleteBooking(bookingId);

            return { ...event };
        } catch(err) {
            console.log(`ERROR: ${err}`);
            throw err;
        };
    },
    createEvent: async ({ eventInput: { title, description, price } }) => {
        try {
            let createdEvent;

            const event = await new Event({
                title,
                description,
                price: +price,
                date: new Date().toISOString(),
                user: "612d43fa7858eae664785e47" // note: temporary created for testing
            });

            await event.save();

            createdEvent = { 
                ...event._doc,
                user: findUserData(event.user._id)
            };

            const user = await User.findById("612d43fa7858eae664785e47");

            if (!user) {
                throw new Error("A user with that id doesn't exist!");
            }

            user.createdEvents = [ ...user.createdEvents, event ];

            await user.save();

            return createdEvent;
        } catch(err) {
            console.log(`ERROR: ${err}`);
            throw err;
        };
    },
    createUser: async ({ userInput: { email, password }}) => {
        // make sure user doesn't already exist in database
        try {
            const hasUserExist = await User.findOne({ email });

            if (hasUserExist) {
                throw new Error("A user with that email already exists!");
            }

            const user = await new User({
                email,
                password: await bcrypt.hash(password, 12)
            });

            await user.save();

            return { 
                ...user._doc, 
                password: null 
            };

        } catch(err) {
            console.log(`ERROR: ${err}`);
            throw err;
        };
    }
};