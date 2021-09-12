import React from "react";
import { createPortal } from "react-dom";

import { shouldStopEventPropagationTry } from "../../utils";

// todo: fix small bug with modal height ie. remove startHeight
const Modal = ({ 
    header, content, 
    cancelButtonText, confirmButtonText, 
    handleConfirm, handleCancelModal, 
    headerClass,
    buttonClass,
    startHeight = 32
}) => {
    const handleCancel = (event) => {
        if (shouldStopEventPropagationTry(event)) {
            handleCancelModal();
        }

        console.log("In handleCancel");
    }

    const handleConfirmButton = (event) => {
        console.log("In handleConfirm");
        if (shouldStopEventPropagationTry(event)) {
            console.log("In handleConfirm 2");
            handleConfirm();
        }
    }

    const defaultHeaderClass = headerClass ? headerClass : "pb-3 text-center text-3xl text-green-400 font-semibold";
    const defaultButtonClass = buttonClass ? buttonClass : "text-white bg-green-400 font-semibold hover:bg-green-300 transition duration-300";

    return createPortal(
        <div onClick={handleCancel} className="bg-gray-900 min-h-screen m-auto bg-opacity-75 fixed z-10 inset-0 overflow-y-auto overflow-x-auto">
            <div className={`bg-white m-auto mt-${startHeight} py-12 flex flex-col flex-grow w-full max-w-xl shadow-xl rounded-lg`}>
                <div className="">
                    <div className={`m-auto align-middle ${defaultHeaderClass}`}>{header}</div>
                    <div className="m-auto text-center align-middle mt-5">{content}</div>
                    <div className="flex flex-wrap justify-center items-center space-x-5 pt-10">
                        <button 
                            onClick={handleCancel} 
                            className="py-3 px-12 text-lg text-white bg-gray-400 rounded-md hover:bg-gray-300 transition duration-300">
                                {cancelButtonText}
                        </button>
                        <button 
                            onClick={handleConfirmButton} 
                            className={`py-3 px-12 rounded-md text-lg ${defaultButtonClass}`}>
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