import React from "react";
import { Form, Field } from "react-final-form";

import FormInput from "../components/Form/FormInput";
import { validateForm } from "../utils/auth";

import { 
    SIGN_IN,
    SIGN_IN_FORM
} from "../const";

const Auth = () => {
    const handleOnSubmit = (formValues) => {
        console.log("Submitted!", formValues);
    }

    return (
        <Form 
            validate={(fields) => validateForm(fields, SIGN_IN_FORM)}
            onSubmit={handleOnSubmit}
            className="error"
        >
        {({ handleSubmit }) => (
            <div className="w-full max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="error bg-green-400 container shadow-xl rounded px-8 pb-8 mt-12">
                    <div className="pt-12 pb-6 text-center text-3xl text-white font-semibold">{SIGN_IN}</div>
                    <Field name="email" component={FormInput} label="Email"/>
                    <Field name="password" component={FormInput} label="Password" />
                    <div className="flex flex-wrap justify-center items-center mt-9 mb-3 gap-3 mx-auto">
                        <button 
                            className="animate-float shadow-lg align-baseline bg-white text-center text-green-400 text-xl py-4 px-24 rounded-md focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                        <button 
                            type="button"
                            className="text-center align-center font-light text-lg text-white hover:text-gray-100"
                        >
                            Don't have an account yet?
                        </button>
                    </div>
                </form>
            </div>
        )}
    </Form>
    );
}

export default Auth;