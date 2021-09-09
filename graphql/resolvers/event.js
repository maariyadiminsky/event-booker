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
            console.log(`ERROR: ${err}`);
            throw err;
        };
    },
    createEvent: async ({ eventInput: { title, description, price } }) => {
        try {
            let createdEvent;

            const event = await createNewEvent(title, description, price);

            await event.save();

            createdEvent = eventData(event);

            const user = await findUserById("612d43fa7858eae664785e47");

            if (!user) throw new Error("A user with that id doesn't exist!");

            user.createdEvents = [ ...user.createdEvents, event ];

            await user.save();

            return createdEvent;
        } catch(err) {
            console.log(`ERROR: ${err}`);
            throw err;
        };
    },
}