import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($email: String!, $password: String!) {
        createUser(userInput: { email: $email, password: $password }) {
            _id
            email
        }
    }
`;

export const SIGN_IN_QUERY = gql`
    query SignIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`;