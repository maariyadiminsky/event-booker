const { 
    eventData, 
    findAllEvents,
    createNewEvent 
} = require("../../utils/event");

const { findUserById } = require("../../utils/user");

module.exports = {
    events: async() => {
        try {
            const events = await findAllEvents();

            return events.map(event => eventData(event));
        } catch(err) {
            console.log(err);
            throw err;
        };
    },
    createEvent: async ({ eventInput: { userId, title, description, price, date } }, req) => {
        try {
            if (!req.isUserAuthorized) throw new Error("User is unauthenticated!");

            let createdEvent;

            const event = await createNewEvent(userId, title, description, price, date);

            await event.save();

            createdEvent = eventData(event);

            const user = await findUserById(event.user._id);

            if (!user) throw new Error("A user with that id doesn't exist!");

            user.createdEvents = [ ...user.createdEvents, event ];

            await user.save();

            return createdEvent;
        } catch(err) {
            console.log(err);
            throw err;
        };
    },
}