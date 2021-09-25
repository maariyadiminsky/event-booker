import React from "react";

import { getDateInCorrectFormat } from "../../utils/date";

const getEventNameForBooking = (title, price, date) => `${title} @ $${price} - (${getDateInCorrectFormat(date)})`;

const FormOptions = ({ name, options, onChange, isBooking }) => {
    const renderOptionsName = (title, price, date) => isBooking ? getEventNameForBooking(title, price, date) : title;

    return (
        <select name={name} onChange={onChange}>
            {options.map(({ title, price, date }) => (
                <option key={title} value={title}>{renderOptionsName(title, price, date)}</option>
            ))}
        </select>
    );
}

export default FormOptions;