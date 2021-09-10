import {
    SIGN_IN_FORM,
    SIGN_UP_FORM
} from "../const"

export const validateForm = ({ email, password}, formType) => {
    let errors = {};

    switch(formType) {
        case SIGN_IN_FORM:
        case SIGN_UP_FORM:
            if (!email) {
                errors.email = "Email must be included."
            }
        
            if (!password) {
                errors.password = "Please provide a password."
            }
        break;
        default:
            break;
    }

    return errors;
}