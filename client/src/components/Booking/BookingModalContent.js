import React from 'react';
import { Field } from 'react-final-form';

import FormWrapper from '../Form/FormWrapper';
import FormOptions from '../Form/FormOptions';

import { DEFAULT } from '../../const';

const BookingModalContent = ({ eventOptions = DEFAULT.NULL, formType = DEFAULT.STRING, errors = DEFAULT.NULL, handleOnSubmit = DEFAULT.NULL, handleCancelButton = DEFAULT.NULL }) => (
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