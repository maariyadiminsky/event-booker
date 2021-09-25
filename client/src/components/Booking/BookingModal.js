import React from "react";

import { Form, Field } from "react-final-form";

import FormInput from "../Form/FormInput";
import FormOptions from "../Form/FormOptions";
import FormErrors from "../Form/FormErrors";
import Modal from "../Modal/Modal";
import ModalActionsButtons from "../Modal/ModalActionButtons";

import { validateForm } from "../../utils/auth";

import "../Form/Form.css";

const Booking = ({ formType, eventOptions, toggleModal, serverErrors, handleOnSubmit }) => {
    const renderServerErrors = () => serverErrors.length > 0 && (
        <FormErrors errors={serverErrors} />
    );

    const renderEventOptions = () => eventOptions && (
        <Field name="events" options={eventOptions} >
            { ({ input, options }) => (
                <FormOptions
                    name={input.name}
                    options={options}
                    onChange={(value) => input.onChange(value)}
                />
            )}
        </Field>
    );

    const renderModalContent = () => (
        <Form 
            validate={(fields) => validateForm(fields, formType)}
            onSubmit={handleOnSubmit}>
            {({ handleSubmit }) => (
                <div className="form-wrapper">
                    <form
                        onSubmit={handleSubmit} 
                        className="form-container"
                    >
                        {renderServerErrors()}
                        {renderEventOptions()}
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
                        <ModalActionsButtons toggleModal={toggleModal} />
                    </form>
                </div>
            )}
        </Form>
    );

    return (
        <Modal 
            header="Book an Event"
            content={renderModalContent()}
            handleCancelModal={toggleModal}
            headerClass="form-header"
            hideSubmitButtons
        />
    );
}

export default Booking;