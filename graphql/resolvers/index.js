const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");

const findUserData = (userId) => {
    return User.findById(userId)
        .then((user) => ({ 
            ...user._doc,
            password: null
        }))
        .catch(err => {
            console.log(`ERROR: ${err}`);
            throw err;
        });
}

const findEventData = (eventIds) => {
    return Event.find({
            _id: { $in: eventIds }
        })
        .then((events) => {
            return events.map(event => {
                return { 
                    ...event._doc,
                    user: findUserData(event.user._id)
                }
            })
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            throw err;
        });
}

module.exports = {
    users: () => {
        return User.find()
        .then((users) => (
            users.map(user => ({ 
                ...user._doc,
                createdEvents: findEventData(user._doc.createdEvents)
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
                    user: findUserData(event.user._id)
                };
            })
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