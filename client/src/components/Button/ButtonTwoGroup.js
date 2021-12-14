import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT, SUBMIT, NEVERMIND } from '../../const';

const ButtonTwoGroup = ({ defaultClass = DEFAULT.STRING, confirmText = SUBMIT, cancelText = NEVERMIND, handleCancel = DEFAULT.NULL, handleConfirm = DEFAULT.NULL }) => (
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

ButtonTwoGroup.propTypes = {
    defaultClass: PropTypes.string,
    confirmText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func,
};

export default ButtonTwoGroup;