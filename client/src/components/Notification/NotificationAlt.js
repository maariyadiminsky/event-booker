import React from 'react';

import { DEFAULT } from '../../const';

const NotificationAlt = ({ icon = DEFAULT.STRING, topText = DEFAULT.STRING, bottomText = DEFAULT.STRING }) => (
    <div>
        <p className="lh-10">{icon}</p>
        <p className="font-bold">{topText}</p>
        <p>{bottomText}</p>
    </div>
);

export default NotificationAlt;
