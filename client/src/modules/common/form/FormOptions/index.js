import React from 'react';
import PropTypes from 'prop-types';

import { getDateInCorrectFormat } from '@modules/common/utils/date';

import { DEFAULT } from '@modules/common/const';

export const getEventNameForBooking = (title = DEFAULT.STRING, price = DEFAULT.NULL, date = DEFAULT.STRING) => `${title} @ $${price} - (${getDateInCorrectFormat(date)})`;
const FormOptions = ({ name = DEFAULT.STRING, options = DEFAULT.NULL, onChange = DEFAULT.NULL, isBooking = DEFAULT.BOOL_FALSE }) => {
    const renderOptionsName = (title = DEFAULT.STRING, price = DEFAULT.NULL, date = DEFAULT.STRING) => isBooking ? getEventNameForBooking(title, price, date) : title;

    return (
        <select 
            name={name} 
            onChange={onChange}
            className="w-full border bg-white rounded px-3 py-2 outline-none"
        >
            <option value={DEFAULT.STRING}></option>
            {options.map(({ _id, title, price, date }) => (
                <option 
                    key={_id} 
                    value={_id}
                    className="py-1"
                >
                    {renderOptionsName(title, price, date)}
                </option>
            ))}
        </select>
    );
}

FormOptions.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    isBooking: PropTypes.bool
}

export default FormOptions;