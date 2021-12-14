import React from 'react';

import { DEFAULT_PARAM } from '../../const';

const NotificationAlt = ({ icon = DEFAULT_PARAM.STRING, topText = DEFAULT_PARAM.STRING, bottomText = DEFAULT_PARAM.STRING }) => (
    <div>
        <p className="lh-10">{icon}</p>
        <p className="font-bold">{topText}</p>
        <p>{bottomText}</p>
    </div>
);

export default NotificationAlt;
