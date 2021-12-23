import {
    DEFAULT,
    SIGN_IN_FORM,
    SIGN_UP_FORM,
    CREATE_EVENT_FORM,
    ERROR_DATA_NO_RESPONSE,
    ERROR_SERVER_ERROR
} from '../../const'

export const mutationCallbackTry = (isMutation = DEFAULT.BOOL_FALSE, mutationCallback = DEFAULT.NULL) => {
    if (isMutation && mutationCallback) {
        return mutationCallback();
    }

    return;
}
export const handleErrors = (response = DEFAULT.UNDEFINED, callback = DEFAULT.NULL, mutationCallback = DEFAULT.NULL, isMutation = DEFAULT.BOOL_FALSE) => {
    if (!response) {
        mutationCallbackTry(isMutation, mutationCallback);

        throw new Error(ERROR_DATA_NO_RESPONSE(isMutation));
    } else if (response.errors && response.errors.length > 0) {
        mutationCallbackTry(isMutation, mutationCallback);
        
        callback(response.errors);

        return response.errors;
    } else if (response.status && response.status !== 200 && response.status !== 201) {
        mutationCallbackTry(isMutation, mutationCallback);

        throw new Error(ERROR_SERVER_ERROR(isMutation, response.status));
    }
}

export const getAuthHeaders = (token = DEFAULT.NULL) => ({
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const VALIDATION_ERRORS = {
    EMAIL: 'Email must be included.',
    PASSWORD: 'Please provide a password.',
    TITLE: 'Title is required.',
    DESCRIPTION: 'Please provide a short description.',
    PRICE: 'Price is required.',
    DATE: 'Date is required.'
};
export const validateForm = ({ 
    // sign in / sign up forms
    email = DEFAULT.STRING, 
    password = DEFAULT.STRING,

    // create event form
    title = DEFAULT.STRING, 
    description = DEFAULT.STRING, 
    price = DEFAULT.NULL, 
    date = DEFAULT.STRING
}, formType) => {
    let errors = {};

    switch(formType) {
        case SIGN_IN_FORM:
        case SIGN_UP_FORM:
            if (!email) {
                errors.email = VALIDATION_ERRORS.EMAIL;
            }
        
            if (!password) {
                errors.password = VALIDATION_ERRORS.PASSWORD;
            }
            break;
        case CREATE_EVENT_FORM:
            if (!title) {
                errors.title = VALIDATION_ERRORS.TITLE;
            }

            if(!description) {
                errors.description = VALIDATION_ERRORS.DESCRIPTION;
            }

            if (!price) {
                errors.price = VALIDATION_ERRORS.PRICE;
            }

            if (!date) {
                errors.date = VALIDATION_ERRORS.DATE;
            }
            break;
        default:
            break;
    }

    return errors;
}