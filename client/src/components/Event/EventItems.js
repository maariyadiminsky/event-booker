import React from 'react';
import PropTypes from 'prop-types';

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

EventItems.propTypes = {
    userId: PropTypes.string,
    toggleCancelModal: PropTypes.func.isRequired,
    setCancelEventId: PropTypes.func.isRequired,
    events: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            user: PropTypes.shape({
                _id: PropTypes.string.isRequired,
            }),
        }).isRequired
    ),
};

export default EventItems;