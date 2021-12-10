import React, { useState, useContext } from 'react';
import { Form, Field } from 'react-final-form';

import { AuthContext } from '../context/AuthContext';

import FormInput from '../components/Form/FormInput';
import FormError from '../components/Form/FormError';

import { eventBookerAPI } from '../api/eventBookerAPI';
import { validateForm } from '../utils/auth';

import { 
    SIGN_IN,
    SIGN_UP,
    SWITCH_SIGN_UP_TEXT,
    SWITCH_SIGN_IN_TEXT,
    SIGN_IN_FORM,
    SIGN_UP_FORM,
    GRAPHQL_ENDPOINT
} from '../const';

const signUpMutation = (email, password) => `
    mutation {
        createUser(userInput: { email: "${email}", password: "${password}" }) {
            _id
            email
        }
    }
`;

const signInQuery = (email, password) => `
    query {
        signIn(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
        }
    }
`;

const Auth = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [serverErrors, setServerErrors] = useState([]);
    const [hasCreatedNewUser, setHasCreatedNewUser] = useState(false);

    const { signInUser } = useContext(AuthContext);

    const handleOnSubmit = async({ email, password }, formType) => {
        try {
            const response = await eventBookerAPI().post(GRAPHQL_ENDPOINT, {
                query: isSignInForm ? signInQuery(email, password) : signUpMutation(email, password)
            });

            // handle errors from the server
            if (!response) {
                throw new Error(`${formType} failed! Response returned empty.`);
            } else if (response.data && response.data.errors && response.data.errors.length > 0) {
                setServerErrors(response.data.errors);
                return;
            } else if (response.status !== 200 && response.status !== 201) {
                throw new Error(`${formType} failed! Check your network connection.`);
            }

            if (isSignInForm) {
                const { data: { data: { signIn: { userId, token, tokenExpiration} }} } = response;

                signInUser(userId, token, tokenExpiration);
            } else {
                const { data: { data : { createUser: { _id }}}} = response;

                if (_id) {
                    setHasCreatedNewUser(true);
                    setIsSignInForm(true);
                } else {
                    throw new Error(`${formType} failed! User not created! Please try again.`);
                }
            }
        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    const toggleAuthForm = () => setIsSignInForm(!isSignInForm);

    const findFormType = () => isSignInForm ? SIGN_IN_FORM : SIGN_UP_FORM;
    
    const renderText = () => isSignInForm ? SIGN_IN : SIGN_UP;

    const renderSecondButtonText = () => isSignInForm ? SWITCH_SIGN_UP_TEXT : SWITCH_SIGN_IN_TEXT;

    const renderTopText = () => {
        if (hasCreatedNewUser) {
            return (
                <div>
                    <p className="lh-10">🎉</p>
                    <p className="font-bold">Account successfully created!</p>
                    <p>Please sign in to continue.</p>
                </div>
            );
        } 

        return 'Please sign in or create an account.';
    }

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
            {({ handleSubmit, form }) => (
                <div className="w-full max-w-lg mx-auto">
                    <form
                        onSubmit={async(event) => {
                            await handleSubmit(event);
                            form.reset();
                        }} 
                        className="bg-gradient-to-r from-green-400 to-green-300 container shadow-xl rounded px-8 pb-8 mt-12"
                    >
                        <div className="pt-12 pb-3 text-center text-3xl text-white font-semibold">{renderText()}</div>
                        <div className="text-center pt-1 pb-6 font-light text-lg text-white">{renderTopText()}</div>
                        {renderServerErrors()}
                        <Field 
                            name="email" 
                            type="email"
                            component={FormInput} 
                            label="Email"
                        />
                        <Field 
                            name="password" 
                            type="password"
                            component={FormInput} 
                            label="Password" 
                        />
                        <div className="flex flex-wrap justify-center items-center mt-9 mb-3 gap-3 mx-auto">
                            <button 
                                className="animate-float shadow-2xl align-baseline bg-white text-center text-green-400 text-xl py-4 px-24 rounded-md focus:outline-none focus:shadow-outline"
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