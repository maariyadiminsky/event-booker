import { beforeEach, describe, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';

import { MOCK } from '../../const';
import { useShowNotification } from './';

describe('useShowNotification', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setTimeout');
    });

    it('should show title if it exists', () => {
        const { result } = renderHook(() => useShowNotification(MOCK.NAME));

        const [shouldRenderNotification, setShouldRenderNotification] = result.current;

        expect(typeof shouldRenderNotification).toBe('boolean');
        expect(typeof setShouldRenderNotification).toEqual('function');

        expect(setTimeout).toHaveBeenCalledTimes(1);
    });

    it('should not show title if it doesn\'t exist', () => {
        const { result } = renderHook(() => useShowNotification());

        const [shouldRenderNotification, setShouldRenderNotification] = result.current;

        expect(typeof shouldRenderNotification).toBe('boolean');
        expect(typeof setShouldRenderNotification).toEqual('function');

        expect(setTimeout).toHaveBeenCalledTimes(0);
    });
});