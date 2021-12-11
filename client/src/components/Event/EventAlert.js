import React from 'react';

import FormAlert from '../Form/FormAlert';

const EventAlert = ({ alertType, title, eventTitle, message }) => (
    <FormAlert type={alertType}>
        <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm font-light">The Event <span className="font-semibold">{eventTitle}</span> {message}</p>
        </div>
    </FormAlert>
);

export default EventAlert;