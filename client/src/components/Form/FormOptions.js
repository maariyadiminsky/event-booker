import React from 'react';

import { getDateInCorrectFormat } from '../../utils/date';

import { DEFAULT } from '../../const';

const getEventNameForBooking = (title = DEFAULT.STRING, price = DEFAULT.NULL, date = DEFAULT.STRING) => `${title} @ $${price} - (${getDateInCorrectFormat(date)})`;

const FormOptions = ({ name = DEFAULT.STRING , options = DEFAULT.NULL, onChange = DEFAULT.NULL, isBooking = DEFAULT.BOOL_FALSE }) => {
    const renderOptionsName = (title = DEFAULT.STRING, price = DEFAULT.NULL, date = DEFAULT.STRING) => isBooking ? getEventNameForBooking(title, price, date) : title;

    return (
        <select 
            name={name} 
            onChange={onChange}
            className="w-full border bg-white rounded px-3 py-2 outline-none"
        >
            <option value={DEFAULT.STRING}></option>
            {options.map(({ _id, title, price, date }, index) => (
                <option 
                    key={title} 
                    value={_id}
                    className="py-1"
                >
                    {renderOptionsName(title, price, date)}
                </option>
            ))}
        </select>
    );
}

export default FormOptions;