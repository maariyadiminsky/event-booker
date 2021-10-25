import React, { 
    Fragment, 
    useState, useEffect, useContext 
} from "react";
import { useHistory } from "react-router-dom";
import {
    useQuery,
    gql
  } from "@apollo/client";

import { AuthContext } from "../context/AuthContext";

import Loader from "../components/Loader";
import Event from "../components/Event/Event";
import EventModal from "../components/Event/EventModal";
import CancelWarningModal from "../components/Booking/CancelWarningModal";
import FormAlert from "../components/Form/FormAlert";

import { eventBookerAPI } from "../api/eventBookerAPI";

import { handleServerErrors } from "../utils/auth";
import { isDateBeforeToday } from "../utils/date";

import { 
    AUTH_PATH,
    GRAPHQL_ENDPOINT,
    CREATE_EVENT_FORM,
    REMOVE_EVENT_FORM,
    SUCCESS,
} from "../const";


const createEventMutation = (userId, title, description, price, date) => `
    mutation {
        createEvent(eventInput: { userId: "${userId}", title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
            _id
            title
            description
            price
            date
            user {
                _id
            }
        }
    }
`;

const removeEventMutation = (eventId) => `
    mutation {
        removeEvent(eventId: "${eventId}") {
            title
        }
    }
`;

const EventsQuery = gql`
    query Events {
        events {
            _id
            title
            description
            price
            date
            user {
                _id
            }
        }
    }
`;

const Events = () => {
    const [loading, setLoading] = useState(false);
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [shouldShowCancelModal, setShouldShowCancelModal] = useState(false);
    const [shouldRenderSuccessEventMessage, setShouldRenderSuccessEventMessage] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);
    const [eventCreatedTitle, setEventCreatedTitle] = useState("");
    const [events, setEvents] = useState(null);
    const [cancelEventId, setCancelEventId] = useState(null);

    const { token, userId } = useContext(AuthContext);

    const history = useHistory();

    const eventsQuery = useQuery(EventsQuery);

    useEffect(() => {
        if (!events && eventsQuery) {
            if (!loading && eventsQuery.loading) {
                setLoading(eventsQuery.loading);
            }

            const fetchEvents = async() => {
                try {
                    // handle errors from the server
                    handleServerErrors(eventsQuery, setServerErrors);

                    const { data } = eventsQuery;
    
                    if (data && data.events) {
                        const newDataEvents = [...data.events];

                        // sort upcoming events at the top
                        newDataEvents.sort((eventOne, eventTwo) => {
                            // make sure expired events are always at the bottom
                            if (isDateBeforeToday(eventOne.date) && !isDateBeforeToday(eventTwo.date)) {
                                return 1;
                            } else if (!isDateBeforeToday(eventOne.date) && isDateBeforeToday(eventTwo.date)) {
                                return -1;
                            }

                            return new Date(eventOne.date) - new Date(eventTwo.date)
                        });

                        // set events for ui
                        setEvents(newDataEvents);
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

            if (!eventsQuery.loading) {
                fetchEvents();
            }
        }
    }, [events, eventsQuery, loading, token]);

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

    const handleRemoveEvent = async() => {
        // user should be verified to hit endpoint
        if (!token || !userId || !cancelEventId) return;

        setLoading(true);

        try {
            const response = await eventBookerAPI(token).post(GRAPHQL_ENDPOINT, {
                query: removeEventMutation(cancelEventId)
            });

            // handle errors from the server
            if (!response) {
                throw new Error(`${REMOVE_EVENT_FORM} failed! Response returned empty.`);
            } else if (response.data && response.data.errors && response.data.errors.length > 0) {
                setServerErrors(response.data.errors);
                return;
            } else if (response.status !== 200 && response.status !== 201) {
                throw new Error(`${REMOVE_EVENT_FORM} failed! Check your network connection.`);
            }

            const { data: { data : { removeEvent }}} = response;

            // if deletion was successful reset events so they would be refetched again
            // purpose of this is to keep event in sync with backend
            if (removeEvent && removeEvent.title) {
                setEvents(null);
                toggleCancelModal();
            }

        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    const toggleCancelModal = () => {
        if (shouldShowCancelModal) setCancelEventId(null);

        setShouldShowCancelModal(!shouldShowCancelModal);
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
                userId={userId}
                toggleCancelModal={toggleCancelModal}
                setCancelEventId={(id) => setCancelEventId(id)}
            />
        ))
    );

    const renderCancelBookingModal = () => shouldShowCancelModal && (
        <CancelWarningModal
            header="Remove Event"
            serverErrors={serverErrors}
            toggleModal={toggleCancelModal}
            handleOnSubmit={handleRemoveEvent}
        />
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
            {renderCancelBookingModal()}
        </Fragment>
    );
}

export default Events;