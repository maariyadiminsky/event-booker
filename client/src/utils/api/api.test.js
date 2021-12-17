import { 
    findBaseURL, 
    apiBaseCall, 
    apiBaseParams
} from './';
import { 
    TEST, 
    DEVELOPMENT, 
    PRODUCTION, 
    DEFAULT 
} from '../../const';

describe('apiBaseCall', () => {
    it('exit if truthy value is true', async() => {
        const params = {
            ...apiBaseParams,
            exitIfTrue: true
        };

        const input = await apiBaseCall(params);
        const output = undefined;

        expect(input).toEqual(output);
    });
});

describe('findBaseUrl', () => {
    it('returns correct api url', async() => {
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