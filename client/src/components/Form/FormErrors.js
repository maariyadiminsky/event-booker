import React from 'react';

import FormError from './FormError';

const FormErrors = ({ errors }) => (
    errors.map(({ message }, index) => <FormError key={index} error={message} />)
);

export default FormErrors;