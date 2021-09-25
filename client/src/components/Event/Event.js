import React, { useState, useEffect } from "react";

import { 
    isDateBeforeToday,
    isSameAsToday,
    getDateInCorrectFormat
} from "../../utils/date";

import {
    WARNING_COLOR,
    ERROR_COLOR
} from "../../const";

const Event = ({ event: { title, description, price, date }}) => {
    const [notification, setNotification] = useState({
        shouldRender: false,
        color: "white",
        text: "",
    });

    useEffect(() => {
        if (isSameAsToday(date)) {
            setNotification({
                shouldRender: true,
                color: WARNING_COLOR,
                text: "Today"
            })
        } else if (isDateBeforeToday(date)) {
            setNotification({
                shouldRender: true,
                color: ERROR_COLOR,
                text: "Expired"
            })
        }
    }, [date])

    const renderSmallAlert = () => notification.shouldRender && (
        <div className={`bg-${notification.color}-500 text-gray-100 rounded p-2 mt-5 w-20 text-center opacity-70 border-2 border-${notification.color}-500 text-xs`}>
            {notification.text}
        </div>
    );

    const renderNotification = () => notification.shouldRender && notification.color === WARNING_COLOR && (
        <span className="animate-ping inline-flex h-2 w-2 mr-2 mb-0.5 rounded-full bg-red-500" />
    );

    return (
        <div 
            className="container cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 rounded-lg px-8 py-10 mt-6 border-2 border-green-400 hover:border-green-300 group bg-gradient-to-r hover:from-green-400 hover:to-green-300">
            <div className="flex flex-wrap justify-between">
                <div className="relative">
                    <div className="font-bold text-blue-400 group-hover:text-indigo-500">
                        {renderNotification()}
                        {getDateInCorrectFormat(date)} 
                    </div>
                    <div className="mb-2 text-3xl font-semibold text-green-400 group-hover:text-white">{title}</div>
                    <div className="text-2xl font-thin text-gray-600 group-hover:text-white">{description}</div>
                </div>
                <div>
                <div className="static">
                    <div className="absolute top-5 right-5 text-center align-center text-3xl font-semibold bg-yellow-300 rounded-md text-gray-600 group-hover:text-gray-700 px-2 py-1">
                        {`$${price}`}
                    </div>
                </div>
                </div>
            </div>
            {renderSmallAlert()}
        </div>
    );
}

export default Event;