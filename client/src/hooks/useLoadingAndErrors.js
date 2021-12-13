import { useState } from 'react';

export const useLoadingAndErrors = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);


    return [loading, errors, setLoading, setErrors];
};