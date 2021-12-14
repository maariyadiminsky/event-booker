import React from 'react';

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

export default EventAlert;