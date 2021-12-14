import React from 'react';

import Event from './Event';

import { DEFAULT } from '../../const';

const EventItems = ({ userId = DEFAULT.NULL, events = DEFAULT.NULL, toggleCancelModal = DEFAULT.NULL, setCancelEventId = DEFAULT.NULL }) => (
    events.map((event = DEFAULT.NULL, index = DEFAULT.NULL) => (
        <Event 
            key={index}
            event={event} 
            userId={userId}
            toggleCancelModal={toggleCancelModal}
            setCancelEventId={(id) => setCancelEventId(id)}
        />
    ))
);

export default EventItems;