import React from 'react';
import { Field } from 'react-final-form';

import FormWrapper from '../Form/FormWrapper';
import FormOptions from '../Form/FormOptions';

const BookingModalContent = ({ 
    formType, errors, eventOptions, 
    handleOnSubmit, handleCancelButton,
}) => (
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

export default BookingModalContent;