import React from 'react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

import FormWrapper from '@modules/common/form/FormWrapper';
import FormOptions from '@modules/common/form/FormOptions';

import Loader from '@modules/common/Loader';

import { DEFAULT, BOOKINGS_NEED_EVENTS } from '@modules/common/const';

export const noEventsExistText = () => `⚠ ${BOOKINGS_NEED_EVENTS}`;
const BookingModalContent = ({ eventOptions = DEFAULT.NULL, formType = DEFAULT.STRING, errors = DEFAULT.NULL, handleOnSubmit = DEFAULT.FUNCTION, handleCancelButton = DEFAULT.FUNCTION }) => {
    
    if (!eventOptions) {
        return <Loader height={0} />;
    }
    
    if (eventOptions && eventOptions.length === 0) {
        return (
            <div className="font-light">
                {noEventsExistText()}
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
    errors: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string
        })
    ),
    formType: PropTypes.string.isRequired,
    handleCancelButton: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
};

export default BookingModalContent;