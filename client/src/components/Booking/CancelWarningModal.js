import React from 'react';

import CancelWarningModalContent from './CancelWarningModalContent';
import Modal from '../Modal/Modal';

import '../Form/Form.css';

const CancelWarningModal = ({ header, toggleModal, errors, handleOnSubmit }) => (
    <Modal 
        header={header}
        content={
            <CancelWarningModalContent
                errors={errors}
                handleOnSubmit={handleOnSubmit}
                handleCancelButton={toggleModal}
            />
        }
        handleCancelModal={toggleModal}
        headerClass="pb-3 text-center text-3xl text-red-400 font-semibold"
        hideSubmitButtons
        startHeight={40}
    />
);

export default CancelWarningModal;