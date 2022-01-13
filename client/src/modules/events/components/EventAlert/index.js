import React from 'react';
import PropTypes from 'prop-types';

import FormAlert from '@modules/common/form/FormAlert';

import { DEFAULT } from '@modules/common/const';

export const setMessage = (eventTitle, message) => `The Event <span className="font-semibold">${eventTitle}</span> ${message}`;
const EventAlert = ({ alertType = DEFAULT.STRING, title = DEFAULT.STRING, eventTitle = DEFAULT.STRING, message = DEFAULT.STRING }) => (
    <FormAlert type={alertType}>
        <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm font-light">{setMessage(eventTitle, message)}</p>
        </div>
    </FormAlert>
);

EventAlert.propTypes = {
    alertType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    eventTitle: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default EventAlert;