import React, { Fragment, useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { AuthContext } from '../../context/AuthContext';

import Loader from '../../components/Loader';
import BookingModal from '../../components/Booking/BookingModal';
import BookingItems from '../../components/Booking/BookingItems';
import CancelWarningModal from '../../components/Booking/CancelWarningModal';
import CreateButtonSquare from '../../components/Button/CreateButtonSquare';

import { 
    CREATE_BOOKING_MUTATION,
    CANCEL_BOOKING_MUTATION, 
    BOOKINGS_QUERY 
} from './queries';
import { EVENTS_QUERY } from '../Events/queries';
import { useLoadingAndErrors } from '../../hooks/useLoadingAndErrors';
import { useAPIQuery } from '../../hooks/useAPIQuery';
import { apiBaseCall, apiBaseParams } from '../../utils/api';
import { 
    handleErrors,
    getAuthHeaders,
} from '../../utils/auth';

import {
    CANCEL_BOOKING,
    BOOK_AN_EVENT,
    DEFAULT,
    CREATE_BOOKING_FORM,
    QUERY_POLICY_NETWORK_ONLY,
    EVENTS_LOWERCASE,
    BOOKINGS_LOWERCASE,
} from '../../const';

const Bookings = () => {
    const [loading, errors, setLoading, setErrors] = useLoadingAndErrors();

    const { token, userId } = useContext(AuthContext);

    const eventsQuery = useQuery(EVENTS_QUERY);
    const bookingsQuery = useQuery(BOOKINGS_QUERY, { 
        fetchPolicy: QUERY_POLICY_NETWORK_ONLY,
        context: getAuthHeaders(token) 
    });

    const [createBooking] = useMutation(CREATE_BOOKING_MUTATION, { context: getAuthHeaders(token) });
    const [cancelBooking] = useMutation(CANCEL_BOOKING_MUTATION, { context: getAuthHeaders(token) });

    const isEventsQueryAuthEndpoint = DEFAULT.BOOL_FALSE;
    const isBookingsQueryAuthEndpoint = DEFAULT.BOOL_TRUE;
    const shouldStopLoadingIfEventsEmpty = DEFAULT.BOOL_TRUE;
    const [events] = useAPIQuery(eventsQuery, EVENTS_LOWERCASE, loading, setLoading, setErrors, DEFAULT.NULL, isEventsQueryAuthEndpoint, shouldStopLoadingIfEventsEmpty);
    const [bookings, setBookings] = useAPIQuery(bookingsQuery, BOOKINGS_LOWERCASE, loading, setLoading, setErrors, token, isBookingsQueryAuthEndpoint);
    
    const [bookingModalType, setBookingModalType] = useState(CREATE_BOOKING_FORM);
    const [cancelBookingId, setCancelBookingId] = useState(DEFAULT.NULL);
    const [shouldShowModal, setShouldShowModal] = useState(DEFAULT.BOOL_FALSE);
    const [shouldShowCancelModal, setShouldShowCancelModal] = useState(DEFAULT.BOOL_FALSE);

    const handleOnSubmit = async({ event = DEFAULT.NULL }) => {
        const apiBaseCallParams = {
            ...apiBaseParams,
            queryToCheck: createBooking,
            queryVariables: { 
                eventId: event 
            },
            exitIfTrue: !token || !userId || !event,
            isMutation: true,
            setLoadingState: setLoading,
            setErrorState: setErrors,
            dataCallback: handleCreateBookingResult,
            handleErrors,
        }

        await apiBaseCall(apiBaseCallParams);
    }

    const handleCancelBooking = async() => {
        const apiBaseCallParams = {
            ...apiBaseParams,
            queryToCheck: cancelBooking,
            queryVariables: { 
                bookingId: cancelBookingId
            } ,
            exitIfTrue: !token || !userId || !cancelBookingId,
            isMutation: true,
            setLoadingState: setLoading,
            setErrorState: setErrors,
            dataCallback: handleCancelBookingResult,
            handleErrors,
        }

        await apiBaseCall(apiBaseCallParams);
    }

    const handleCreateBookingResult = (data = DEFAULT.NULL) => {
        if (data && data.createBooking._id) {
            setBookings([
                ...bookings,
                data.createBooking
            ]);
            toggleModal();
        } else {
            throw new Error(`${CREATE_BOOKING_FORM} failed! Please try again.`);
        }
    }

    const handleCancelBookingResult = (data = DEFAULT.NULL) => {
        if (data && data.cancelBooking && data.cancelBooking.title) {
            const bookingsWithCanceledBookingRemoved = bookings.filter((booking) => booking.event.title !== data.cancelBooking.title);
            setBookings(bookingsWithCanceledBookingRemoved);
            toggleCancelModal();
        }
    }

    const openCancelModal = (bookingId = DEFAULT.NULL) => {
        setCancelBookingId(bookingId);
        toggleCancelModal();
    }

    const toggleCancelModal = () => setShouldShowCancelModal(!shouldShowCancelModal);

    const toggleModal = (formType = DEFAULT.NULL) => {
        setBookingModalType(formType);
        setShouldShowModal(!shouldShowModal);
    }

    const renderCancelBookingModal = () => shouldShowCancelModal && (
        <CancelWarningModal
            header={CANCEL_BOOKING}
            errors={errors}
            toggleModal={toggleCancelModal}
            handleOnSubmit={handleCancelBooking}
        />
    );

    const renderBookingModal = () => shouldShowModal && (
        <BookingModal
            formType={bookingModalType}
            errors={errors}
            toggleModal={toggleModal}
            handleOnSubmit={handleOnSubmit}
            eventOptions={events}
        />
    );

    if (loading) return <Loader />;
    
    return (
        <Fragment>
            <div className="w-full mt-12">
                <div className="overflow-y-scroll max-h-screen px-20 pb-20 m-auto">
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-x-52 md:gap-y-1 lg:grid-cols-4 lg:gap-x-52 xl:grid-cols-5 xl:gap-x-72 2xl:gap-x-3">
                        <CreateButtonSquare
                            className='relative animate-pulse flex flex-wrap sm:justify-center md:justify-end text-right content-right h-64 w-72 max-h-64 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-400 border-2 border-green-300 container shadow-lg rounded cursor-pointer'
                            onClick={() => toggleModal(CREATE_BOOKING_FORM)}
                            text={BOOK_AN_EVENT}
                        />
                        <BookingItems bookings={bookings} openCancelModal={openCancelModal} />
                    </div>
                </div>
            </div>
            {renderBookingModal()}
            {renderCancelBookingModal()}
        </Fragment>
    );
}

export default Bookings;