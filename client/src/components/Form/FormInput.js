import React from 'react';

import { DEFAULT } from '../../const';

import FormError from './FormError';

const defaultLabelClass = (labelClass = DEFAULT.STRING) => labelClass ? labelClass : 'text-white text-2xl font-semibold mb-2';
const defaultInputClass = (inputClass = DEFAULT.STRING) => inputClass ? inputClass : 'text-center text-green-600 text-2xl py-4 px-3';

const FormInput = ({ 
    label = DEFAULT.STRING, input = DEFAULT.NULL, meta: { 
        touched = DEFAULT.BOOL_FALSE, submitFailed = DEFAULT.BOOL_TRUE, error = DEFAULT.STRING
    }, labelClass = DEFAULT.STRING, inputClass = DEFAULT.STRING
}) => {
    let hasBeenTouchedAndHasError = (touched || submitFailed) && error;
    
    return (
        <div className={`mb-4 ${hasBeenTouchedAndHasError && 'error'}`}>
            <label className={`block ${defaultLabelClass(labelClass)}`}>{label}</label>
            <input 
                {...input}
                className={`bg-gray-100 shadow-md appearance-none border rounded w-full leading-tight focus:outline-none focus:shadow-outline ${defaultInputClass(inputClass)}`}
                autoComplete="off" 
            />
            {hasBeenTouchedAndHasError && <FormError error={error} />}
        </div>
    );
}

export default FormInput;