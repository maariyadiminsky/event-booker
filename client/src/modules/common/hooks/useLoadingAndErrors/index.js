import { useState } from 'react';

import { DEFAULT } from '@modules/common/const';

export const useLoadingAndErrors = () => {
    const [loading, setLoading] = useState(DEFAULT.BOOL_FALSE);
    const [errors, setErrors] = useState(DEFAULT.ARRAY);

    return [loading, errors, setLoading, setErrors];
};