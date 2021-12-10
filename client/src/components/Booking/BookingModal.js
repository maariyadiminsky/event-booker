import React from 'react';
import { Form, Field } from 'react-final-form';

import Loader from '../Loader';
import FormOptions from '../Form/FormOptions';
import FormErrors from '../Form/FormErrors';
import Modal from '../Modal/Modal';
import ButtonTwoGroup from '../Button/ButtonTwoGroup';

import { validateForm } from '../../utils/auth';
import { BOOKINGS_NEED_EVENTS } from '../../const';

import '../Form/Form.css';

const BookingModal = ({ eventOptions, formType, toggleModal, errors, handleOnSubmit }) => {
    const renderErrors = () => errors.length > 0 && (
        <FormErrors errors={errors} />
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
                            {renderErrors()}
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
                            <ButtonTwoGroup
                                defaultClass='text-white font-semibold bg-green-400 hover:bg-green-500 transition duration-300'
                                handleCancel={toggleModal}
                            />
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