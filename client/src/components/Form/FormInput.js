import React from 'react';

import { DEFAULT_PARAM } from '../../const';

import FormError from './FormError';

const defaultLabelClass = (labelClass = DEFAULT_PARAM.STRING) => labelClass ? labelClass : 'text-white text-2xl font-semibold mb-2';
const defaultInputClass = (inputClass = DEFAULT_PARAM.STRING) => inputClass ? inputClass : 'text-center text-green-600 text-2xl py-4 px-3';

const FormInput = ({ 
    label = DEFAULT_PARAM.STRING, input = DEFAULT_PARAM.NULL, meta: { 
        touched = DEFAULT_PARAM.BOOL_FALSE, submitFailed = DEFAULT_PARAM.BOOL_TRUE, error = DEFAULT_PARAM.STRING
    }, labelClass = DEFAULT_PARAM.STRING, inputClass = DEFAULT_PARAM.STRING
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