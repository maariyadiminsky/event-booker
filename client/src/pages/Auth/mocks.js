import { CREATE_USER_MUTATION, SIGN_IN_QUERY } from './queries';

import { MOCK } from '../../const';

export const email = 'someEmail@email.com';
export const password = 'somePassword';

const mocks = (queryType) => {
    let query;

    switch(queryType) {
        case MOCK.QUERY_TYPE.CREATE_USER_MUTATION:
            query = CREATE_USER_MUTATION;
            break;
        case MOCK.QUERY_TYPE.SIGN_IN_QUERY:
            query = SIGN_IN_QUERY;
            break;
        default:
            query = '';
    }

    return setup(query, queryType);
}

const setup = (query, queryType) => ([
    {
        request: {
            query: query,
            variables: { email, password }
        },
        result: {
            data: getServerMockData(queryType)
        }
    },    
]);

export const getServerMockData = (queryType) => {
    switch(queryType) {
        case MOCK.QUERY_TYPE.CREATE_USER_MUTATION:
            return {
                createUser: {
                    _id: '0',
                    email
                }
            };
        case MOCK.QUERY_TYPE.SIGN_IN_QUERY:
            return {
                signIn: {
                    userId: '0',
                    token: MOCK.TOKEN, 
                    tokenExpiration: 'someExpirationDate',
                }
            };
        default:
            return {};
    }
};

export default mocks;