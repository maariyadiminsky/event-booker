import { useState, useEffect } from 'react';

export const useShowNotification = (title, timeToShow = 2500) => {
    const [shouldRenderNotification, setShouldRenderNotification] = useState(false);

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