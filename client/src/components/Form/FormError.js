import React from 'react';

import { DEFAULT } from '../../const';

const FormError = ({ error = DEFAULT.STRING }) => (
    <div className="mt-2 text-red-500 text-md italic text-center">{error}</div>
);

export default FormError;