import { 
    handleErrors,
    getAuthHeaders, 
    validateForm 
} from './';
import { generateRandomString } from '../../tests/utils/misc';
import { 
    DEFAULT,
    SIGN_IN_FORM, 
    SIGN_UP_FORM, 
    CREATE_EVENT_FORM,
    ERROR_DATA_NO_RESPONSE
} from '../../const';

const generalFn = () => 'Works!';
describe('mutationCallbackTry', () => { 
    let mutationCallbackTry;
    let callback;
    let isMutation;
    beforeEach(() => {
        isMutation = true;
        callback = jest.fn(generalFn);

        mutationCallbackTry = jest.fn((isMutation = DEFAULT.BOOL_FALSE, mutationCallback = DEFAULT.NULL) => {
            if (isMutation && mutationCallback) {
                return mutationCallback();
            }
        });
    })

    it('calls callback when it\'s a mutation and callback exists', () => {
        const isMutation = true;
        const input = mutationCallbackTry(isMutation, callback);
        const output = 'Works!';

        expect(mutationCallbackTry).toHaveBeenCalledWith(isMutation, callback);
        expect(mutationCallbackTry).toHaveBeenCalledTimes(1);
        expect(input).toBe(output);
    })

    it('doesn\'t call callback if it\'s not a mutation and/or callback doesn\'t exist', () => {
        // no mutation but callback exists
        isMutation = false;

        const inputNoMutation = mutationCallbackTry(isMutation, callback);
        const outputNoMutation = DEFAULT.UNDEFINED;

        expect(mutationCallbackTry).toHaveBeenCalledWith(isMutation, callback);
        expect(inputNoMutation).toBe(outputNoMutation);

        // mutation but callback doesn't exist
        isMutation = true;
        callback = null;

        const inputNoCallback = mutationCallbackTry(isMutation, callback);
        const outputNoCallback = DEFAULT.UNDEFINED;

        expect(mutationCallbackTry).toHaveBeenCalledWith(isMutation, callback);
        expect(inputNoCallback).toBe(outputNoCallback);
    })
});

describe('handleErrors', () => {
    let callback;
    let isMutation;
    let response;

    beforeEach(() => {
        callback = generalFn;
        isMutation = false;
    })

    it ('throws an error if no response came through', async() => {
        const input = () => handleErrors(response, callback, isMutation);
        const output = new Error(ERROR_DATA_NO_RESPONSE(isMutation));
        const incorrectOutput = new Error('Some random unrelated error!');
        
        expect(input).toThrow(output);
        expect(input).not.toThrow(incorrectOutput);
    });

    it ('throws an error if there are no errors but status is neither 200 nor 201', async() => {
        const input = () => handleErrors(response, callback, isMutation);
        const output = new Error(ERROR_DATA_NO_RESPONSE(isMutation));
        const incorrectOutput = new Error('Some random unrelated error!');
        
        expect(input).toThrow(output);
        expect(input).not.toThrow(incorrectOutput);
    });

    it ('calls a callback that handles errors if errors exist', async() => {
        let errorsState = [];
        const setErrors = jest.fn((errors) => {
            errorsState = [...errorsState, ...errors];
        });
        const serverError = 'A server error';
        const response = {
            errors: [serverError]
        };
        // callback typically sets the errors in state
        const callback = jest.fn((errors) => {
            if (errors) setErrors(errors);

            return errors;
        });
        const input = handleErrors(response, callback, isMutation);
        
        expect(input).toContain(errorsState[0]);
    });
});

describe('validateForm', () => {
    const formValidation1 = {
        email: 'Email must be included.',
        password: 'Please provide a password.'
    };

    it('returns empty object if form type doesn\'t exist', () => {
        const input = validateForm(DEFAULT.OBJECT, 'A Non-existing Form');
        const output = DEFAULT.OBJECT;

        expect(input).toEqual(output);
    });

    it('returns correct validation errors depending on formType', () => {
        const formValidation2 = {
            title: 'Title is required.',
            description: 'Please provide a short description.',
            price: 'Price is required.',
            date: 'Date is required.'
        };

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