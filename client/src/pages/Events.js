import React, { useState, useEffect, useContext } from "react";
import { Form, Field } from "react-final-form";

import FormInput from "../components/Form/FormInput";
import FormError from "../components/Form/FormError";
import Modal from "../components/Modal/Modal";

import { AuthContext } from "../context/AuthContext";

import { eventBookerAPI } from "../api/eventBookerAPI";

import { validateForm } from "../utils/auth";
import { 
    isDateBeforeToday,
    getTodaysDate,
    getDateInCorrectFormat
} from "../utils/date";

import { 
    GRAPHQL_ENDPOINT,
    CREATE_EVENT_FORM 
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

const todaysDate = getTodaysDate();

const Events = () => {
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [shouldRenderSuccessEventMessage, setShouldRenderSuccessEventMessage] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);
    const [eventCreatedTitle, setEventCreatedTitle] = useState("");
    const [events, setEvents] = useState([]);

    const { token, userId } = useContext(AuthContext);

    useEffect(() => {
        if (!events || events.length === 0) {
            // user should be verified to hit endpoint
            if (!token || !userId) return;

            const fetchEvents = async() => {
                try {
                    const response = await eventBookerAPI(token).post(GRAPHQL_ENDPOINT, {
                        query: eventsQuery
                    });
    
                    // handle errors from the server
                    if (!response) {
                        throw new Error("Event retrieval failed with no response!");
                    } else if (response.data && response.data.errors && response.data.errors.length > 0) {
                        setServerErrors(response.data.errors);
                        return;
                    } else if (response.status !== 200 && response.status !== 201) {
                        throw new Error(`Event retrieval failed with server status code: ${response.status}.`);
                    }
    
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
                    }
                } catch(err) {
                    console.log(err);
                    throw err;
                }
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
    }

    const toggleModal = () => setShouldShowModal(!shouldShowModal);

    const renderServerErrors = () => {
        if (serverErrors.length > 0) {
            return serverErrors.map(({ message }, index) => <FormError key={index} error={message} />);
        }
    }

    const renderModalActionButtons = () => (
        <div className="flex flex-wrap justify-center items-center space-x-5 pt-5">
            <button 
                onClick={toggleModal} 
                className="py-3 px-12 text-lg text-white bg-gray-400 rounded-md hover:bg-gray-500 transition duration-300">
                    Nevermind
            </button>
            <button 
                type="submit"
                className="py-3 px-12 rounded-md text-lg text-white font-semibold bg-green-400 hover:bg-green-500 transition duration-300">
                    Submit
            </button>
        </div>
    );

    const renderModalContent = () => (
        <Form 
            initialValues={{ date: todaysDate }}
            validate={(fields) => validateForm(fields, CREATE_EVENT_FORM)}
            onSubmit={handleOnSubmit}>
            {({ handleSubmit }) => (
                <div className="w-full max-w-lg mx-auto">
                    <form
                        onSubmit={handleSubmit} 
                        className="bg-white container rounded-lg px-8 pb-4 mt-3"
                    >
                        {renderServerErrors()}
                        <Field 
                            component={FormInput} 
                            name="title" 
                            type="text"
                            label="Title"
                            labelClass={"text-left font-semibold text-green-400 text-xl font-light mb-2"} 
                            inputClass={"text-lg py-2 px-4 text-gray-600"}
                            required
                        />
                        <Field 
                            component={FormInput} 
                            name="description" 
                            type="text"
                            label="Description"
                            labelClass={"text-left font-semibold text-green-400 text-xl font-light mb-2"} 
                            inputClass={"text-lg py-2 px-4 text-gray-600"}
                            required
                        />
                        <Field 
                            component={FormInput} 
                            name="date" 
                            type="date"
                            label="Date"
                            step="any"
                            labelClass={"text-left font-semibold text-green-400 text-xl font-light mb-2"} 
                            inputClass={"text-lg py-2 px-4 text-gray-600"}
                            required
                        />
                        <Field 
                            component={FormInput}
                            name="price" 
                            type="number" 
                            min="1" 
                            step="any"  
                            label="Price"
                            labelClass={"text-left font-semibold text-green-400 text-xl font-light mb-2"} 
                            inputClass={"text-lg py-2 px-4 text-gray-600"}
                            required
                        />
                        {renderModalActionButtons()}
                    </form>
                </div>
            )}
        </Form>
    );

    const renderModal = () => !shouldRenderSuccessEventMessage && shouldShowModal && (
        <Modal 
            header="Create an Event"
            content={renderModalContent()}
            handleCancelModal={toggleModal}
            headerClass={"pb-3 text-center text-3xl text-green-400 font-semibold"}
            hideSubmitButtons
        />
    );

    // todo: create reusable alert component
    const renderEventCreatedConfirmation = () => shouldRenderSuccessEventMessage && (
        <div 
            className="bg-green-100 border-t-4 max-w-2xl m-auto border-green-500 rounded-b-lg text-green-900 px-4 py-3 shadow-md" 
            role="alert"
        >
            <div className="flex">
                <div className="py-1">
                    <svg 
                        className="fill-current h-6 w-6 text-teal-500 mr-4" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                    </svg>
                </div>
                <div>
                    <p className="font-semibold">Success!</p>
                    <p className="text-sm font-light">The Event <span className="font-semibold">{`${eventCreatedTitle}`}</span> has been created!</p>
                </div>
            </div>
        </div>
    );

    const renderEvents = () => events && (
        events.map(({ title, description, price, date }, index) => {
            return (
                <div 
                    key={index}
                    className="container cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 rounded-lg px-8 py-10 mt-6 border-2 border-green-400 group bg-gradient-to-r hover:from-green-400 hover:to-green-300">
                    <div className="flex flex-wrap justify-between">
                        <div>
                            <div className="font-bold text-blue-400 group-hover:text-indigo-500">{getDateInCorrectFormat(date)}</div>
                            <div className="mb-2 text-3xl font-semibold text-green-400 group-hover:text-white">{title}</div>
                            <div className="text-2xl font-thin text-gray-600 group-hover:text-white">{description}</div>
                        </div>
                        <div>
                        <div className="static">
                            <div className="absolute top-5 right-5 text-center align-center text-3xl font-semibold bg-yellow-300 rounded-md text-gray-600 group-hover:text-gray-700 px-2 py-1">
                                {`$${price}`}
                            </div>
                        </div>
                        </div>
                    </div>
                    {isDateBeforeToday(date) && (
                        <div className="bg-red-500 text-gray-100 rounded p-2 mt-5 w-20 text-center opacity-70 border-2 border-red-500 text-xs">Expired</div>
                    )}
                </div>
            )
        })
    );

    return (
        <div>
            <div className="w-full max-w-3xl mx-auto">
                <div 
                    className={`${!shouldRenderSuccessEventMessage && !shouldShowModal && "animate-float"} max-w-2xl bg-gradient-to-r from-green-400 to-green-300 hover:from-green-400 hover:to-green-500 container shadow-lg rounded px-8 py-8 mt-12 cursor-pointer`}
                    onClick={toggleModal}
                >
                    <div className="flex flex-wrap justify-center items-center text-center">
                        <div className="text-white my-auto text-center text-xl font-semibold">
                            <span className="text-2xl">+ </span>Create an Event
                        </div>
                    </div>
                </div>
                {renderEventCreatedConfirmation()}
                <div className="overflow-y-scroll max-h-screen px-20 pb-20 max-w-3xl m-auto">{renderEvents()}</div>
            </div>
            <div>{renderModal()}</div>
        </div>
    );
}

export default Events;