import React, { Fragment, useState, useContext } from 'react';
import { Field } from 'react-final-form';
import { useQuery, useMutation } from '@apollo/client';

import { AuthContext } from '../../context/AuthContext';

import NotificationAlt from '../../components/Notification/NotificationAlt';
import FormWrapper from '../../components/Form/FormWrapper';
import FormInput from '../../components/Form/FormInput';

import { CREATE_USER_MUTATION, SIGN_IN_QUERY } from './queries';
import { handleErrors } from '../../utils/auth';

import { 
    SIGN_IN,
    SIGN_UP,
    SWITCH_SIGN_UP_TEXT,
    SWITCH_SIGN_IN_TEXT,
    SIGN_IN_FORM,
    SIGN_UP_FORM
} from '../../const';

const Auth = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [serverErrors, setServerErrors] = useState([]);
    const [hasCreatedNewUser, setHasCreatedNewUser] = useState(false);

    const { signInUser } = useContext(AuthContext);

    const [createUser] = useMutation(CREATE_USER_MUTATION);
    const signIn = useQuery(SIGN_IN_QUERY, { skip: true });

    const handleOnSubmit = async({ email, password }) => {
        try {
            const formType = findFormType();
            const variables = { email, password };
            const response = isSignInForm ? await signIn.refetch({ email, password }) : await createUser({ variables });

            handleErrors(response, setServerErrors, null, !isSignInForm);

            if (isSignInForm) {
                const { data: { signIn: { userId, token, tokenExpiration} } } = response;

                signInUser(userId, token, tokenExpiration);
            } else {
                const { data: { createUser: { _id } } } = response;

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

    const renderSecondButtonText = () => isSignInForm ? SWITCH_SIGN_UP_TEXT : SWITCH_SIGN_IN_TEXT;

    const renderText = () => isSignInForm ? SIGN_IN : SIGN_UP;

    const renderTopText = () => {
        if (hasCreatedNewUser) {
            return (
                <NotificationAlt 
                    icon='🎉'
                    topText='Account successfully created!'
                    bottomText='Please sign in to continue.'
                />
            );
        } 

        return 'Please sign in or create an account.';
    }

    const renderTopContent = () => (
        <Fragment>
            <div className="pt-12 pb-3 text-center text-3xl text-white font-semibold">{renderText()}</div>
            <div className="text-center pt-1 pb-6 font-light text-lg text-white">{renderTopText()}</div>
        </Fragment>
    );

    return (
        <FormWrapper
            formCSS='w-full max-w-lg mx-auto bg-gradient-to-r from-green-400 to-green-300 container shadow-xl rounded px-8 pb-8 mt-12'
            formContainerCSS=''
            errors={serverErrors}
            handleOnSubmit={handleOnSubmit}
            formType={findFormType()}
            topContent={renderTopContent()}
            shouldResetOnSubmit
        >
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
        </FormWrapper>
    );
}

export default Auth;