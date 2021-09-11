import React, { useState } from "react";
import { Form, Field } from "react-final-form";

import FormInput from "../components/Form/FormInput";
import FormError from "../components/Form/FormError";

import eventBookerAPI from "../api/eventBookerAPI";
import { validateForm } from "../utils/auth";

import { 
    SIGN_IN,
    SIGN_UP,
    SWITCH_SIGN_UP_TEXT,
    SWITCH_SIGN_IN_TEXT,
    SIGN_IN_FORM,
    SIGN_UP_FORM,
    GRAPHQL_ENDPOINT
} from "../const";

const signUpMutation = (email, password) => `
    mutation {
        createUser(userInput: { email: "${email}", password: "${password}" }) {
            email
        }
    }
`;

const signUpMutationVariables = (email, password) => ({
    email,
    password
});

const Auth = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [serverErrors, setServerErrors] = useState([]);

    const handleOnSubmit = async({ email, password }, formType) => {
        console.log("Submitted!", email, password, formType);

        try {
            if (isSignInForm) {

            } else {
                const response = await eventBookerAPI.post(GRAPHQL_ENDPOINT, {
                    query: signUpMutation(email, password)
                });

                // set errors if there are any from the servers
                if (response.data && response.data.errors && response.data.errors.length > 0) {
                    setServerErrors(response.data.errors);
                }
            }
        } catch(err) {
            console.log(`ERROR: ${err}`);
            throw err;
        }
    }

    const toggleAuthForm = () => setIsSignInForm(!isSignInForm);

    const findFormType = () => isSignInForm ? SIGN_IN_FORM : SIGN_UP_FORM;
    
    const renderText = () => isSignInForm ? SIGN_IN : SIGN_UP;

    const renderSecondButtonText = () => isSignInForm ? SWITCH_SIGN_UP_TEXT : SWITCH_SIGN_IN_TEXT;

    const renderServerErrors = () => {
        if (serverErrors.length > 0) {
            return serverErrors.map(({ message }) => <FormError error={message} />);
        }
    }

    return (
        <Form 
            validate={(fields) => validateForm(fields, findFormType())}
            onSubmit={(formValues) => handleOnSubmit(formValues, findFormType())}
        >
        {({ handleSubmit }) => (
            <div className="w-full max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="bg-green-400 container shadow-xl rounded px-8 pb-8 mt-12">
                    <div className="pt-12 pb-6 text-center text-3xl text-white font-semibold">{renderText()}</div>
                    {renderServerErrors()}
                    <Field name="email" component={FormInput} label="Email"/>
                    <Field name="password" component={FormInput} label="Password" />
                    <div className="flex flex-wrap justify-center items-center mt-9 mb-3 gap-3 mx-auto">
                        <button 
                            className="animate-float shadow-lg align-baseline bg-white text-center text-green-400 text-xl py-4 px-24 rounded-md focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {renderText()}
                        </button>
                        <button 
                            type="button"
                            className="text-center align-center font-light text-lg text-white hover:text-gray-100"
                            onClick={toggleAuthForm}
                        >
                            {renderSecondButtonText()}
                        </button>
                    </div>
                </form>
            </div>
        )}
    </Form>
    );
}

export default Auth;