import { render, screen, act, wait } from '../../tests/utils';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import Auth from './';
import { CREATE_USER_MUTATION, SIGN_IN_QUERY } from './queries';
import { 
    MOCK,
    DEFAULT,
    SIGN_IN,
    SIGN_UP,
    SWITCH_SIGN_UP_TEXT,
    SWITCH_SIGN_IN_TEXT,
    SIGN_IN_FORM,
    SIGN_UP_FORM,
    ACCOUNT_CREATED_MESSAGE,
    SIGN_IN_MESSAGE,
    SIGN_IN_OR_CREATE_ACCOUNT_MESSAGE,
    CONFETTI_ICON,
} from '../../const';

describe('<Auth />', () => {
    let email;
    let password;
    let emailThatAlreadyExists;
    let passwordThatExists;

    beforeAll(() => {
        email = 'someEmail@email.com';
        password = 'somePassword';
        emailThatAlreadyExists = 'someExistingEmail@email.com';
        passwordThatExists = 'someExistingPassword';
        // mocks = [
        //     {
        //         request: {
        //             query: CREATE_USER_MUTATION,
        //             variables: { email, password }
        //         },
        //         result: {
        //             data: {
        //                 createUser: {
        //                     _id: '0'
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         request: {
        //             query: CREATE_USER_MUTATION,
        //             variables: { 
        //                 email: emailThatAlreadyExists, 
        //                 password: passwordThatExists 
        //             }
        //         },
        //         error: [{ message: new Error('User already exists!')}]
        //       },
        //     {
        //         request: {
        //             query: SIGN_IN_QUERY,
        //             variables: { email, password }
        //         },
        //         result: {
        //             data: {
        //                 signIn: {
        //                     userId: '0',
        //                     token: MOCK.TOKEN, 
        //                     tokenExpiration: 'someExpirationDate',
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         request: {
        //           query: SIGN_IN_QUERY,
        //           variables: { email, password }
        //         },
        //         error: [{ message: new Error('User email or password is incorrect!')}]
        //       }
        //   ];
    });

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

    it('create a new account and asks users to login', async() => {
        const mocks = [
            {
                request: {
                    query: CREATE_USER_MUTATION,
                    variables: { 
                        email: 'someEmail@email.com', 
                        password: 'somePassword' 
                    }
                },
                result: {
                    data: {
                        createUser: {
                            _id: '0'
                        }
                    }
                }
            }
        ];
        const { container, getByRole } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Auth />
            </MockedProvider>
        );

        const signInButton = getByRole('button', { name: SIGN_IN });

        expect(signInButton).toBeInTheDocument();

        userEvent.click(signInButton);

        await wait(0);

        // screen.debug();
    });
});