import React from 'react';
import { createPortal } from 'react-dom';

import { shouldStopEventPropagationTry } from '../../utils';
import { DEFAULT_PARAM } from '../../const';

import ButtonTwoGroup from '../Button/ButtonTwoGroup';

const defaultHeaderClass = (headerClass = DEFAULT_PARAM.STRING) => headerClass ? headerClass : 'pb-3 text-center text-3xl text-green-400 font-semibold';
const defaultButtonClass = (buttonClass = DEFAULT_PARAM.STRING) => buttonClass ? buttonClass : 'text-white bg-green-400 font-semibold hover:bg-green-300 transition duration-300';

const Modal = ({ 
    header = DEFAULT_PARAM.STRING, content = DEFAULT_PARAM.STRING, 
    cancelButtonText = DEFAULT_PARAM.STRING, confirmButtonText = DEFAULT_PARAM.STRING, 
    handleConfirm = DEFAULT_PARAM.NULL, handleCancelModal = DEFAULT_PARAM.NULL, 
    customSubmitButtons = DEFAULT_PARAM.NULL,
    hideSubmitButtons = DEFAULT_PARAM.BOOL_FALSE,
    headerClass = DEFAULT_PARAM.STRING, buttonClass = DEFAULT_PARAM.STRING,
    startHeight = 20
}) => {
    const handleCancel = (event = DEFAULT_PARAM.NULL) => {
        if (shouldStopEventPropagationTry(event)) {
            handleCancelModal();
        }
    }

    const handleConfirmButton = (event = DEFAULT_PARAM.NULL) => {
        if (shouldStopEventPropagationTry(event)) {
            handleConfirm();
        }
    }

    const renderSubmitButtons = () => customSubmitButtons ? 
        customSubmitButtons : (
            <ButtonTwoGroup
                defaultClass={defaultButtonClass(buttonClass)}
                confirmText={confirmButtonText}
                cancelText={cancelButtonText}
                handleCancel={handleCancel}
                handleConfirmButton={handleConfirmButton}
            />
        );

    return createPortal(
        <div 
            data-testid="modal-portal"
            onClick={handleCancel} 
            className="bg-gray-900 min-h-screen m-auto bg-opacity-75 fixed z-10 inset-0 overflow-y-auto overflow-x-auto"
        >
            <div className={`bg-white m-auto mt-${startHeight} py-12 flex flex-col flex-grow w-full max-w-xl shadow-xl rounded-lg`}>
                <div className="">
                    <div className={`m-auto align-middle ${defaultHeaderClass(headerClass)}`}>{header}</div>
                    <div className="m-auto text-center align-middle mt-5">{content}</div>
                    {!hideSubmitButtons && renderSubmitButtons()}
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
};

export default Modal;