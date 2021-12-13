import { useState, useEffect } from 'react';

import { sortQueryData } from '../utils';
import { handleErrors } from '../utils/auth';

export const useAPIQuery = (query, dataKey, shouldSort = true) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!data && query) {
            if (!loading && query.loading) {
                setLoading(query.loading);
            }

            const fetchData = () => {
                try {
                    handleErrors(query, setErrors);
    
                    if (query.data && query.data[dataKey]) {
                        const queryData = query.data[dataKey];
                        const mutableData = shouldSort ? sortQueryData(queryData) : queryData;

                        setData(mutableData);
                    } else {
                        // set so loader knows no events exist
                        setData([]);
                    }
                } catch(err) {
                    console.log(err);
                    throw err;
                }

                setLoading(false);
            }

            if (!query.loading) {
                fetchData();
            }
        }
    }, [data, dataKey, query, loading]);

    return [loading, errors, data, setLoading, setErrors, setData];
};