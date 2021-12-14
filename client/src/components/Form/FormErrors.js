import React from 'react';

import { DEFAULT } from '../../const';

import FormError from './FormError';

const FormErrors = ({ errors = DEFAULT.NULL }) => (
    errors.map(({ message = DEFAULT.STRING }, index = DEFAULT.NULL) => (
        <FormError key={index} error={message} />
    ))
);

export default FormErrors;