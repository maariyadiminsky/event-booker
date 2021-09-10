import React from "react";

const FormInput = ({ label, input, meta: { touched, submitFailed, error }}) => {
    const renderInputError = (error) => (<div className="mt-2 text-red-500 text-md italic">{error}</div>);

    let hasBeenTouchedAndHasError = (touched || submitFailed) && error;

    return (
        <div className={`field mb-6 ${hasBeenTouchedAndHasError && "error"}`}>
            <label className="block text-white text-2xl font-semibold mb-2">{label}</label>
            <input 
                type={input.name}
                className="bg-gray-100 shadow-md text-green-600 appearance-none text-center text-2xl border rounded w-full py-4 px-3 leading-tight focus:outline-none focus:shadow-outline" {...input} 
                autoComplete="off" 
            />
            {hasBeenTouchedAndHasError && renderInputError(error)}
        </div>
    );
}

export default FormInput;