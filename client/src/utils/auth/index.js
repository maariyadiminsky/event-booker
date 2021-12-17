import {
    DEFAULT,
    SIGN_IN_FORM,
    SIGN_UP_FORM,
    CREATE_EVENT_FORM
} from '../../const'

const mutationCallbackTry = (isMutation = DEFAULT.BOOL_FALSE, mutationCallback = DEFAULT.NULL) => {
    if (isMutation && mutationCallback) mutationCallback();
}
export const handleErrors = (response = DEFAULT.UNDEFINED, callback = DEFAULT.NULL, mutationCallback = DEFAULT.NULL, isMutation = DEFAULT.BOOL_FALSE) => {
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

export const getAuthHeaders = (token = DEFAULT.NULL) => ({
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

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