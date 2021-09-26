import React from "react";
import { Form, Field } from "react-final-form";

import Loader from "../Loader";
import FormOptions from "../Form/FormOptions";
import FormErrors from "../Form/FormErrors";
import Modal from "../Modal/Modal";
import ModalActionsButtons from "../Modal/ModalActionButtons";

import { validateForm } from "../../utils/auth";
import { BOOKINGS_NEED_EVENTS } from "../../const";

import "../Form/Form.css";

const BookingModal = ({ eventOptions, formType, toggleModal, serverErrors, handleOnSubmit }) => {
    const renderServerErrors = () => serverErrors.length > 0 && (
        <FormErrors errors={serverErrors} />
    );

    const renderModalContent = () => {
        if (!eventOptions) {
            return <Loader height={0} />;
        }
        
        if (eventOptions && eventOptions.length === 0) {
            return (
                <div className="font-light">
                    ⚠ {BOOKINGS_NEED_EVENTS}
                </div>
            );
        }

        return (
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
                            <Field 
                                name="event" 
                                options={eventOptions} 
                            >
                                { ({ input, options }) => (
                                    <FormOptions
                                        name={input.name}
                                        options={options}
                                        onChange={(value) => input.onChange(value)}
                                        isBooking
                                    />
                                )}
                            </Field>
                            <ModalActionsButtons toggleModal={toggleModal} />
                        </form>
                    </div>
                )}
            </Form>
        );
    }

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

export default BookingModal;