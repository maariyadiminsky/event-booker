import React from "react";

const getEventNameForBooking = (title, price, date) => `${title} for ${price} on ${date}`;

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