import React from 'react';

import { ERROR_COLOR } from '../../const';

const NotificationPing = ({ color = ERROR_COLOR }) => (
    <span className={`animate-ping inline-flex h-2 w-2 mr-2 mb-0.5 rounded-full bg-${color}-500`} />
);

export default NotificationPing;