import { useEffect, useRef } from 'react';

import { DEFAULTS } from '../const';

export const useIsFirstRender = () => {
    const isFirstRender = useRef(DEFAULTS.BOOL_TRUE);

    useEffect(() => {
        isFirstRender.current = false;
    }, []);

    return isFirstRender.current;
}