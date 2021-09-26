import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Loader from "../components/Loader";
import Event from "../components/Event/Event";
import EventModal from "../components/Event/EventModal";
import FormAlert from "../components/Form/FormAlert";

import { eventBookerAPI } from "../api/eventBookerAPI";

import { handleServerErrors } from "../utils/auth";
import { isDateBeforeToday } from "../utils/date";

import { 
    AUTH_PATH,
    GRAPHQL_ENDPOINT,
    CREATE_EVENT_FORM,
    SUCCESS
} from "../const";


const createEventMutation = (userId, title, description, price, date) => `
    mutation {
        createEvent(eventInput: { userId: "${userId}", title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
            _id
            title
            description
            price
            date
        }
    }
`;

const eventsQuery = `
    query {
        events {
            title
            description
            price
            date
        }
    }
`;

const Events = () => {
    const [loading, setLoading] = useState(false);
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [shouldRenderSuccessEventMessage, setShouldRenderSuccessEventMessage] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);
    const [eventCreatedTitle, setEventCreatedTitle] = useState("");
    const [events, setEvents] = useState(null);

    const { token, userId } = useContext(AuthContext);

    const history = useHistory();

    useEffect(() => {
        if (!events) {
            setLoading(true);

            const fetchEvents = async() => {
                try {
                    const response = await eventBookerAPI(token).post(GRAPHQL_ENDPOINT, {
                        query: eventsQuery
                    });
    
                    // handle errors from the server
                    handleServerErrors(response, setServerErrors);
    
                    const { data: { data }} = response;
    
                    if (data.events) {
                        // sort upcoming events at the top
                        data.events.sort((eventOne, eventTwo) => {
                            // make sure expired events are always at the bottom
                            if (isDateBeforeToday(eventOne.date) && !isDateBeforeToday(eventTwo.date)) {
                                return 1;
                            } else if (!isDateBeforeToday(eventOne.date) && isDateBeforeToday(eventTwo.date)) {
                                return -1;
                            }

                            return new Date(eventOne.date) - new Date(eventTwo.date)
                        });

                        // set events for ui
                        setEvents(data.events);
                    } else {
                        // set so loader knows no events exist
                        setEvents([]);
                    }
                } catch(err) {
                    console.log(err);
                    throw err;
                }

                setLoading(false);
            }

            fetchEvents();
        }
    }, []);

    useEffect(() => {    
        if (eventCreatedTitle && shouldRenderSuccessEventMessage) {
            const showSuccessMessageForTwoSeconds = setTimeout(() => {
                setShouldRenderSuccessEventMessage(false)
            }, 2500);

            return () => clearTimeout(showSuccessMessageForTwoSeconds);
        }

    }, [eventCreatedTitle, shouldRenderSuccessEventMessage]);

    const handleOnSubmit = async({ title, description, price, date }) => {
        // user should be verified to hit endpoint
        if (!token || !userId) return;

        setLoading(true);

        try {
            const response = await eventBookerAPI(token).post(GRAPHQL_ENDPOINT, {
                query: createEventMutation(userId, title, description, price, date)
            });

            // handle errors from the server
            if (!response) {
                setEventCreatedTitle("");
                throw new Error(`${CREATE_EVENT_FORM} failed! Response returned empty.`);
            } else if (response.data && response.data.errors && response.data.errors.length > 0) {
                setEventCreatedTitle("");
                setServerErrors(response.data.errors);
                return;
            } else if (response.status !== 200 && response.status !== 201) {
                setEventCreatedTitle("");
                throw new Error(`${CREATE_EVENT_FORM} failed! Check your network connection.`);
            }

            const { data: { data : { createEvent }}} = response;

            if (createEvent._id && createEvent.title) {
                setEvents([
                    ...events,
                    createEvent
                ]);
                setEventCreatedTitle(createEvent.title);
                setShouldRenderSuccessEventMessage(true);
                toggleModal();
            } else {
                throw new Error(`${CREATE_EVENT_FORM} failed! User not created! Please try again.`);
            }
        } catch(err) {
            console.log(err);
            throw err;
        }

        setLoading(false);
    }

    const toggleModal = () => {
        if (!token || !userId) {
            history.push(AUTH_PATH);
        }

        setShouldShowModal(!shouldShowModal);
    }

    const renderEventCreatedConfirmation = () => shouldRenderSuccessEventMessage && (
        <FormAlert type={SUCCESS}>
            <div>
                <p className="font-semibold">Success!</p>
                <p className="text-sm font-light">The Event <span className="font-semibold">{`${eventCreatedTitle}`}</span> has been created!</p>
            </div>
        </FormAlert>
    );

    const renderCreateEvent = () => (
        <div 
            className={`${!shouldRenderSuccessEventMessage && !shouldShowModal && "animate-float"} max-w-2xl m-auto py-8 bg-gradient-to-r from-green-400 to-green-300 hover:from-green-400 hover:to-green-400 border-2 border-green-300 container shadow-lg rounded cursor-pointer`}
            onClick={toggleModal}
        >
            <div className="flex flex-wrap justify-center items-center text-center">
                <div className="text-white my-auto text-center text-xl font-semibold">
                    <span className="text-2xl">+ </span>Create an Event
                </div>
            </div>
        </div>
    );

    const renderEvents = () => events && (
        events.map((event, index) => (
            <Event 
                key={index}
                event={event} 
            />
        ))
    );

    const renderEventModal = () => !shouldRenderSuccessEventMessage && shouldShowModal && (
        <EventModal
            serverErrors={serverErrors}
            toggleModal={toggleModal}
            handleOnSubmit={handleOnSubmit}
        />
    );

    if (loading) return <Loader />;

    return (
        <Fragment>
            <div className="w-full max-w-3xl mx-auto mt-12">
                {renderCreateEvent()}
                {renderEventCreatedConfirmation()}
                <div className="overflow-y-scroll max-h-screen md:px-20 pb-20 max-w-3xl m-auto">
                    {renderEvents()}
                </div>
            </div>
            {renderEventModal()}
        </Fragment>
    );
}

export default Events;