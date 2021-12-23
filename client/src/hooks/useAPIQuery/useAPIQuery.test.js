import { renderHook } from '@testing-library/react-hooks';

import { useAPIQuery } from './';
import * as utils from '../../utils';
import { 
    DEFAULT, 
    MOCK, 
    BOOKINGS_LOWERCASE,
    EVENTS_LOWERCASE
} from '../../const';

describe('useAPIQuery', () => {
    let params;

    beforeAll(() => {
        params = {
            query: {
                loading: false,
                errors: null
            },
            dataKey: BOOKINGS_LOWERCASE, 
            loading: false, 
            setLoading: jest.fn(),
            setErrors: jest.fn(),
            token: MOCK.TOKEN, 
            isAuthEndpoint: false,
            stopLoadingIfEmpty: false,
            shouldSort: true
        };
    });

    it('should return null if is auth endpoint and no token is provided', () => {
        const token = null;
        const isAuthEndpoint = true;
        const { result } = renderHook(() => useAPIQuery(
            params.query, params.dataKey, params.loading,
            params.setLoading, params.setErrors, token,
            isAuthEndpoint, params.stopLoadingIfEmpty, params.shouldSort
        ));

        const [data] = result.current;
        
        expect(data).toEqual(DEFAULT.NULL);
    });

    it('should set component loader if no there is no data and query is loading', () => {
        const query = {
            ...params.query,
            loading: true
        };
        renderHook(() => useAPIQuery(
            query, params.dataKey, params.loading,
            params.setLoading, params.setErrors, params.token,
            params.isAuthEndpoint, params.stopLoadingIfEmpty, params.shouldSort
        ));
        
        expect(params.setLoading).toHaveBeenCalledTimes(1);
    });

    it('should set components errors if there are any', () => {
        const query = {
            ...params.query,
            errors: [{ message: 'someError' }]
        };
        renderHook(() => useAPIQuery(
            query, params.dataKey, params.loading,
            params.setLoading, params.setErrors, params.token,
            params.isAuthEndpoint, params.stopLoadingIfEmpty, params.shouldSort
        ));
        
        expect(params.setErrors).toHaveBeenCalledTimes(1);
    });

    it('should sort query data if it exists', () => {
        jest.spyOn(utils, 'sortQueryData');

        const eventsDataKey = EVENTS_LOWERCASE;
        const eventsQuery = {
            ...params.query,
            data: {
                [EVENTS_LOWERCASE]: [
                    {
                        someKey: 'someData',
                        date: ''
                    },
                    {
                        someKey2: 'someData2',
                        date: ''
                    }
                ]
            }
        };
        renderHook(() => useAPIQuery(
            eventsQuery, eventsDataKey, params.loading,
            params.setLoading, params.setErrors, params.token,
            params.isAuthEndpoint, params.stopLoadingIfEmpty, params.shouldSort
        ));

        const bookingsDataKey = BOOKINGS_LOWERCASE;
        const bookingsQuery = {
            ...params.query,
            data: {
                [BOOKINGS_LOWERCASE]: [
                    {
                        someKey: 'someData',
                        event: {
                            date: ''
                        }
                    },
                    {
                        someKey2: 'someData2',
                        event: {
                            date: ''
                        }
                    }
                ]
            }
        };

        renderHook(() => useAPIQuery(
            bookingsQuery, bookingsDataKey, params.loading,
            params.setLoading, params.setErrors, params.token,
            params.isAuthEndpoint, params.stopLoadingIfEmpty, params.shouldSort
        ));

        expect(utils.sortQueryData).toHaveBeenCalledTimes(2);
    })
});