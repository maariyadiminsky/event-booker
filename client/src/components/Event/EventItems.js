import React from 'react';

import Event from './Event';

import { DEFAULT_PARAM } from '../../const';

const EventItems = ({ userId = DEFAULT_PARAM.NULL, events = DEFAULT_PARAM.NULL, toggleCancelModal = DEFAULT_PARAM.NULL, setCancelEventId = DEFAULT_PARAM.NULL }) => (
    events.map((event = DEFAULT_PARAM.NULL, index = DEFAULT_PARAM.NULL) => (
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