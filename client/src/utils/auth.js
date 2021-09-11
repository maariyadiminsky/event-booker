import {
    SIGN_IN_FORM,
    SIGN_UP_FORM,
    CREATE_EVENT_FORM
} from "../const"

export const validateForm = ({ 
    // sign in / sign up forms
    email, 
    password,

    // create event form
    title, 
    description, 
    price
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
            break;
        default:
            break;
    }

    return errors;
}