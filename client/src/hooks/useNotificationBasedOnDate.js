import { useState, useEffect } from 'react';

import { isDateBeforeToday, isSameAsToday } from '../utils/date';

import { WARNING_COLOR, ERROR_COLOR } from '../const';

export const useNotificationBasedOnDate = (date) => {
    const [notification, setNotification] = useState({
        shouldRender: false,
        color: 'white',
        text: '',
    });

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