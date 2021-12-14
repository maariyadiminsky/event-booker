import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { shouldStopEventPropagationTry } from '../../utils';
import { DEFAULT } from '../../const';

import ButtonTwoGroup from '../Button/ButtonTwoGroup';

const defaultHeaderClass = (headerClass = DEFAULT.STRING) => headerClass ? headerClass : 'pb-3 text-center text-3xl text-green-400 font-semibold';
const defaultButtonClass = (buttonClass = DEFAULT.STRING) => buttonClass ? buttonClass : 'text-white bg-green-400 font-semibold hover:bg-green-300 transition duration-300';

const Modal = ({ 
    header = DEFAULT.STRING, content = DEFAULT.STRING, 
    cancelButtonText = DEFAULT.STRING, confirmButtonText = DEFAULT.STRING, 
    handleConfirm = DEFAULT.NULL, handleCancelModal = DEFAULT.NULL, 
    customSubmitButtons = DEFAULT.NULL,
    hideSubmitButtons = DEFAULT.BOOL_FALSE,
    headerClass = DEFAULT.STRING, buttonClass = DEFAULT.STRING,
    startHeight = 20
}) => {
    const handleCancel = (event = DEFAULT.NULL) => {
        if (shouldStopEventPropagationTry(event)) {
            handleCancelModal();
        }
    }

    const handleConfirmButton = (event = DEFAULT.NULL) => {
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

Modal.propTypes = {
    headerClass: PropTypes.string,
    buttonClass: PropTypes.string,
    startHeight: PropTypes.number,
    header: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cancelButtonText: PropTypes.isRequired,
    confirmButtonText: PropTypes.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    handleCancelModal: PropTypes.func.isRequired,
    hideSubmitButtons: PropTypes.bool.isRequired,
    customSubmitButtons: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
};

export default Modal;