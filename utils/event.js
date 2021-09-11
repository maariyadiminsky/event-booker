const { findDate } = require("./date");
const { findUserData } = require("./user");

const Event = require("../models/event");

const eventData = async(event) => {
    try {
        return { 
            ...event._doc,
            date: findDate(event.date),
            user: await findUserData(event.user._id)
        }
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const findEventData = async(eventId) => {
    try {
        const event = await Event.findById(eventId);

        return eventData(event);
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const findEventsData = async(eventIds) => {
    try {
        const events = await Event.find({ _id: { $in: eventIds }})

        return events.map(event => eventData(event));
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const findAllEvents = () => Event.find();

const createNewEvent = (title, description, price) => (
    new Event({
        title,
        description,
        price: +price,
        date: findDate(),
        user: "612d43fa7858eae664785e47" // note: temporary created for testing
    })
);

module.exports = {
    findEventData,
    findEventsData,
    eventData,
    findAllEvents,
    createNewEvent
};