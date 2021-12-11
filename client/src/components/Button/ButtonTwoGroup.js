import React from 'react';

const ButtonTwoGroup = ({ 
    defaultClass, confirmText = 'Submit', cancelText = 'Nevermind', 
    handleCancel, handleConfirm = null
}) => (
    <div className="flex flex-wrap justify-center items-center space-x-5 pt-5">
        <button 
            onClick={handleCancel} 
            className="py-3 px-12 text-lg text-white bg-gray-400 rounded-md hover:bg-gray-500 transition duration-300"
        >
                {cancelText}
        </button>
        <button 
            type="submit"
            onClick={handleConfirm} 
            className={`py-3 px-12 rounded-md text-lg ${defaultClass}`}
        >
                {confirmText}
        </button>
    </div>
);

export default ButtonTwoGroup;