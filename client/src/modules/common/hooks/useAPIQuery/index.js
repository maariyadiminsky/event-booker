import { useState, useEffect } from 'react';

import { sortQueryData } from '@modules/common/utils/query';
import { handleErrors } from '@modules/common/utils/auth';
import { DEFAULT, BOOKINGS_LOWERCASE } from '@modules/common/const';

export const useAPIQuery = (
    query = DEFAULT.UNDEFINED, dataKey = DEFAULT.STRING, loading = DEFAULT.BOOL_FALSE, 
    setLoading = DEFAULT.NULL, setErrors = DEFAULT.NULL, token = DEFAULT.NULL, 
    isAuthEndpoint = DEFAULT.BOOL_FALSE, stopLoadingIfEmpty = DEFAULT.BOOL_FALSE, shouldSort = DEFAULT.BOOL_TRUE
) => {
    const [data, setData] = useState(DEFAULT.NULL);

    useEffect(() => {
        if (isAuthEndpoint && !token) {
            return [data, setData];
        }
        
        if (!data && query) {
            if (!loading && query.loading) {
                setLoading(query.loading);
            }

            const fetchData = () => {
                try {
                    handleErrors(query, setErrors);
    
                    if (query.data && query.data[dataKey]) {
                        const isBooking = dataKey === BOOKINGS_LOWERCASE;
                        const queryData = isBooking ? query.data[dataKey].filter(booking => booking.event !== null) : query.data[dataKey];
                        const mutableData = shouldSort ? sortQueryData(queryData, isBooking) : queryData;

                        setData(mutableData);
                    } else {
                        // set so loader knows no events exist
                        setData([]);
                        if (stopLoadingIfEmpty) setLoading(false);
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
    }, [
        data, dataKey, query, token, loading, setErrors, setLoading, 
        isAuthEndpoint, shouldSort, stopLoadingIfEmpty
    ]);

    return [data, setData];
};