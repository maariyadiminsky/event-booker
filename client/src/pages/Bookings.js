import React, { Fragment, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { eventBookerAPI } from "../api/eventBookerAPI";

import Loader from "../components/Loader";
import BookingModal from "../components/Booking/BookingModal";

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
    CREATE_BOOKING_FORM
} from "../const";

const createBookingMutation = (userId, eventId) => `
    mutation {
        createBooking(userId: "${userId}", eventId: "${eventId}") {
            _id
            event {
                title
                date
            }
        }
    }
`;

const bookingsQuery = `
    query {
        bookings {
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
    const [serverErrors, setServerErrors] = useState([]);
    const [events, setEvents] = useState(null);
    const [bookings, setBookings] = useState(null);
    const [bookingModalType, setBookingModalType] = useState(CREATE_BOOKING_FORM);

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
        if (!bookings) {
            setLoading(true);
            // user should be verified to hit endpoint
            if (!token || !userId) return;

            const fetchBookings = async() => {
                const eventItems = events && events.length > 0 ? events : await fetchItems(EVENTS);

                if (eventItems && eventItems.length > 0) {
                    await fetchItems(BOOKINGS);
                } else {
                    setBookings([]);
                }

                setLoading(false);
            };

            fetchBookings();
        }

    }, [events])

    const handleOnSubmit = async({ event }) => {
        // user should be verified to hit endpoint
        if (!token || !userId || !event) return;

        setLoading(true);

        try {
            const response = await eventBookerAPI(token).post(GRAPHQL_ENDPOINT, {
                query: createBookingMutation(userId, event)
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

    const toggleModal = (formType) => {
        setBookingModalType(formType);
        setShouldShowModal(!shouldShowModal);
    }

    const renderBookings = () => bookings && bookings.length > 0 && (
        bookings.map(({ event: { title, date }}) => {
            const color = getRandomColor();
            return (
                <div className={`relative flex justify-end text-right bg-gradient-to-r h-64 max-h-64 sm:w-64 from-${color}-500 to-${color}-400 hover:from-${color}-400 hover:to-${color}-400 border-2 border-${color}-300 shadow-xl rounded-lg cursor-pointer`}>
                    <div className={`absolute inset-x-5 top-5 font-light text-${color}-100 text-xl`}>
                        {title}
                    </div>
                    <div className={`absolute inset-x-5 bottom-5 text-${color}-100 text-4xl font-semibold`}>
                        {getDateInCorrectFormat(date)}
                    </div>
                </div>
            );
        })
    );

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
            className="relative animate-pulse flex flex-wrap justify-end text-right content-right h-64 sm:w-64 max-h-64 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-400 border-2 border-green-300 container shadow-lg rounded cursor-pointer">
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
                    <div className="grid grid-cols-5 sm:gap-x-72 xl:gap-x-48 2xl:gap-x-3">
                        {renderBookAnEvent()}
                        {renderBookings()}
                    </div>
                </div>
            </div>
            {renderBookingModal()}
        </Fragment>
    );
}

export default Bookings;