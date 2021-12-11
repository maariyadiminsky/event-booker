import React from 'react';

const NotificationAlt = ({ icon, topText, bottomText }) => (
    <div>
        <p className="lh-10">{icon}</p>
        <p className="font-bold">{topText}}</p>
        <p>{bottomText}</p>
    </div>
);

export default NotificationAlt;
