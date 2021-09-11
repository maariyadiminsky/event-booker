import React from "react";
import { createPortal } from "react-dom";

import { stopEventPropagationTry } from "../../utils";

// todo: fix small bug with modal height ie. remove startHeight
const Modal = ({ header, content, cancelButtonText, confirmButtonText, handleConfirm, startHeight = 36}) => {
    const handleCancel = (event) => {
        stopEventPropagationTry(event);
    }

    const handleConfirmButton = (event) => {
        stopEventPropagationTry(event);

        handleConfirm();
    }
// bg-white container w-full h-full max-h-96 max-w-xl m-auto mt-48 shadow-xl rounded
//flex flex-wrap justify-center items-center text-center m-auto align-middle
    return createPortal(
        <div onClick={handleCancel} className="bg-gray-900 min-h-screen m-auto bg-opacity-75 fixed z-10 inset-0 overflow-y-auto overflow-x-auto">
            <div className={`bg-white m-auto mt-${startHeight} pt-10 flex flex-col flex-grow w-full max-w-xl shadow-xl rounded`}>
                <div className="">
                    <div className="m-auto pt-12 pb-3 text-center text-3xl text-green-400 font-semibold align-middle">{header}</div>
                    <div className="m-auto text-center align-middle mt-5">{content}</div>
                    <div className="flex flex-wrap justify-center items-center space-x-5 pb-20 pt-10">
                        <button 
                            onClick={handleCancel} 
                            className="py-3 px-12 text-lg text-white bg-gray-400 rounded hover:bg-gray-300 transition duration-300">
                                {cancelButtonText}
                        </button>
                        <button 
                            onClick={handleConfirmButton} 
                            className="py-3 px-12 text-lg text-white bg-green-400 rounded hover:bg-green-300 transition duration-300">
                                {confirmButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
};

export default Modal;