import React from "react";

import { 
    isDateBeforeToday,
    getDateInCorrectFormat
} from "../../utils/date";

const Event = ({ title, description, price, date }, index) => (
    <div 
        key={index}
        className="container cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 rounded-lg px-8 py-10 mt-6 border-2 border-green-400 group bg-gradient-to-r hover:from-green-400 hover:to-green-300">
        <div className="flex flex-wrap justify-between">
            <div>
                <div className="font-bold text-blue-400 group-hover:text-indigo-500">{getDateInCorrectFormat(date)}</div>
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
        {isDateBeforeToday(date) && (
            <div className="bg-red-500 text-gray-100 rounded p-2 mt-5 w-20 text-center opacity-70 border-2 border-red-500 text-xs">Expired</div>
        )}
    </div>
);

export default Event;