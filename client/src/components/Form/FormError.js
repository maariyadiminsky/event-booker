import React from 'react';

import { DEFAULT_PARAM } from '../../const';

const FormError = ({ error = DEFAULT_PARAM.STRING }) => (
    <div className="mt-2 text-red-500 text-md italic text-center">{error}</div>
);

export default FormError;