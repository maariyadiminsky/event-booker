import React, { useState } from "react";
import { Form, Field } from "react-final-form";

import FormInput from "../components/Form/FormInput";
import FormError from "../components/Form/FormError";

import Modal from "../components/Modal/Modal";

import { getTodaysDate } from "../utils/date";

import { 
    GRAPHQL_ENDPOINT,
    CREATE_EVENT_FORM 
} from "../const";

import eventBookerAPI from "../api/eventBookerAPI";
import { validateForm } from "../utils/auth";

const createEventMutation = (title, description, price, date) => `
    mutation {
        createEvent(eventInput: { title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
            _id
            title
            date
            user {
                _id
                email
            }
        }
    }
`;

const todaysDate = getTodaysDate();

const Events = () => {
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);

    const handleOnSubmit = async({ title, description, price, date }) => {
        console.log("Submitted!", title, description, price, date);

        try {
            const response = await eventBookerAPI.post(GRAPHQL_ENDPOINT, {
                query: createEventMutation(title, description, price, date)
            });

            // handle errors from the server
            if (!response) {
                throw new Error(`${CREATE_EVENT_FORM} failed! Response returned empty.`);
            } else if (response.data && response.data.errors && response.data.errors.length > 0) {
                setServerErrors(response.data.errors);
                return;
            } else if (response.status !== 200 && response.status !== 201) {
                throw new Error(`${CREATE_EVENT_FORM} failed! Check your network connection.`);
            }

            const { data: { data : { createEvent: { _id }}}} = response;

            if (_id) {
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
            return serverErrors.map(({ message }) => <FormError error={message} />);
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

    console.log("yo", todaysDate); 

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

    const renderModal = () => shouldShowModal && (
        <Modal 
            header="Create an Event"
            content={renderModalContent()}
            handleCancelModal={toggleModal}
            headerClass={"pb-3 text-center text-3xl text-green-400 font-semibold"}
            hideSubmitButtons
        />
    );

    return (
        <div>
            <div className="w-full max-w-3xl mx-auto">
                <div 
                    className={`${!shouldShowModal && "animate-float"} bg-gradient-to-r from-green-400 to-green-300 hover:from-green-400 hover:to-green-500 container shadow-lg rounded px-8 py-8 mt-12 cursor-pointer`}
                    onClick={toggleModal}
                >
                    <div className="flex flex-wrap justify-center items-center text-center">
                        <div className="text-white my-auto text-center text-xl font-semibold">
                            <span className="text-2xl">+ </span>Create an Event
                        </div>
                    </div>
                </div>
                <div className="container shadow-xl rounded px-8 py-10 mt-6 border-2 border-green-400">
                    An event
                </div>
            </div>
            <div>{renderModal()}</div>
        </div>
    );
}

export default Events;