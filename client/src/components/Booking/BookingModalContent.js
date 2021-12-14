import React from 'react';
import { Field } from 'react-final-form';

import FormWrapper from '../Form/FormWrapper';
import FormOptions from '../Form/FormOptions';

import { DEFAULT_PARAM } from '../../const';

const BookingModalContent = ({ eventOptions = DEFAULT_PARAM.NULL, formType = DEFAULT_PARAM.STRING, errors = DEFAULT_PARAM.NULL, handleOnSubmit = DEFAULT_PARAM.NULL, handleCancelButton = DEFAULT_PARAM.NULL }) => (
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