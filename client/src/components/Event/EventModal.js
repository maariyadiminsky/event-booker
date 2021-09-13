import React from "react";

import { Form, Field } from "react-final-form";

import FormInput from "../Form/FormInput";
import FormError from "../Form/FormError";
import Modal from "../Modal/Modal";

import { validateForm } from "../../utils/auth";
import { getTodaysDate } from "../../utils/date";

import { CREATE_EVENT_FORM } from "../../const";

import "./EventModal.css";

const todaysDate = getTodaysDate();
const EventModal = ({ toggleModal, serverErrors, handleOnSubmit }) => {
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
                            labelClass="field-label" 
                            inputClass="field-input"
                            required
                        />
                        <Field 
                            component={FormInput} 
                            name="description" 
                            type="text"
                            label="Description"
                            labelClass="field-label" 
                            inputClass="field-input"
                            required
                        />
                        <Field 
                            component={FormInput} 
                            name="date" 
                            type="date"
                            label="Date"
                            step="any"
                            labelClass="field-label" 
                            inputClass="field-input"
                            required
                        />
                        <Field 
                            component={FormInput}
                            name="price" 
                            type="number" 
                            min="1" 
                            step="any"  
                            label="Price"
                            labelClass="field-label"
                            inputClass="field-input"
                            required
                        />
                        {renderModalActionButtons()}
                    </form>
                </div>
            )}
        </Form>
    );

    return (
        <Modal 
            header="Create an Event"
            content={renderModalContent()}
            handleCancelModal={toggleModal}
            headerClass={"pb-3 text-center text-3xl text-green-400 font-semibold"}
            hideSubmitButtons
        />
    );
}

export default EventModal;