import { useState, useEffect } from 'react';

import { isDateBeforeToday, isSameAsToday } from '../utils/date';

import { 
    DEFAULT, 
    WARNING_COLOR, 
    ERROR_COLOR,
    WHITE_COLOR,
    EXPIRED,
    TODAY
} from '../const';

export const DEFAULT_NOTIFICATION = {
    shouldRender: DEFAULT.BOOL_FALSE,
    color: WHITE_COLOR,
    text: DEFAULT.STRING,
};

export const useNotificationBasedOnDate = (date) => {
    const [notification, setNotification] = useState(DEFAULT_NOTIFICATION);

    useEffect(() => {
        if (isSameAsToday(date)) {
            setNotification({
                shouldRender: true,
                color: WARNING_COLOR,
                text: TODAY
            })
        } else if (isDateBeforeToday(date)) {
            setNotification({
                shouldRender: true,
                color: ERROR_COLOR,
                text: EXPIRED
            })
        }
    }, [date])

    return [notification]
};