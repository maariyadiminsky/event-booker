import { 
    getAuthHeaders, 
    validateForm 
} from './';
import { generateRandomString } from '../../tests/utils/misc';
import { 
    SIGN_IN_FORM, 
    SIGN_UP_FORM, 
    CREATE_EVENT_FORM, 
    DEFAULT 
} from '../../const';

// todo: create tests for mutationCallbackTry and handleErrors
describe('validateForm', () => {
    const formValidation1 = {
        email: 'Email must be included.',
        password: 'Please provide a password.'
    };

    const formValidation2 = {
        title: 'Title is required.',
        description: 'Please provide a short description.',
        price: 'Price is required.',
        date: 'Date is required.'
    };

    it('returns empty object if form type doesn\'t exist', () => {
        const input = validateForm(DEFAULT.OBJECT, 'A Non-existing Form');
        const output = DEFAULT.OBJECT;

        expect(input).toEqual(output);
    });

    it('returns correct validation errors depending on formType', () => {
        const inputSignInForm = validateForm(DEFAULT.OBJECT, SIGN_IN_FORM);
        const inputSignUpForm = validateForm(DEFAULT.OBJECT, SIGN_UP_FORM);
        const inputCreateEventForm = validateForm(DEFAULT.OBJECT, CREATE_EVENT_FORM);

        expect(inputSignInForm).toEqual(formValidation1);
        expect(inputSignInForm).not.toEqual(formValidation2);
        expect(inputSignUpForm).toEqual(formValidation1);
        expect(inputSignUpForm).not.toEqual(formValidation2);
        expect(inputCreateEventForm).toEqual(formValidation2);
        expect(inputCreateEventForm).not.toEqual(formValidation1);
    });

    it('returns only validation errors that are needed', () => {
        const input = validateForm(DEFAULT.OBJECT, SIGN_IN_FORM);

        const passWordExists = {
            password: generateRandomString()
        };
        const inputIfPasswordExists = validateForm(passWordExists, SIGN_IN_FORM);
        const outputIfPasswordExists = {
            email: 'Email must be included.'
        };

        expect(input).toEqual(formValidation1);
        expect(inputIfPasswordExists).toEqual(outputIfPasswordExists);
    });
});

describe('getAuthHeaders', () => {
    it('returns correct header with token', () => {
        const token = generateRandomString();
        const input = getAuthHeaders(token);
        const output = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const incorrectOutput = {
            headers: {
                'Authorization': `Bearer ${generateRandomString()}`
            }
        };

        expect(input).toEqual(output);
        expect(input).not.toEqual(incorrectOutput);
    });
    it('returns header with null token if nothing passed in', () => {
        const input = getAuthHeaders();
        const output = {
            headers: {
                'Authorization': 'Bearer null'
            }
        };

        expect(input).toEqual(output);
    });
});