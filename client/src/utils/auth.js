import {
    SIGN_IN_FORM,
    SIGN_UP_FORM,
    CREATE_EVENT_FORM
} from "../const"

export const handleServerErrors = (response, callback) => {
    if (!response) {
        throw new Error("Booking retrieval failed with no response!");
    } else if (response.data && response.data.errors && response.data.errors.length > 0) {
        callback(response.data.errors);
        return;
    } else if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Booking retrieval failed with server status code: ${response.status}.`);
    }
}

export const validateForm = ({ 
    // sign in / sign up forms
    email, 
    password,

    // create event form
    title, 
    description, 
    price, 
    date
}, formType) => {
    let errors = {};

    switch(formType) {
        case SIGN_IN_FORM:
        case SIGN_UP_FORM:
            if (!email) {
                errors.email = "Email must be included.";
            }
        
            if (!password) {
                errors.password = "Please provide a password.";
            }
            break;
        case CREATE_EVENT_FORM:
            if (!title) {
                errors.title = "Title is required.";
            }

            if(!description) {
                errors.description = "Please provide a short description.";
            }

            if (!price) {
                errors.price = "Price is required.";
            }

            if (!date) {
                errors.date = "Date is required.";
            }
            break;
        default:
            break;
    }

    return errors;
}