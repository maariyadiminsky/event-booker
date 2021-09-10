import React from "react";

const FormValidate = ({ email, password }) => {
    let errors = {};

    if (!email) {
        errors.email = "Email must be included."
    }

    if (!password) {
        errors.password = "Please provide a password."
    }

    return (
        <div>{errors}</div>
    );
}

export default FormValidate;