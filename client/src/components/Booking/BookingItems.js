import React from 'react';
import PropTypes from 'prop-types';

import { getRandomColor } from '../../utils/colors';
import { getDateInCorrectFormat } from '../../utils/date';

import { DEFAULT } from '../../const';

const BookingItems = ({ bookings = DEFAULT.NULL, openCancelModal = DEFAULT.NULL }) => (
    bookings && bookings.map(({ _id = DEFAULT.STRING, event: { title = DEFAULT.STRING, date = DEFAULT.STRING }}) => {
        const color = getRandomColor();
        return (
            <div 
                key={_id}
                className={`relative flex m-auto bg-gradient-to-r h-64 max-h-64 w-72 from-${color}-500 to-${color}-400 hover:from-${color}-400 hover:to-${color}-400 border-2 border-${color}-300 shadow-xl rounded-lg cursor-pointer`}>
                <div className={`absolute inset-x-5 top-5 text-${color}-100 text-xl text-right`}>
                    ✨ {getDateInCorrectFormat(date)}
                </div>
                <div 
                    onClick={() => openCancelModal(_id)}
                    className={`absolute inset-x-5 top-5 font-thin text-${color}-50 text-sm text-left`}
                >
                    Cancel
                </div>
                <div className={`absolute inset-x-5 bottom-5 text-${color}-100 text-4xl font-semibold text-right`}>
                    {title}
                </div>
            </div>
        );
    })
);

BookingItems.propTypes = {
    bookings: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        event: PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            user: PropTypes.shape({
                _id: PropTypes.string.isRequired,
            }),
        })
    })),
    openCancelModal: PropTypes.func,
};

export default BookingItems;