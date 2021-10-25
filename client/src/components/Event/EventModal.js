import React from "react";

import { Form, Field } from "react-final-form";

import FormInput from "../Form/FormInput";
import FormErrors from "../Form/FormErrors";
import Modal from "../Modal/Modal";
import ModalActionsButtons from "../Modal/ModalActionButtons";

import { validateForm } from "../../utils/auth";
import { getTodaysDate } from "../../utils/date";

import { CREATE_EVENT_FORM } from "../../const";

import "../Form/Form.css";

const todaysDate = getTodaysDate();
const EventModal = ({ toggleModal, errors, handleOnSubmit }) => {
    const renderErrors = () => errors.length > 0 && (
        <FormErrors errors={errors} />
    );

    const renderModalContent = () => (
        <Form 
            initialValues={{ date: todaysDate }}
            validate={(fields) => validateForm(fields, CREATE_EVENT_FORM)}
            onSubmit={handleOnSubmit}>
            {({ handleSubmit }) => (
                <div className="form-wrapper">
                    <form
                        onSubmit={handleSubmit} 
                        className="form-container"
                    >
                        {renderErrors()}
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
            header="Create an Event"
            content={renderModalContent()}
            handleCancelModal={toggleModal}
            headerClass="form-header"
            hideSubmitButtons
        />
    );
}

export default EventModal;