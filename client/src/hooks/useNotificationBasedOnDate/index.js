import { useState, useEffect } from 'react';

import { isDateBeforeToday, isSameAsToday } from '../../utils/date';

import { 
    DEFAULT, 
    WARNING_COLOR, 
    ERROR_COLOR,
    WHITE_COLOR,
    EXPIRED,
    TODAY
} from '../../const';

export const DEFAULT_NOTIFICATION = {
    shouldRender: DEFAULT.BOOL_FALSE,
    color: WHITE_COLOR,
    text: DEFAULT.STRING,
};

export const SAME_AS_TODAY_NOTIFICATION = {
    shouldRender: true,
    color: WARNING_COLOR,
    text: TODAY
};

export const DATE_BEFORE_TODAY_NOTIFICATION = {
    shouldRender: true,
    color: ERROR_COLOR,
    text: EXPIRED
}

export const useNotificationBasedOnDate = (date = '') => {
    const [notification, setNotification] = useState(DEFAULT_NOTIFICATION);

    useEffect(() => {
        if (isSameAsToday(date)) {
            setNotification(SAME_AS_TODAY_NOTIFICATION)
        } else if (isDateBeforeToday(date)) {
            setNotification(DATE_BEFORE_TODAY_NOTIFICATION)
        }
    }, [date])

    return [notification]
};