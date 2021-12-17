import { findBaseURL } from './';
import { TEST, DEVELOPMENT, PRODUCTION, DEFAULT } from '../../const';

// todo: add test for apiBaseCall
describe('findBaseUrl', () => {
    test('it returns correct api url during development', async() => {
        const input = findBaseURL();
        let output;

        switch(process.env.NODE_ENV) {
            case DEVELOPMENT:
                output = process.env.REACT_APP_PROD_EVENT_BOOKER_API_URL;
                break;
            case PRODUCTION:
                output = process.env.REACT_APP_DEV_EVENT_BOOKER_API_URL;
                break;
            case TEST:
            default:
                output = DEFAULT.STRING;
                break;
        }

        expect(input).toBe(output);
    })
});