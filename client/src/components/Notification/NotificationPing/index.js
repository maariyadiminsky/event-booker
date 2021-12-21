import React from 'react';
import PropTypes from 'prop-types';

import { ERROR_COLOR } from '../../../const';

export const setNotificationPingCSS = (color) => `animate-ping inline-flex h-2 w-2 mr-2 mb-0.5 rounded-full bg-${color}-500`;
const NotificationPing = ({ color = ERROR_COLOR }) => (
    <span className={setNotificationPingCSS(color)} />
);

NotificationPing.propTypes = {
    color: PropTypes.string,
};

export default NotificationPing;