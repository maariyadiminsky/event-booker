import React from 'react';

import FormWrapper from '../Form/FormWrapper';
import FormInput from '../Form/FormInput';
import { Field } from 'react-final-form';

import { getTodaysDate } from '../../utils/date';
import { CREATE_EVENT_FORM } from '../../const';

const todaysDate = getTodaysDate();

const EventModalContent = ({ errors, handleOnSubmit, handleCancelButton }) => (
    <FormWrapper
        formType={CREATE_EVENT_FORM}
        initialValues={{ date: todaysDate }}
        errors={errors}
        handleOnSubmit={handleOnSubmit}
        handleCancelButton={handleCancelButton}
    >
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
    </FormWrapper>
);

export default EventModalContent;