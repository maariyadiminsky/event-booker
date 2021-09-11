import React, { useState } from "react";
import { Form, Field } from "react-final-form";

import FormInput from "../components/Form/FormInput";
import FormError from "../components/Form/FormError";

import Modal from "../components/Modal/Modal";

import { 
    GRAPHQL_ENDPOINT,
    CREATE_EVENT_FORM 
} from "../const";

import eventBookerAPI from "../api/eventBookerAPI";
import { validateForm } from "../utils/auth";

const createEventMutation = (title, description, price) => `
    mutation {
        createEvent(eventInput: { title: "${title}", description: "${description}", price: "${price}"}) {
            _id
            title
            user
            date
        }
    }
`;

const Events = () => {
    const [shouldShouldModal, setShouldShowModal] = useState(true);
    const [serverErrors, setServerErrors] = useState([]);

    const handleOnSubmit = async({ title, description, price }) => {
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

            const { data: { data: { signIn: { userId, token, tokenExpiration} }} } = response;
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    const renderServerErrors = () => {
        if (serverErrors.length > 0) {
            return serverErrors.map(({ message }) => <FormError error={message} />);
        }
    }

    const renderModalContent = () => (
        <Form 
            validate={(fields) => validateForm(fields, CREATE_EVENT_FORM)}
            onSubmit={(formValues) => handleOnSubmit(formValues, CREATE_EVENT_FORM)}
        >
            {({ handleSubmit, form }) => (
                <div className="w-full max-w-lg mx-auto">
                    <form
                        onSubmit={async(event) => {
                            await handleSubmit(event);
                            form.reset();
                        }} 
                        className="bg-gradient-to-r from-green-400 to-green-300 container shadow-xl rounded px-8 pb-8 mt-12"
                    >
                        {renderServerErrors()}
                        <Field name="text" labelClass={"test"} component={FormInput} label="Title"/>
                        <Field name="text" component={FormInput} label="Description"/>
                        <Field name="number" type="number" min="1" step="any" component={FormInput} label="Price"/>
                    </form>
                </div>
            )}
        </Form>
    );

    const renderModal = () => shouldShouldModal && (
        <Modal 
            header="Create an Event"
            content={renderModalContent()}
            cancelButtonText="Nevermind"
            confirmButtonText="Yes, I'm sure"
            handleConfirm={handleOnSubmit}
        />
    );

    return (
        <div>
            <div className="w-full max-w-3xl mx-auto">
                <div className="bg-gradient-to-r from-green-400 to-green-300 container shadow-xl rounded px-8 py-8 mt-12">
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