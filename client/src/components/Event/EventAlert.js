import React from 'react';
import PropTypes from 'prop-types';

import FormAlert from '../Form/FormAlert';

import { DEFAULT } from '../../const';

const EventAlert = ({ alertType = DEFAULT.STRING , title = DEFAULT.STRING, eventTitle = DEFAULT.STRING, message = DEFAULT.STRING }) => (
    <FormAlert type={alertType}>
        <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm font-light">The Event <span className="font-semibold">{eventTitle}</span> {message}</p>
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