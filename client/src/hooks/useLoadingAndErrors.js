import { useState } from 'react';

import { DEFAULT_PARAM } from '../const';

export const useLoadingAndErrors = () => {
    const [loading, setLoading] = useState(DEFAULT_PARAM.BOOL_FALSE);
    const [errors, setErrors] = useState(DEFAULT_PARAM.ARRAY);

    return [loading, errors, setLoading, setErrors];
};