import React, { useState } from "react";
import { Form, Field } from "react-final-form";

import FormInput from "../components/Form/FormInput";
import FormError from "../components/Form/FormError";

import Modal from "../components/Modal/Modal";

import { shouldStopEventPropagationTry } from "../utils";

import { 
    GRAPHQL_ENDPOINT,
    CREATE_EVENT_FORM 
} from "../const";

import eventBookerAPI from "../api/eventBookerAPI";
import { validateForm } from "../utils/auth";

const createEventMutation = (title, description, price) => `
    mutation {
        createEvent(eventInput: { title: "${title}", description: "${description}", price: ${price}}) {
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

const Events = () => {
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);

    const handleOnSubmit = async({ title, description, price}) => {
        console.log("Submitted!", title, description, price );

        try {
            const response = await eventBookerAPI.post(GRAPHQL_ENDPOINT, {
                query: createEventMutation(title, description, price)
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

            // close modal if no errors
            toggleModal();
            console.log("response", response);
            // const { data: { data: { createEvent: { title, user, date } }} } = response;

            // console.log("in events success", title, user, date);
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
                className="py-3 px-12 rounded-md text-lg text-white bg-purple-400 font-semibold hover:bg-green-400 transition duration-300">
                    Submit
            </button>
        </div>
    );

    const renderModalContent = () => (
        <Form 
            validate={(fields) => validateForm(fields, CREATE_EVENT_FORM)}
            onSubmit={handleOnSubmit}>
            {({ handleSubmit }) => (
                <div className="w-full max-w-lg mx-auto">
                    <form
                        onSubmit={handleSubmit} 
                        className="bg-white container rounded-lg px-8 pb-8 mt-3"
                    >
                        {renderServerErrors()}
                        <Field 
                            component={FormInput} 
                            name="title" 
                            type="text"
                            label="Title"
                            labelClass={"text-left font-semibold text-purple-400 text-xl font-light mb-2"} 
                            inputClass={"text-lg py-2 px-4 text-gray-600"}
                        />
                        <Field 
                            component={FormInput} 
                            name="description" 
                            type="text"
                            label="Description"
                            labelClass={"text-left font-semibold text-purple-400 text-xl font-light mb-2"} 
                            inputClass={"text-lg py-2 px-4 text-gray-600"}
                        />
                        <Field 
                            component={FormInput}
                            name="price" 
                            type="number" 
                            min="1" 
                            step="any"  
                            label="Price"
                            labelClass={"text-left font-semibold text-purple-400 text-xl font-light mb-2"} 
                            inputClass={"text-lg py-2 px-4 text-gray-600"}
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
            headerClass={"pb-3 text-center text-3xl text-purple-400 font-semibold"}
            hideSubmitButtons
        />
    );

    return (
        <div>
            <div className="w-full max-w-3xl mx-auto">
                <div 
                    className="bg-gradient-to-r from-green-400 to-green-300 hover:from-purple-400 hover:to-purple-300 container shadow-xl rounded px-8 py-8 mt-12 cursor-pointer"
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