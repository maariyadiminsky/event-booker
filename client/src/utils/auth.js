import {
    DEFAULT_PARAM,
    SIGN_IN_FORM,
    SIGN_UP_FORM,
    CREATE_EVENT_FORM
} from '../const'

const mutationCallbackTry = (isMutation = DEFAULT_PARAM.BOOL_FALSE, mutationCallback = DEFAULT_PARAM.NULL) => {
    if (isMutation && mutationCallback) mutationCallback();
}
export const handleErrors = (response = DEFAULT_PARAM.UNDEFINED, callback = DEFAULT_PARAM.NULL, mutationCallback = DEFAULT_PARAM.NULL, isMutation = DEFAULT_PARAM.BOOL_FALSE) => {
    if (!response) {
        mutationCallbackTry(isMutation, mutationCallback);

        throw new Error(`Data ${isMutation? 'mutation' : 'retrieval'} failed with no response!`);
    } else if (response.errors && response.errors.length > 0) {
        mutationCallbackTry(isMutation, mutationCallback);
        callback(response.errors);

        return;
    } else if (response.status && response.status !== 200 && response.status !== 201) {
        mutationCallbackTry(isMutation, mutationCallback);

        throw new Error(`Data ${isMutation? 'mutation' : 'retrieval'} failed with server status code: ${response.status}.`);
    }
}

export const getAuthHeaders = (token = DEFAULT_PARAM.NULL) => ({
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const validateForm = ({ 
    // sign in / sign up forms
    email = DEFAULT_PARAM.STRING, 
    password = DEFAULT_PARAM.STRING,

    // create event form
    title = DEFAULT_PARAM.STRING, 
    description = DEFAULT_PARAM.STRING, 
    price = DEFAULT_PARAM.NULL, 
    date = DEFAULT_PARAM.STRING
}, formType) => {
    let errors = {};

    switch(formType) {
        case SIGN_IN_FORM:
        case SIGN_UP_FORM:
            if (!email) {
                errors.email = 'Email must be included.';
            }
        
            if (!password) {
                errors.password = 'Please provide a password.';
            }
            break;
        case CREATE_EVENT_FORM:
            if (!title) {
                errors.title = 'Title is required.';
            }

            if(!description) {
                errors.description = 'Please provide a short description.';
            }

            if (!price) {
                errors.price = 'Price is required.';
            }

            if (!date) {
                errors.date = 'Date is required.';
            }
            break;
        default:
            break;
    }

    return errors;
}