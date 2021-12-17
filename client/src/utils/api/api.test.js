import { findBaseURL } from './';
import { TEST, DEVELOPMENT, PRODUCTION, DEFAULT } from '../../const';

// todo: add test for apiBaseCall
describe('findBaseUrl', () => {
    test('it returns correct api url during development', async() => {
        const result = findBaseURL();
        let expectedResult;

        switch(process.env.NODE_ENV) {
            case DEVELOPMENT:
                expectedResult = process.env.REACT_APP_PROD_EVENT_BOOKER_API_URL;
                break;
            case PRODUCTION:
                expectedResult = process.env.REACT_APP_DEV_EVENT_BOOKER_API_URL;
                break;
            case TEST:
            default:
                expectedResult = DEFAULT.STRING;
                break;
        }

        expect(result).toBe(expectedResult);
    })
});