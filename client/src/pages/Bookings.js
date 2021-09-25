import React, { Fragment, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { eventBookerAPI } from "../api/eventBookerAPI";

import BookingModal from "../components/Booking/BookingModal";

import { handleServerErrors } from "../utils/auth";
import { isDateBeforeToday } from "../utils/date";
import { getRandomColor } from "../utils/colors";

import { 
    BOOKINGS,
    EVENTS,
    GRAPHQL_ENDPOINT,
    CREATE_BOOKING_FORM,
    DELETE_BOOKING_FORM,
} from "../const";

const createBookingMutation = (userId, eventId) => `
    mutation {
        createBooking(userId: "${userId}", eventId: "${eventId}") {
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

                console.log("responseData", responseData);
                // set items
                if (isBookings) {
                    setBookings(responseData);
                } else {
                    setEvents(responseData);
                }
            } else {
                console.log("no data", itemType);
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
            // user should be verified to hit endpoint
            if (!token || !userId) return;

            const fetchBookings = async() => {
                const eventItems = events && events.length > 0 ? events : await fetchItems(EVENTS);

                if (eventItems && eventItems.length > 0) {
                    console.log("events exist!",eventItems.length);
                    console.log("fetching bookings", bookings);
                    await fetchItems(BOOKINGS);
                    console.log("fetched bookings", bookings);
                } else {
                    setBookings([]);
                }
            };

            fetchBookings();
        }
    }, [events])

    const handleOnSubmit = async(values) => {
        // user should be verified to hit endpoint
        if (!token || !userId) return;

        console.log("values", values);

        // try {
        //     const response = await eventBookerAPI(token).post(GRAPHQL_ENDPOINT, {
        //         query: createBookingMutation(userId, title, description, price, date)
        //     });

        //     // handle errors from the server
        //     if (!response) {
        //         setEventCreatedTitle("");
        //         throw new Error(`${CREATE_EVENT_FORM} failed! Response returned empty.`);
        //     } else if (response.data && response.data.errors && response.data.errors.length > 0) {
        //         setEventCreatedTitle("");
        //         setServerErrors(response.data.errors);
        //         return;
        //     } else if (response.status !== 200 && response.status !== 201) {
        //         setEventCreatedTitle("");
        //         throw new Error(`${CREATE_EVENT_FORM} failed! Check your network connection.`);
        //     }

        //     const { data: { data : { createEvent }}} = response;

        //     if (createEvent._id && createEvent.title) {
        //         setEvents([
        //             ...events,
        //             createEvent
        //         ]);
        //         setEventCreatedTitle(createEvent.title);
        //         setShouldRenderSuccessEventMessage(true);
        //         toggleModal();
        //     } else {
        //         throw new Error(`${CREATE_EVENT_FORM} failed! User not created! Please try again.`);
        //     }
        // } catch(err) {
        //     console.log(err);
        //     throw err;
        // }
    }

    const toggleModal = (formType) => {
        setBookingModalType(formType);
        setShouldShowModal(!shouldShowModal);
    }

    const renderBookings = () => bookings && bookings.length > 0 && (
        bookings.map(({ title, event: { date }}) => {
            const color = getRandomColor();
            return (
                <div className={`relative flex flex-wrap justify-end text-right bg-gradient-to-r h-64 max-h-64 from-${color}-500 to-${color}-400 hover:from-${color}-400 hover:to-${color}-400 border-2 border-${color}-300 shadow-xl rounded-lg cursor-pointer`}>
                    <div className={`absolute inset-x-5 top-5 font-light text-${color}-100 text-xl`}>
                        {title}
                    </div>
                    <div className={`absolute inset-x-5 bottom-5 text-${color}-100 text-4xl font-semibold`}>
                        {date}
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
            className="relative animate-pulse flex flex-wrap justify-end text-right content-right h-64 max-h-64 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-400 border-2 border-green-300 container shadow-lg rounded cursor-pointer">
            <div className="absolute inset-x-5 bottom-5 text-green-100 text-4xl font-semibold">
                <span className="">+ </span>Book an Event
            </div>
        </div>
    );

    return (
        <Fragment>
            <div className="w-full mt-12">
                <div className="overflow-y-scroll max-h-screen px-20 pb-20 m-auto">
                    <div className="grid grid-cols-5 gap-3">
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