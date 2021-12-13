import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { AuthContext } from '../../context/AuthContext';

import Loader from '../../components/Loader';
import CreateButtonRectangle from '../../components/Button/CreateButtonRectangle';
import EventItems from '../../components/Event/EventItems';
import EventModal from '../../components/Event/EventModal';
import CancelWarningModal from '../../components/Booking/CancelWarningModal';
import EventAlert from '../../components/Event/EventAlert';

import { useLoadingAndErrors } from '../../hooks/useLoadingAndErrors';
import { useAPIQuery } from '../../hooks/useAPIQuery';
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
import { apiBaseCall, apiBaseParams } from '../../utils/api';

import { 
    AUTH_PATH,
    CREATE_EVENT_FORM,
    REMOVE_EVENT_FORM,
    SUCCESS,
    QUERY_POLICY_NETWORK_ONLY,
    EVENTS_LOWERCASE
} from '../../const';

const Events = () => {
    const [loading, errors, setLoading, setErrors] = useLoadingAndErrors();

    const { token, userId } = useContext(AuthContext);

    const history = useHistory();

    const eventsQuery = useQuery(EVENTS_QUERY, { 
        fetchPolicy: QUERY_POLICY_NETWORK_ONLY,
    });

    const [createEvent] = useMutation(CREATE_EVENT_MUTATION, { context: getAuthHeaders(token) });
    const [removeEvent] = useMutation(REMOVE_EVENT_MUTATION, { context: getAuthHeaders(token) });

    const [eventCreatedTitle, setEventCreatedTitle] = useState('');
    const [cancelEventId, setCancelEventId] = useState(null);

    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [shouldShowCancelModal, setShouldShowCancelModal] = useState(false);
    const [shouldRenderNotification, setShouldRenderNotification] = useShowNotification(eventCreatedTitle);

    const [data, setData] = useAPIQuery(eventsQuery, EVENTS_LOWERCASE, loading, setLoading, setErrors);

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

    const handleCreateEventQueryResult = (dataResult) => {
        if (dataResult && dataResult.createEvent._id && dataResult.createEvent.title) {
            setData([
                ...data,
                dataResult.createEvent
            ]);
            setEventCreatedTitle(dataResult.createEvent.title);
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

    const handleRemoveEventQueryResult = (dataResult) => {
        if (dataResult.removeEvent && dataResult.removeEvent.title) {
            const eventsWithDeletedEventRemoved = data.filter((event) => event.title !== dataResult.removeEvent.title);
            setData(eventsWithDeletedEventRemoved);
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

    const renderEventItems = () => data && (
        <EventItems
            userId={userId}
            events={data}
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