import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT } from '@modules/common/const';

import FormError from '@modules/common/form/FormError';

const defaultLabelClass = (labelClass = DEFAULT.STRING) => labelClass ? labelClass : 'text-white text-2xl font-semibold mb-2';
const defaultInputClass = (inputClass = DEFAULT.STRING) => inputClass ? inputClass : 'text-center text-green-600 text-2xl py-4 px-3';

const FormInput = ({ 
    label = DEFAULT.STRING, input = DEFAULT.UNDEFINED, labelClass = DEFAULT.STRING, inputClass = DEFAULT.STRING, meta: { 
        touched = DEFAULT.BOOL_FALSE, submitFailed = DEFAULT.BOOL_TRUE, error = DEFAULT.STRING
    },
}) => {
    let hasBeenTouchedAndHasError = (touched || submitFailed) && error;
    
    return (
        <div className={`mb-4 ${hasBeenTouchedAndHasError && 'error'}`}>
            <label htmlFor={input.name} className={`block ${defaultLabelClass(labelClass)}`}>{label}</label>
            <input 
                {...input}
                id={input.name}
                className={`bg-gray-100 shadow-md appearance-none border rounded w-full leading-tight focus:outline-none focus:shadow-outline ${defaultInputClass(inputClass)}`}
                autoComplete="off" 
            />
            {hasBeenTouchedAndHasError && <FormError error={error} />}
        </div>
    );
}

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    input: PropTypes.objectOf(PropTypes.any),
    labelClass: PropTypes.string,
    inputClass: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool.isRequired,
        submitFailed: PropTypes.bool.isRequired,
        error: PropTypes.string,
    }),
};

export default FormInput;