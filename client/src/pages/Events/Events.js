import React, { 
    Fragment, 
    useState, useEffect, useContext 
} from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { AuthContext } from '../../context/AuthContext';

import Loader from '../../components/Loader';
import CreateButtonRectangle from '../../components/Button/CreateButtonRectangle';
import EventItems from '../../components/Event/EventItems';
import EventModal from '../../components/Event/EventModal';
import CancelWarningModal from '../../components/Booking/CancelWarningModal';
import EventAlert from '../../components/Event/EventAlert';

import { useShowNotification } from '../../hooks/useShowNotification';
import { 
    CREATE_EVENT_MUTATION, 
    REMOVE_EVENT_MUTATION, 
    EVENTS_QUERY 
} from './queries';
import { 
    handleErrors, 
    getAuthHeaders
} from '../../utils/auth';
import { sortQueryData } from '../../utils';
import { apiBaseCall, apiBaseParams } from '../../utils/api';

import { 
    AUTH_PATH,
    CREATE_EVENT_FORM,
    REMOVE_EVENT_FORM,
    SUCCESS,
    QUERY_POLICY_NETWORK_ONLY
} from '../../const';

const Events = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const { token, userId } = useContext(AuthContext);

    const history = useHistory();

    const eventsQuery = useQuery(EVENTS_QUERY, { 
        fetchPolicy: QUERY_POLICY_NETWORK_ONLY,
    });

    const [createEvent] = useMutation(CREATE_EVENT_MUTATION, { context: getAuthHeaders(token) });
    const [removeEvent] = useMutation(REMOVE_EVENT_MUTATION, { context: getAuthHeaders(token) });

    const [eventCreatedTitle, setEventCreatedTitle] = useState('');
    const [events, setEvents] = useState(null);
    const [cancelEventId, setCancelEventId] = useState(null);

    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [shouldShowCancelModal, setShouldShowCancelModal] = useState(false);
    const [shouldRenderNotification, setShouldRenderNotification] = useShowNotification(eventCreatedTitle);

    useEffect(() => {
        if (!events && eventsQuery) {
            if (!loading && eventsQuery.loading) {
                setLoading(eventsQuery.loading);
            }

            const fetchEvents = () => {
                try {
                    handleErrors(eventsQuery, setErrors);

                    const { data } = eventsQuery;
    
                    if (data && data.events) {
                        const mutableDataEvents = sortQueryData(data.events);

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
    }, [events, eventsQuery, loading, token]);

    const handleOnSubmit = async({ title, description, price, date }) => {
        const apiBaseCallParams = {
            ...apiBaseParams,
            queryToCheck: createEvent,
            queryVariables: {
                userId, 
                title, 
                description, 
                price: +price, 
                date
            },
            exitIfTrue: !token || !userId,
            isMutation: true,
            setLoadingState: setLoading,
            setErrorState: setErrors,
            errorCallback: () => setEventCreatedTitle(''),
            dataCallback: handleCreateEventQueryResult,
            handleErrors,
        }

        await apiBaseCall(apiBaseCallParams);

        setLoading(false);
    }

    const handleCreateEventQueryResult = (data) => {
        if (data && data.createEvent._id && data.createEvent.title) {
            setEvents([
                ...events,
                data.createEvent
            ]);
            setEventCreatedTitle(data.createEvent.title);
            setShouldRenderNotification(true);
            toggleModal();
        } else {
            throw new Error(`${CREATE_EVENT_FORM} failed! Event not created! Please try again.`);
        }
    }

    const handleRemoveEvent = async() => {
        const apiBaseCallParams = {
            ...apiBaseParams,
            queryToCheck: removeEvent,
            queryVariables: {
                eventId: cancelEventId
            },
            exitIfTrue: !token || !userId || !cancelEventId,
            isMutation: true,
            setLoadingState: setLoading,
            setErrorState: setErrors,
            dataCallback: handleRemoveEventQueryResult,
            handleErrors,
        }

        await apiBaseCall(apiBaseCallParams);

        setLoading(false);
    }

    const handleRemoveEventQueryResult = (data) => {
        if (data.removeEvent && data.removeEvent.title) {
            const eventsWithDeletedEventRemoved = events.filter((event) => event.title !== data.removeEvent.title);
            setEvents(eventsWithDeletedEventRemoved);
            toggleCancelModal();
        } else {
            throw new Error(`${REMOVE_EVENT_FORM} failed! Event not deleted! Please try again.`);
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

    const renderEventCreatedConfirmation = () => shouldRenderNotification && (
        <EventAlert 
            alertType={SUCCESS}
            title='Success'
            eventTitle={eventCreatedTitle}
            message='has been created!'
        />
    );

    const renderCancelBookingModal = () => shouldShowCancelModal && (
        <CancelWarningModal
            header="Remove Event"
            errors={errors}
            toggleModal={toggleCancelModal}
            handleOnSubmit={handleRemoveEvent}
        />
    );

    const renderEventModal = () => !shouldRenderNotification && shouldShowModal && (
        <EventModal
            errors={errors}
            toggleModal={toggleModal}
            handleOnSubmit={handleOnSubmit}
        />
    );

    const renderEventItems = () => events && (
        <EventItems
            userId={userId}
            events={events}
            toggleCancelModal={toggleCancelModal}
            setCancelEventId={setCancelEventId}
        />
    );

    if (loading) return <Loader />;

    return (
        <Fragment>
            <div className="w-full max-w-3xl mx-auto mt-12">
                <CreateButtonRectangle
                    className={`${!shouldRenderNotification && !shouldShowModal && 'animate-float'} max-w-2xl m-auto py-8 bg-gradient-to-r from-green-400 to-green-300 hover:from-green-400 hover:to-green-400 border-2 border-green-300 container shadow-lg rounded cursor-pointer`}
                    onClick={toggleModal}
                    text='Create an Event'
                />
                {renderEventCreatedConfirmation()}
                <div className="overflow-y-scroll max-h-screen md:px-20 pb-20 max-w-3xl m-auto">
                {renderEventItems()}
                </div>
            </div>
            {renderEventModal()}
            {renderCancelBookingModal()}
        </Fragment>
    );
}

export default Events;