import React from 'react';
import PropTypes from 'prop-types';

import Booking from '@modules/bookings/components/Booking';

import { getRandomColor } from '@modules/common/utils/colors';

import { DEFAULT } from '@modules/common/const';

const BookingItems = ({ bookings = DEFAULT.NULL, openCancelModal = DEFAULT.NULL }) => (
    bookings && bookings.map(({ _id = DEFAULT.STRING, event: { title = DEFAULT.STRING, date = DEFAULT.STRING }}) => (
        <Booking
            key={_id}
            _id={_id}
            eventTitle={title}
            eventDate={date}
            color={getRandomColor()}
            openCancelModal={openCancelModal}
        />
    ))
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