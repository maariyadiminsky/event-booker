export const signUpMutation = (email, password) => `
    mutation {
        createUser(userInput: { email: "${email}", password: "${password}" }) {
            _id
            email
        }
    }
`;

export const signInQuery = (email, password) => `
    query {
        signIn(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
        }
    }
`;