import React from 'react';
import { createPortal } from 'react-dom';

import { shouldStopEventPropagationTry } from '../../utils';

import ButtonTwoGroup from '../Button/ButtonTwoGroup';

// todo: fix small bug with modal height ie. remove startHeight
const Modal = ({ 
    header, content, 
    cancelButtonText, confirmButtonText, 
    handleConfirm, handleCancelModal, 
    customSubmitButtons,
    hideSubmitButtons = false,
    headerClass, buttonClass,
    startHeight = 20
}) => {
    const handleCancel = (event) => {
        if (shouldStopEventPropagationTry(event)) {
            handleCancelModal();
        }
    }

    const handleConfirmButton = (event) => {
        if (shouldStopEventPropagationTry(event)) {
            handleConfirm();
        }
    }

    const renderSubmitButtons = () => customSubmitButtons ? 
        customSubmitButtons : (
            <ButtonTwoGroup
                defaultClass={defaultButtonClass}
                confirmText={confirmButtonText}
                cancelText={cancelButtonText}
                handleCancel={handleCancel}
                handleConfirmButton={handleConfirmButton}
            />
        );

    const defaultHeaderClass = headerClass ? headerClass : 'pb-3 text-center text-3xl text-green-400 font-semibold';
    const defaultButtonClass = buttonClass ? buttonClass : 'text-white bg-green-400 font-semibold hover:bg-green-300 transition duration-300';

    return createPortal(
        <div 
            data-testid="modal-portal"
            onClick={handleCancel} 
            className="bg-gray-900 min-h-screen m-auto bg-opacity-75 fixed z-10 inset-0 overflow-y-auto overflow-x-auto"
        >
            <div className={`bg-white m-auto mt-${startHeight} py-12 flex flex-col flex-grow w-full max-w-xl shadow-xl rounded-lg`}>
                <div className="">
                    <div className={`m-auto align-middle ${defaultHeaderClass}`}>{header}</div>
                    <div className="m-auto text-center align-middle mt-5">{content}</div>
                    {!hideSubmitButtons && renderSubmitButtons()}
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
};

export default Modal;