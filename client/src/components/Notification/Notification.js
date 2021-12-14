import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT, ERROR_COLOR } from '../../const';

const Notification = ({ text = DEFAULT.STRING, color = ERROR_COLOR }) => (
    <div className={`bg-${color}-500 text-gray-100 rounded p-2 mt-5 w-20 text-center opacity-70 border-2 border-${color}-500 text-xs`}>
        {text}
    </div>
);

Notification.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export default Notification;