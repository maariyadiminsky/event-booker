import { useEffect, useRef } from 'react';

import { DEFAULT_PARAMS } from '../const';

export const useIsFirstRender = () => {
    const isFirstRender = useRef(DEFAULT_PARAMS.BOOL_TRUE);

    useEffect(() => {
        isFirstRender.current = false;
    }, []);

    return isFirstRender.current;
}