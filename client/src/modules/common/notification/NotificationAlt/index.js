import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT } from '@modules/common/const';

const NotificationAlt = ({ icon = DEFAULT.STRING, topText = DEFAULT.STRING, bottomText = DEFAULT.STRING }) => (
    <div>
        <p className="lh-10">{icon}</p>
        <p className="font-bold">{topText}</p>
        <p>{bottomText}</p>
    </div>
);

NotificationAlt.propTypes = {
    icon: PropTypes.string.isRequired,
    topText: PropTypes.string.isRequired,
    bottomText: PropTypes.string.isRequired,
};

export default NotificationAlt;
