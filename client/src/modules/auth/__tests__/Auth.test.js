import { render, waitFor } from '@modules/app/setupTests';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import Auth from '@modules/auth/Auth';
import mocks, { email, password } from '@modules/auth/mocks';
import * as AuthUtils from '@modules/common/utils/auth';
import { 
    MOCK,
    SIGN_IN,
    SIGN_UP,
    SWITCH_SIGN_UP_TEXT,
    SWITCH_SIGN_IN_TEXT,
    ACCOUNT_CREATED_MESSAGE
} from '@modules/common/const';

describe('<Auth />', () => {
    it('renders sign in form initially', () => {
        const { getByRole, getByLabelText } = render(
            <MockedProvider>
                <Auth />
            </MockedProvider>
        );

        const signInButton = getByRole('button', { name: SIGN_IN });
        const switchFormButton = getByRole('button', { name: SWITCH_SIGN_UP_TEXT });
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');

        expect(signInButton).toBeInTheDocument();
        expect(switchFormButton).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    it('switches to sign up form when clicked button', () => {
        const { queryAllByText, getByRole } = render(
            <MockedProvider>
                <Auth />
            </MockedProvider>
        );

        const signInButton = getByRole('button', { name: SIGN_IN });
        const switchFormButton = getByRole('button', { name: SWITCH_SIGN_UP_TEXT });

        expect(signInButton).toBeInTheDocument();
        expect(switchFormButton).toBeInTheDocument();

        userEvent.click(switchFormButton);

        const signInButtonAndHeader = queryAllByText(SIGN_IN);
        const signUpButton = getByRole('button', { name: SIGN_UP });
        const newSwitchFormButton = getByRole('button', { name: SWITCH_SIGN_IN_TEXT });

        expect(signInButtonAndHeader.length).toBe(0);
        expect(signUpButton).toBeInTheDocument();
        expect(newSwitchFormButton).toBeInTheDocument();
    });

    it('displays client errors in form when username and/or password is not provided', async() => {
        const { findByRole, findByText } = render(
            <MockedProvider mocks={mocks(MOCK.QUERY_TYPE.CREATE_USER_MUTATION)} addTypename={false}>
                <Auth />
            </MockedProvider>
        );

        const signInButton = await findByRole('button', { name: SIGN_IN });

        expect(signInButton).toBeInTheDocument();

        userEvent.click(signInButton);

        const { VALIDATION_ERRORS: { EMAIL, PASSWORD }} = AuthUtils;
        const emailClientError = await findByText(EMAIL);
        const passwordClientError = await findByText(PASSWORD);

        expect(emailClientError).toBeInTheDocument();
        expect(passwordClientError).toBeInTheDocument();
    });

    it('user can sign into their account', async() => {
        const { findByRole, findByLabelText } = render(
            <MockedProvider mocks={mocks(MOCK.QUERY_TYPE.SIGN_IN_QUERY)} addTypename={false}>
                <Auth />
            </MockedProvider>
        );

        jest.spyOn(AuthUtils, 'handleErrors');
        const { handleErrors } = AuthUtils;

        const emailInput = await findByLabelText('Email');
        const passwordInput = await findByLabelText('Password');
        const signInButton = await findByRole('button', { name: SIGN_IN });

        expect(signInButton).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        userEvent.type(emailInput, email);
        expect(emailInput.value).toBe(email);

        userEvent.type(passwordInput, password);
        expect(passwordInput.value).toBe(password);

        userEvent.click(signInButton);

        await waitFor(() => {
            expect(handleErrors).toHaveBeenCalledTimes(1);
        });
    });

    it('user can create a new account', async() => {
        const { findByRole, findByText, findByLabelText, getByRole } = render(
            <MockedProvider mocks={mocks(MOCK.QUERY_TYPE.CREATE_USER_MUTATION)} addTypename={false}>
                <Auth />
            </MockedProvider>
        );

        const emailInput = await findByLabelText('Email');
        const passwordInput = await findByLabelText('Password');
        const signInButton = await findByRole('button', { name: SIGN_IN });

        const switchFormButton = await findByRole('button', { name: SWITCH_SIGN_UP_TEXT });

        expect(signInButton).toBeInTheDocument();
        expect(switchFormButton).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        userEvent.click(switchFormButton);

        const signUpButton = getByRole('button', { name: SIGN_UP });

        expect(signUpButton).toBeInTheDocument();

        userEvent.type(emailInput, email);
        expect(emailInput.value).toBe(email);

        userEvent.type(passwordInput, password);
        expect(passwordInput.value).toBe(password);

        userEvent.click(signUpButton);

        const accountCreatedSuccessMessage = await findByText(ACCOUNT_CREATED_MESSAGE);

        expect(accountCreatedSuccessMessage).toBeInTheDocument();
    });
});