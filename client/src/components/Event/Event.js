import React from 'react';

import Button from '../Button/Button';
import Notification from '../Notification/Notification';
import NotificationPing from '../Notification/NotificationPing';

import { useNotificationBasedOnDate } from '../../hooks/useNotificationBasedOnDate';
import { getDateInCorrectFormat } from '../../utils/date';
import { DEFAULT_PARAM, WARNING_COLOR } from '../../const';

const Event = ({ 
    toggleCancelModal = DEFAULT_PARAM.NULL, 
    setCancelEventId = DEFAULT_PARAM.NULL,
    userId = DEFAULT_PARAM.NULL, 
    event: { _id = DEFAULT_PARAM.NULL, title = DEFAULT_PARAM.STRING, description = DEFAULT_PARAM.STRING, price = DEFAULT_PARAM.NULL, date = DEFAULT_PARAM.STRING, user = DEFAULT_PARAM.NULL }
}) => {
    const [notification] = useNotificationBasedOnDate(date);

    const openCancelModal = () => {
        setCancelEventId(_id);
        toggleCancelModal();
    }

    const renderSmallAlert = () => notification.shouldRender && (
        <Notification 
            text={notification.text} 
            color={notification.color} 
        />
    );

    const renderNotification = () => notification.shouldRender && notification.color === WARNING_COLOR && (
        <NotificationPing />
    );
    
    const isCreatorOfEvent = userId === user._id;
    const renderRemoveOption = () => isCreatorOfEvent && (
        <Button
            handleOnClick={openCancelModal}
            buttonCSS='absolute bottom-10 right-5 text-center align-center text-sm font-thin bg-red-400 hover:bg-red-300 rounded-sm text-white px-2 py-1'
        >
            ✏️ Remove
        </Button>
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
                <div className="static">
                    {renderRemoveOption()}
                </div>
                </div>
            </div>
            {renderSmallAlert()}
        </div>
    );
}

export default Event;