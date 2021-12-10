import React, { 
    Fragment, 
    useState, useEffect, useContext 
} from 'react';
import { useHistory } from 'react-router-dom';
import {
    useQuery,
    useMutation,
    gql
  } from '@apollo/client';

import { AuthContext } from '../context/AuthContext';

import Loader from '../components/Loader';
import Event from '../components/Event/Event';
import EventModal from '../components/Event/EventModal';
import CancelWarningModal from '../components/Booking/CancelWarningModal';
import FormAlert from '../components/Form/FormAlert';

import { 
    handleErrors, 
    getAuthHeaders
} from '../utils/auth';
import { isDateBeforeToday } from '../utils/date';

import { 
    AUTH_PATH,
    CREATE_EVENT_FORM,
    REMOVE_EVENT_FORM,
    SUCCESS,
    QUERY_POLICY_NETWORK_ONLY
} from '../const';

const CREATE_EVENT_MUTATION = gql`
    mutation CreateEvent($userId: ID!, $title: String!, $description: String!, $price: Float!, $date: String!){
        createEvent(eventInput: { userId: $userId, title: $title, description: $description, price: $price, date: $date}) {
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

const REMOVE_EVENT_MUTATION = gql`
    mutation RemoveEvent($eventId: ID!) {
        removeEvent(eventId: $eventId) {
            title
        }
    }
`;

const EVENTS_QUERY = gql`
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
    // loader & errors
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    // context
    const { token, userId } = useContext(AuthContext);

    // routing
    const history = useHistory();

    // graphql
    const eventsQuery = useQuery(EVENTS_QUERY, { 
        fetchPolicy: QUERY_POLICY_NETWORK_ONLY,
    });

    const [createEvent] = useMutation(CREATE_EVENT_MUTATION, { context: getAuthHeaders(token) });
    const [removeEvent] = useMutation(REMOVE_EVENT_MUTATION, { context: getAuthHeaders(token) });

    // data
    const [eventCreatedTitle, setEventCreatedTitle] = useState('');
    const [events, setEvents] = useState(null);
    const [cancelEventId, setCancelEventId] = useState(null);

    // boolean values
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [shouldShowCancelModal, setShouldShowCancelModal] = useState(false);
    const [shouldRenderSuccessEventMessage, setShouldRenderSuccessEventMessage] = useState(false);

    useEffect(() => {
        if (!events && eventsQuery) {
            if (!loading && eventsQuery.loading) {
                setLoading(eventsQuery.loading);
            }

            const fetchEvents = () => {
                try {
                    // handle errors
                    handleErrors(eventsQuery, setErrors);

                    const { data } = eventsQuery;
    
                    if (data && data.events) {
                        // temporarily mutate data for sorting purposes
                        const mutableDataEvents = [...data.events];

                        // sort upcoming events at the top
                        mutableDataEvents.sort((eventOne, eventTwo) => {
                            // make sure expired events are always at the bottom
                            if (isDateBeforeToday(eventOne.date) && !isDateBeforeToday(eventTwo.date)) {
                                return 1;
                            } else if (!isDateBeforeToday(eventOne.date) && isDateBeforeToday(eventTwo.date)) {
                                return -1;
                            }

                            return new Date(eventOne.date) - new Date(eventTwo.date)
                        });

                        // set events for ui
                        setEvents(mutableDataEvents);
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
    }, [
        events, eventsQuery, 
        loading, 
        token
    ]);

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
            const response = await createEvent({ 
                variables: {
                    userId, 
                    title, 
                    description, 
                    price: +price, 
                    date
                }
            });

            // handle errors
            handleErrors(response, setErrors, () => setEventCreatedTitle(''), true);

            const { data, loading } = response;

            if (data.createEvent._id && data.createEvent.title) {
                setEvents([
                    ...events,
                    data.createEvent
                ]);
                setEventCreatedTitle(data.createEvent.title);
                setShouldRenderSuccessEventMessage(true);
                toggleModal();
            } else {
                throw new Error(`${CREATE_EVENT_FORM} failed! Event not created! Please try again.`);
            }

            setLoading(loading);
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
            const response = await removeEvent({ 
                variables: {
                    eventId: cancelEventId
                }
            });

            // handle errors
            handleErrors(response, setErrors, null, true);

            const { data, loading } = response;

            if (data.removeEvent && data.removeEvent.title) {
                const eventsWithDeletedEventRemoved = events.filter((event) => event.title !== data.removeEvent.title);
                setEvents(eventsWithDeletedEventRemoved);
                toggleCancelModal();
            } else {
                throw new Error(`${REMOVE_EVENT_FORM} failed! Event not deleted! Please try again.`);
            }

            setLoading(loading);
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
            className={`${!shouldRenderSuccessEventMessage && !shouldShowModal && 'animate-float'} max-w-2xl m-auto py-8 bg-gradient-to-r from-green-400 to-green-300 hover:from-green-400 hover:to-green-400 border-2 border-green-300 container shadow-lg rounded cursor-pointer`}
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
            errors={errors}
            toggleModal={toggleCancelModal}
            handleOnSubmit={handleRemoveEvent}
        />
    );

    const renderEventModal = () => !shouldRenderSuccessEventMessage && shouldShowModal && (
        <EventModal
            errors={errors}
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