import React from 'react';

const Notification = ({ text, color = 'red' }) => (
    <div className={`bg-${color}-500 text-gray-100 rounded p-2 mt-5 w-20 text-center opacity-70 border-2 border-${color}-500 text-xs`}>
        {text}
    </div>
);

export default Notification;