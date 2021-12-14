import { useState, useEffect } from 'react';

import { DEFAULT_PARAM } from '../const';

export const useShowNotification = (title = DEFAULT_PARAM.STRING, timeToShow = 2500) => {
    const [shouldRenderNotification, setShouldRenderNotification] = useState(DEFAULT_PARAM.BOOL_FALSE);

    useEffect(() => {    
        if (title && shouldRenderNotification) {
            const showForTime = setTimeout(() => {
                setShouldRenderNotification(false)
            }, timeToShow);

            return () => clearTimeout(showForTime);
        }

    }, [title, timeToShow, shouldRenderNotification]);

    return [shouldRenderNotification, setShouldRenderNotification];
};