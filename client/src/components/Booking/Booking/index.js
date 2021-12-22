import React from 'react';
import PropTypes from 'prop-types';

import { getDateInCorrectFormat } from '../../../utils/date';

export const getDate = (date) => `✨ ${getDateInCorrectFormat(date)}`;
const Booking = (({ _id, eventTitle, eventDate, color, openCancelModal }) => (
    <div 
        key={_id}
        className={`relative flex m-auto bg-gradient-to-r h-64 max-h-64 w-72 from-${color}-500 to-${color}-400 hover:from-${color}-400 hover:to-${color}-400 border-2 border-${color}-300 shadow-xl rounded-lg cursor-pointer`}>
        <div className={`absolute inset-x-5 top-5 text-${color}-100 text-xl text-right`}>
            {getDate(eventDate)}
        </div>
        <button 
            onClick={() => openCancelModal(_id)}
            className={`absolute inset-x-5 top-5 font-thin text-${color}-50 text-sm text-left`}
        >
            Cancel
        </button>
        <div className={`absolute inset-x-5 bottom-5 text-${color}-100 text-4xl font-semibold text-right`}>
            {eventTitle}
        </div>
    </div>
));

Booking.propTypes = {
    _id: PropTypes.string.isRequired,
    eventTitle: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    openCancelModal: PropTypes.func.isRequired
};

export default Booking;