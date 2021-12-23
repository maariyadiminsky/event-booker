import { useState, useEffect } from 'react';

import { DEFAULT } from '../../const';

export const useShowNotification = (title = DEFAULT.STRING, timeToShow = 2500) => {
    const [shouldRenderNotification, setShouldRenderNotification] = useState(DEFAULT.BOOL_FALSE);

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