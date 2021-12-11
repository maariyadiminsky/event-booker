import React from 'react';

import Event from './Event';

const EventItems = ({ userId, events, toggleCancelModal, setCancelEventId }) => (
    events.map((event, index) => (
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