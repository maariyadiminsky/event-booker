import React, { Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import { render } from '@modules/app/setupTests';

import FormInput from '@modules/common/form/FormInput';

// I chose to test it in the same way it will be used
// testing FormInput by itself by manually adding props 
// wouldn't match how it's currently being used within the app.
const wrapper = (children, handleOnSubmit) => (
    <Form onSubmit={handleOnSubmit}>
        {() => (
            <div>
                <form>
                    {children}
                </form>
            </div>
        )}
    </Form>
);
describe('<FormInput />', () => {
    let handleOnSubmit;
    let children;

    beforeAll(() => {
        handleOnSubmit = jest.fn();
        children = (
            <Fragment>
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
            </Fragment>
        );
    });

    it('renders component', () => {
        const { getByLabelText } = render(
            wrapper(children, handleOnSubmit)
        );

        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });
});