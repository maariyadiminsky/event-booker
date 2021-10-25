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

const deleteEvent = async (eventId) => {
    try {
        return await Event.deleteOne({ _id: eventId });
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const findEventData = async(eventId) => {
    try {
        const event = await Event.findById(eventId);

        return event ? eventData(event) : null;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const findEventsData = async(eventIds) => {
    try {
        const events = await Event.find({ _id: { $in: eventIds }})

        return events.map(event => event ? eventData(event) : null);
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const findAllEvents = () => Event.find();

const createNewEvent = (userId, title, description, price, date) => (
    new Event({
        title,
        description,
        price,
        date: findDate(date),
        user: userId
    })
);

const isValidEventUser = (userId, eventUserId) => userId === eventUserId;

module.exports = {
    findEventData,
    findEventsData,
    eventData,
    findAllEvents,
    createNewEvent,
    deleteEvent,
    isValidEventUser
};