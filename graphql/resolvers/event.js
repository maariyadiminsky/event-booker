const { 
    eventData, 
    findAllEvents,
    createNewEvent,
    findEventData,
    isValidEventUser,
    deleteEvent
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
    removeEvent: async ({ eventId }, req) => {
        try {
            if (!req.isUserAuthorized) throw new Error("User is unauthenticated!");
            
            const event = await findEventData(eventId);

            console.log("in event", event);

            // make sure booking really exists
            if (!event || (event && !event.user._id)) throw new Error("Event with that id does not exist!");

            // make sure person deleting booking is the same one who created it
            if(!isValidEventUser(req.userId, event.user._id.toString())) throw new Error("You can only delete your own event.");

            await deleteEvent(eventId);

            return { ...event };
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