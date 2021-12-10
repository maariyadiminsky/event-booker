import React from 'react';

const NotificationPing = ({ color = 'red' }) => (
    <span className={`animate-ping inline-flex h-2 w-2 mr-2 mb-0.5 rounded-full bg-${color}-500`} />
);

export default NotificationPing;