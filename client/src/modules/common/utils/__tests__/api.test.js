import { handleErrors } from '@modules/common/utils/auth';
import { hideConsoleLog, showConsoleLog } from '@modules/common/utils/misc';
import { apiBaseCall, apiBaseParams } from '@modules/common/utils/api';
import { 
    TEST, 
    DEVELOPMENT, 
    PRODUCTION, 
    DEFAULT,
    ERROR_DATA_NO_RESPONSE,
    ERROR_SERVER_ERROR
} from '@modules/common/const';

describe('apiBaseCall', () => {
    const mockQueryVariables = { name: 'Edward' };
    let setLoadingState;
    let dataCallback;
    let errorsState;
    let setErrorState;

    beforeEach(() => {
        errorsState = [];
        setLoadingState = jest.fn();
        dataCallback = jest.fn();
        setErrorState = jest.fn((errors) => {
            errorsState = [...errorsState, ...errors];
        });
    });

    it('exit if truthy value is true', async() => {
        const params = {
            ...apiBaseParams,
            exitIfTrue: true
        };

        const input = await apiBaseCall(params);
        const output = undefined;

        expect(input).toEqual(output);
    });

    it('send errors if they exist in query response', async() => {
        const response = {
            data: null,
            loading: false,
            errors: ['server error: no data!']
        }
        const handleErrors = jest.fn(() => {
            setErrorState(response.errors);

            return response.errors;
        });
        const mockQuery = async(variables) => {
            if (variables) {
                return await Promise.resolve((response));
            }
        };
        const params = {
            ...apiBaseParams,
            queryToCheck: mockQuery,
            queryVariables: mockQueryVariables,
            setLoadingState,
            handleErrors,
            setErrorState,
            dataCallback
        };

        const input = await apiBaseCall(params);

        expect(input).toMatchObject(response);
    });

    it('throws an error if there is no response', async() => {
        hideConsoleLog();

        const response = undefined;
        const isMutation = false;
        const output = ERROR_DATA_NO_RESPONSE(isMutation);

        const mockQueryForNoResponse = async(variables) => {
            if (variables) {
                return await Promise.resolve((response));
            }
        };
        const params = {
            ...apiBaseParams,
            queryToCheck: mockQueryForNoResponse,
            queryVariables: mockQueryVariables,
            setLoadingState,
            handleErrors,
            setErrorState,
            dataCallback
        };

        try {
            await apiBaseCall(params);
        } catch(error) {
            expect(error.message).toEqual(output);
        }

        showConsoleLog();
    });

    it('throws an error if response status is neither 200 or 201', async() => {
        hideConsoleLog();
        const response = {
            data: null,
            status: 500,
            errors: null
        };
        const isMutation = false;
        const output = ERROR_SERVER_ERROR(isMutation, response.status);
        const mockQueryForUndefinedResponse = async(variables) => {
            if (variables) {
                return await Promise.resolve((response));
            }
        };
        const params = {
            ...apiBaseParams,
            queryToCheck: mockQueryForUndefinedResponse,
            queryVariables: mockQueryVariables,
            setLoadingState,
            handleErrors,
            setErrorState,
            dataCallback
        };

        try {
            await apiBaseCall(params);
        } catch(error) {
            expect(error.message).toEqual(output);
        }

        showConsoleLog();
    });
});