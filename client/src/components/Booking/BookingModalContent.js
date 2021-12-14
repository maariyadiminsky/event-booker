import React from 'react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

import FormWrapper from '../Form/FormWrapper';
import FormOptions from '../Form/FormOptions';

import Loader from '../Loader';

import { DEFAULT, BOOKINGS_NEED_EVENTS } from '../../const';

const BookingModalContent = ({ eventOptions = DEFAULT.NULL, formType = DEFAULT.STRING, errors = DEFAULT.NULL, handleOnSubmit = DEFAULT.NULL, handleCancelButton = DEFAULT.NULL }) => {
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
        <FormWrapper
            formType={formType}
            errors={errors}
            handleOnSubmit={handleOnSubmit}
            handleCancelButton={handleCancelButton}
        >
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
        </FormWrapper>
    );
}

BookingModalContent.propTypes = {
    eventOptions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            user: PropTypes.shape({
                _id: PropTypes.string.isRequired,
            }).isRequired,
        })
    ),
    errors: PropTypes.arrayOf(PropTypes.string),
    formType: PropTypes.string.isRequired,
    handleCancelButton: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
};

export default BookingModalContent;