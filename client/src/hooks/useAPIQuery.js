import { useState, useEffect } from 'react';

import { sortQueryData } from '../utils';
import { handleErrors } from '../utils/auth';
import { BOOKINGS_LOWERCASE } from '../const';

export const useAPIQuery = (query, dataKey, loading, setLoading, setErrors, token = null, isAuthEndpoint = false, stopLoadingIfEmpty = false, shouldSort = true) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (isAuthEndpoint && !token) return;
        
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