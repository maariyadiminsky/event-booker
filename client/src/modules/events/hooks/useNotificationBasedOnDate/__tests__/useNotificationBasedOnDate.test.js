import { renderHook } from '@testing-library/react-hooks';

import { 
    useNotificationBasedOnDate, 
    DEFAULT_NOTIFICATION,
    SAME_AS_TODAY_NOTIFICATION,
    DATE_BEFORE_TODAY_NOTIFICATION 
} from '@modules/events/hooks/useNotificationBasedOnDate';

describe('useNotificationBasedOnDate', () => {
    it('returns default data initially', () => {
        const { result } = renderHook(() => useNotificationBasedOnDate());

        const [notification] = result.current;

        expect(typeof notification).toBe('object');
        expect(notification).toEqual(DEFAULT_NOTIFICATION);
    });

    it('returns correct data if date is for today', () => {
        const { result } = renderHook(() => useNotificationBasedOnDate(`${new Date().toISOString()}`));

        const [notification] = result.current;
    
        expect(notification).toEqual(SAME_AS_TODAY_NOTIFICATION);
        expect(notification).not.toEqual(DEFAULT_NOTIFICATION);
    });

    it('returns correct data if date is before today', () => {
        const { result } = renderHook(() => useNotificationBasedOnDate('2021-09-15T00:00:00.000Z'));

        const [notification] = result.current;
    
        expect(notification).toEqual(DATE_BEFORE_TODAY_NOTIFICATION );
        expect(notification).not.toEqual(DEFAULT_NOTIFICATION);
    });
});