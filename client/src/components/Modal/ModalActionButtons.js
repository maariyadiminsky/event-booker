import React from "react";

const ModalActionsButtons = ({ toggleModal }) => (
    <div className="flex flex-wrap justify-center items-center space-x-5 pt-5">
        <button 
            onClick={toggleModal} 
            className="py-3 px-12 text-lg text-white bg-gray-400 rounded-md hover:bg-gray-500 transition duration-300">
                Nevermind
        </button>
        <button 
            type="submit"
            className="py-3 px-12 rounded-md text-lg text-white font-semibold bg-green-400 hover:bg-green-500 transition duration-300">
                Submit
        </button>
    </div>
);

export default ModalActionsButtons;