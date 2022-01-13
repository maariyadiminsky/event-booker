import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT } from '@modules/common/const';

import FormError from '@modules/common/form/FormErrors';

const FormErrors = ({ errors = DEFAULT.NULL }) => (
    errors.map(({ message = DEFAULT.STRING }, index = DEFAULT.NULL) => (
        <FormError key={index} error={message} />
    ))
);

FormErrors.propTypes = {
    errors: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string
        })
    ).isRequired
};

export default FormErrors;