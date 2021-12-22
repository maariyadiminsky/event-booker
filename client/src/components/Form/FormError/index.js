import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT } from '../../../const';

const FormError = ({ error = DEFAULT.STRING }) => (
    <div className="mt-2 text-red-500 text-md italic text-center">{error}</div>
);

FormError.propTypes = { 
    error: PropTypes.string.isRequired,
};

export default FormError;