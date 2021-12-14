import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT } from '../../const';

import FormError from './FormError';

const FormErrors = ({ errors = DEFAULT.NULL }) => (
    errors.map(({ message = DEFAULT.STRING }, index = DEFAULT.NULL) => (
        <FormError key={index} error={message} />
    ))
);

FormErrors.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FormErrors;