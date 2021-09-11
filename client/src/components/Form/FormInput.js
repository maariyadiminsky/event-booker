import React from "react";

import FormError from "./FormError";

const FormInput = ({ label, input, meta: { touched, submitFailed, error }}) => {
    let hasBeenTouchedAndHasError = (touched || submitFailed) && error;

    return (
        <div className={`field mb-6 ${hasBeenTouchedAndHasError && "error"}`}>
            <label className="block text-white text-2xl font-semibold mb-2">{label}</label>
            <input 
                type={input.name}
                className="bg-gray-100 shadow-md text-green-600 appearance-none text-center text-2xl border rounded w-full py-4 px-3 leading-tight focus:outline-none focus:shadow-outline" {...input} 
                autoComplete="off" 
            />
            {hasBeenTouchedAndHasError && <FormError error={error} />}
        </div>
    );
}

export default FormInput;