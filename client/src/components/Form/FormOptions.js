import React from 'react';

import { getDateInCorrectFormat } from '../../utils/date';

import { DEFAULT_PARAM } from '../../const';

const getEventNameForBooking = (title = DEFAULT_PARAM.STRING, price = DEFAULT_PARAM.NULL, date = DEFAULT_PARAM.STRING) => `${title} @ $${price} - (${getDateInCorrectFormat(date)})`;

const FormOptions = ({ name = DEFAULT_PARAM.STRING , options = DEFAULT_PARAM.NULL, onChange = DEFAULT_PARAM.NULL, isBooking = DEFAULT_PARAM.BOOL_FALSE }) => {
    const renderOptionsName = (title = DEFAULT_PARAM.STRING, price = DEFAULT_PARAM.NULL, date = DEFAULT_PARAM.STRING) => isBooking ? getEventNameForBooking(title, price, date) : title;

    return (
        <select 
            name={name} 
            onChange={onChange}
            className="w-full border bg-white rounded px-3 py-2 outline-none"
        >
            <option value={DEFAULT_PARAM.STRING}></option>
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