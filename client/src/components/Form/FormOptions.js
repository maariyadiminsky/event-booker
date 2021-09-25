import React from "react";

import { getDateInCorrectFormat } from "../../utils/date";

const getEventNameForBooking = (title, price, date) => `${title} @ $${price} - (${getDateInCorrectFormat(date)})`;

const FormOptions = ({ name, options, onChange, isBooking }) => {
    const renderOptionsName = (title, price, date) => isBooking ? getEventNameForBooking(title, price, date) : title;

    return (
        <select 
            name={name} 
            onChange={onChange}
            className="w-full border bg-white rounded px-3 py-2 outline-none"
        >
            <option value=""></option>
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