import React, { Fragment, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Loader from "../components/Loader";
import BookingModal from "../components/Booking/BookingModal";
import CancelBookingModal from "../components/Booking/CancelBookingModal";

import { eventBookerAPI } from "../api/eventBookerAPI";

import { handleServerErrors } from "../utils/auth";
import { getRandomColor } from "../utils/colors";

import { 
    isDateBeforeToday,
    getDateInCorrectFormat 
} from "../utils/date";

import { 
    BOOKINGS,
    EVENTS,
    GRAPHQL_ENDPOINT,
    CREATE_BOOKING_FORM,
    DELETE_BOOKING_FORM
} from "../const";

const createBookingMutation = (eventId) => `
    mutation {
        createBooking(eventId: "${eventId}") {
            _id
            event {
                title
                date
            }
        }
    }
`;

const cancelBookingMutation = (bookingId) => `
    mutation {
        cancelBooking(bookingId: "${bookingId}") {
            title
        }
    }
`;

const bookingsQuery = `
    query {
        bookings {
            _id
            event {
                title
                date
            }
        }
    }
`;

const eventsQuery = `
    query {
        events {
            _id
            title
            description
            price
            date
        }
    }
`;

const Bookings = () => {
    const [loading, setLoading] = useState(false);
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [shouldShowCancelModal, setShouldShowCancelModal] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);
    const [events, setEvents] = useState(null);
    const [bookings, setBookings] = useState(null);
    const [bookingModalType, setBookingModalType] = useState(CREATE_BOOKING_FORM);
    const [cancelBookingId, setCancelBookingId] = useState(null);

    const { token, userId } = useContext(AuthContext);

    const fetchItems = async(itemType) => {
        try {
            const isBookings = itemType === BOOKINGS;
            const response = await eventBookerAPI(token).post(GRAPHQL_ENDPOINT, {
                query: isBookings ? bookingsQuery : eventsQuery
            });

            // handle errors from the server
            handleServerErrors(response, setServerErrors);

            const { data: { data }} = response;

            const responseData = isBookings ? data.bookings : data.events;

            if (responseData && responseData.length > 0) {
                // sort upcoming items at the top
                responseData.sort((itemOne, itemTwo) => {
                    const firstItem = isBookings ? itemOne.event.date : itemOne;
                    const secondItem = isBookings ? itemTwo.event.date : itemTwo;

                    // make sure expired items are always at the bottom
                    if (isDateBeforeToday(firstItem) && !isDateBeforeToday(secondItem)) {
                        return 1;
                    } else if (!isDateBeforeToday(firstItem) && isDateBeforeToday(secondItem)) {
                        return -1;
                    }

                    return new Date(itemOne.date) - new Date(itemTwo.date)
                });

                // set items
                if (isBookings) {
                    setBookings(responseData);
                } else {
                    setEvents(responseData);
                }
            } else {
                // set so loader knows no items exist
                if (isBookings) {
                    setBookings([]);
                } else {
                    setEvents([]);
                }
            }
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    useEffect(() => {
        if (!events) {
            setLoading(true);

            const fetchEvents = async() => {
                await fetchItems(EVENTS);
            }

            fetchEvents();
        }

    }, [events])

    useEffect(() => {
        if (events && events.length > 0 && !bookings) {
            setLoading(true);
            // user should be verified to hit endpoint
            if (!token || !userId) return;

            const fetchBookings = async() => {
                await fetchItems(BOOKINGS);

                setLoading(false);
            };

            fetchBookings();
        } else if (events && events.length === 0 && !bookings) {
            setBookings([]);
        }

    }, [events, bookings])

    const handleOnSubmit = async({ event }) => {
        // user should be verified to hit endpoint
        if (!token || !userId || !event) return;

        setLoading(true);

        try {
            const response = await eventBookerAPI(token).post(GRAPHQL_ENDPOINT, {
                query: createBookingMutation(event)
            });

            // handle errors from the server
            if (!response) {
                throw new Error(`${CREATE_BOOKING_FORM} failed! Response returned empty.`);
            } else if (response.data && response.data.errors && response.data.errors.length > 0) {
                setServerErrors(response.data.errors);
                return;
            } else if (response.status !== 200 && response.status !== 201) {
                throw new Error(`${CREATE_BOOKING_FORM} failed! Check your network connection.`);
            }

            const { data: { data : { createBooking }}} = response;

            if (createBooking._id) {
                setBookings([
                    ...bookings,
                    createBooking
                ]);
                toggleModal();
            } else {
                throw new Error(`${CREATE_BOOKING_FORM} failed! Please try again.`);
            }

            setLoading(false);
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    const handleCancelBooking = async() => {
        // user should be verified to hit endpoint
        if (!token || !userId || !cancelBookingId) return;

        setLoading(true);

        try {
            const response = await eventBookerAPI(token).post(GRAPHQL_ENDPOINT, {
                query: cancelBookingMutation(cancelBookingId)
            });

            // handle errors from the server
            if (!response) {
                throw new Error(`${DELETE_BOOKING_FORM} failed! Response returned empty.`);
            } else if (response.data && response.data.errors && response.data.errors.length > 0) {
                setServerErrors(response.data.errors);
                return;
            } else if (response.status !== 200 && response.status !== 201) {
                throw new Error(`${DELETE_BOOKING_FORM} failed! Check your network connection.`);
            }

            const { data: { data : { cancelBooking }}} = response;

            // if deletion was successful reset bookings so they would be refetched again
            // purpose of this is to keep bookings in sync with backend
            if (cancelBooking && cancelBooking.title) {
                setBookings(null);
                toggleCancelModal();
            }

        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    const openCancelModal = (bookingId = null) => {
        setCancelBookingId(bookingId);
        toggleCancelModal();
    }

    const toggleCancelModal = () => setShouldShowCancelModal(!shouldShowCancelModal);

    const toggleModal = (formType = null) => {
        setBookingModalType(formType);
        setShouldShowModal(!shouldShowModal);
    }

    const renderBookings = () => bookings && bookings.length > 0 && (
        bookings.map(({ _id, event: { title, date }}) => {
            const color = getRandomColor();
            return (
                <div 
                    key={title}
                    className={`relative flex m-auto bg-gradient-to-r h-64 max-h-64 w-72 from-${color}-500 to-${color}-400 hover:from-${color}-400 hover:to-${color}-400 border-2 border-${color}-300 shadow-xl rounded-lg cursor-pointer`}>
                    <div className={`absolute inset-x-5 top-5 text-${color}-100 text-xl text-right`}>
                        ✨ {getDateInCorrectFormat(date)}
                    </div>
                    <div 
                        onClick={() => openCancelModal(_id)}
                        className={`absolute inset-x-5 top-5 font-thin text-${color}-50 text-sm text-left`}
                    >
                        Cancel
                    </div>
                    <div className={`absolute inset-x-5 bottom-5 text-${color}-100 text-4xl font-semibold text-right`}>
                        {title}
                    </div>
                </div>
            );
        })
    );

    const renderCancelBookingModal = () => shouldShowCancelModal && (
        <CancelBookingModal
            serverErrors={serverErrors}
            toggleModal={toggleCancelModal}
            handleOnSubmit={handleCancelBooking}
        />
    )

    const renderBookingModal = () => shouldShowModal && (
        <BookingModal
            formType={bookingModalType}
            serverErrors={serverErrors}
            toggleModal={toggleModal}
            handleOnSubmit={handleOnSubmit}
            eventOptions={events}
        />
    );

    const renderBookAnEvent = () => (
        <div 
            onClick={() => toggleModal(CREATE_BOOKING_FORM)}
            className="relative animate-pulse flex flex-wrap sm:justify-center md:justify-end text-right content-right h-64 w-72 max-h-64 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-400 border-2 border-green-300 container shadow-lg rounded cursor-pointer">
            <div className="absolute inset-x-5 bottom-5 text-green-100 text-4xl font-semibold">
                <span className="">+ </span>Book an Event
            </div>
        </div>
    );

    if (loading) return <Loader />;

    return (
        <Fragment>
            <div className="w-full mt-12">
                <div className="overflow-y-scroll max-h-screen px-20 pb-20 m-auto">
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-x-52 md:gap-y-1 lg:grid-cols-4 lg:gap-x-52 xl:grid-cols-5 xl:gap-x-72 2xl:gap-x-3">
                        {renderBookAnEvent()}
                        {renderBookings()}
                    </div>
                </div>
            </div>
            {renderBookingModal()}
            {renderCancelBookingModal()}
        </Fragment>
    );
}

export default Bookings;