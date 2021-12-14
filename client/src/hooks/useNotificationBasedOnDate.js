import { useState, useEffect } from 'react';

import { isDateBeforeToday, isSameAsToday } from '../utils/date';

import { 
    DEFAULT_PARAM, 
    WARNING_COLOR, 
    ERROR_COLOR,
    WHITE_COLOR,
} from '../const';

export const DEFAULT_NOTIFICATION = {
    shouldRender: DEFAULT_PARAM.BOOL_FALSE,
    color: WHITE_COLOR,
    text: DEFAULT_PARAM.STRING,
};

export const useNotificationBasedOnDate = (date) => {
    const [notification, setNotification] = useState(DEFAULT_NOTIFICATION);

    useEffect(() => {
        if (isSameAsToday(date)) {
            setNotification({
                shouldRender: true,
                color: WARNING_COLOR,
                text: 'Today'
            })
        } else if (isDateBeforeToday(date)) {
            setNotification({
                shouldRender: true,
                color: ERROR_COLOR,
                text: 'Expired'
            })
        }
    }, [date])

    return [notification]
};