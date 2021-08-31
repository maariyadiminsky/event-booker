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

const findEventData = async(eventId) => {
    try {
        const event = await Event.findOne({ _id: eventId });
        return event;
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
    users: () => {
        return User.find()
        .then((users) => (
            users.map(user => ({ 
                ...user._doc,
                createdEvents: findEventsData(user._doc.createdEvents)
            })))
        )
        .catch(err => {
            console.log(`ERROR: ${err}`);
            throw err;
        });
    },
    events: () => {
        return Event.find()
        .then((events) => {
            return events.map(event => {
                return { 
                    ...event._doc,
                    date: new Date(event.date).toISOString(),
                    user: findUserData(event.user._id)
                };
            })
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            throw err;
        });
    },
    bookings: () => {
        return Booking.find()
            .then((bookings) => {
                return bookings.map(booking => {
                    return {
                        ...booking._doc,
                        createdAt: new Date(booking.createdAt).toISOString(),
                        updatedAt: new Date(booking.updatedAt).toISOString(),
                    }
                });
            })
            .catch(err => {
                console.log(`ERROR: ${err}`);
                throw err;
            });
    },
    createBooking: async ({ eventId }) => {
        const booking = new Booking({
            user: "612d43fa7858eae664785e47", // wip temp until I add auth
            event: await findEventData(eventId)
        })

        return booking.save()
            .then((res) => {
                return {
                    ...res._doc,
                    createdAt: new Date(res.createdAt).toISOString(),
                    updatedAt: new Date(res.updatedAt).toISOString()
                }
            })
            .catch(err => {
                console.log(`ERROR: ${err}`);
                throw err;
            });
    },
    createEvent: ({ eventInput: { title, description, price } }) => {
        const event = new Event({
            title,
            description,
            price: +price,
            date: new Date().toISOString(),
            user: "612d43fa7858eae664785e47" // note: temporary created for testing
        });

        let createdEvent;

        return event.save()
            .then((res) => {
                createdEvent = { 
                    ...res._doc,
                    user: findUserData(res.user._id)
                };

                return User.findById("612d43fa7858eae664785e47");
            })
            .then(user => {
                if (!user) {
                    throw new Error("A user with that id doesn't exist!");
                }

                user.createdEvents = [ ...user.createdEvents, event ];

                return user.save();
            })
            .then(() => createdEvent)
            .catch(err => {
                console.log(`ERROR: ${err}`);
                throw err;
            });

        return event;
    },
    createUser: ({ userInput: { email, password }}) => {
        // make sure user doesn't already exist in database
        return User.findOne({ email })
            .then((user) => {
                if (user) {
                    throw new Error("A user with that email already exists!");
                }

                return bcrypt.hash(password, 12);
            })
            .then((safePass) => {
                const user = new User({
                    email,
                    password: safePass
                });

                return user.save()
                .then((res) => {
                    return { ...res._doc, password: null };
                })
                .catch(err => {
                    console.log(`ERROR: ${err}`);
                    throw err;
                });
            })
            .catch(err => {
                console.log(`ERROR: ${err}`);
                throw err;
            });
    }
};