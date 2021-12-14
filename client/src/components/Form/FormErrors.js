import React from 'react';

import { DEFAULT_PARAM } from '../../const';

import FormError from './FormError';

const FormErrors = ({ errors = DEFAULT_PARAM.NULL }) => (
    errors.map(({ message = DEFAULT_PARAM.STRING }, index = DEFAULT_PARAM.NULL) => (
        <FormError key={index} error={message} />
    ))
);

export default FormErrors;