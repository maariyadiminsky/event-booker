import React from 'react';

const ModalActionsButtons = ({ toggleModal, cancelText = 'Nevermind', submitText='Submit', submitButtonColor='green'}) => (
    <div className="flex flex-wrap justify-center items-center space-x-5 pt-5">
        <button 
            onClick={toggleModal} 
            className="py-3 px-12 text-lg text-white bg-gray-400 rounded-md hover:bg-gray-500 transition duration-300">
                {cancelText}
        </button>
        <button 
            type="submit"
            className={`py-3 px-12 rounded-md text-lg text-white font-semibold bg-${submitButtonColor}-400 hover:bg-${submitButtonColor}-500 transition duration-300`}>
                {submitText}
        </button>
    </div>
);

export default ModalActionsButtons;