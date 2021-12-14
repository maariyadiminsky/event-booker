import React from 'react';

import FormAlert from '../Form/FormAlert';

import { DEFAULT_PARAM } from '../../const';

const EventAlert = ({ alertType = DEFAULT_PARAM.STRING , title = DEFAULT_PARAM.STRING, eventTitle = DEFAULT_PARAM.STRING, message = DEFAULT_PARAM.STRING }) => (
    <FormAlert type={alertType}>
        <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm font-light">The Event <span className="font-semibold">{eventTitle}</span> {message}</p>
        </div>
    </FormAlert>
);

export default EventAlert;