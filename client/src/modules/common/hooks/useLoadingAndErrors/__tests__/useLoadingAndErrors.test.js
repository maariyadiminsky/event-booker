import { renderHook } from '@testing-library/react-hooks';

import { useLoadingAndErrors } from '@modules/common/hooks/useLoadingAndErrors';
import { DEFAULT } from '@modules/common/const';

describe('useLoadingAndErrors', () => {
    it('returns default data initially', () => {
        const { result } = renderHook(() => useLoadingAndErrors());

        const [loading, errors, setLoading, setErrors] = result.current;

        expect(loading).toBe(false);
        expect(errors).toBe(DEFAULT.ARRAY);
        expect(typeof setLoading).toBe('function');
        expect(typeof setErrors).toBe('function');
    });
});