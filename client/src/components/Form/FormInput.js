import React from 'react';

import FormError from './FormError';

const FormInput = ({ 
    label, input, meta: { 
        touched, submitFailed, error 
    }, 
    labelClass = '', inputClass = ''
}) => {
    let hasBeenTouchedAndHasError = (touched || submitFailed) && error;

    const defaultLabelClass = labelClass ? labelClass : 'text-white text-2xl font-semibold mb-2';
    const defaultInputClass = inputClass ? inputClass : 'text-center text-green-600 text-2xl py-4 px-3';
    
    return (
        <div className={`mb-4 ${hasBeenTouchedAndHasError && 'error'}`}>
            <label className={`block ${defaultLabelClass}`}>{label}</label>
            <input 
                {...input}
                className={`bg-gray-100 shadow-md appearance-none border rounded w-full leading-tight focus:outline-none focus:shadow-outline ${defaultInputClass}`}
                autoComplete="off" 
            />
            {hasBeenTouchedAndHasError && <FormError error={error} />}
        </div>
    );
}

export default FormInput;