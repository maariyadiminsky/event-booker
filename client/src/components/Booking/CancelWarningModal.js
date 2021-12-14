import React from 'react';

import CancelWarningModalContent from './CancelWarningModalContent';
import Modal from '../Modal/Modal';

import { DEFAULT_PARAM } from '../../const';

import '../Form/Form.css';

const CancelWarningModal = ({ header = DEFAULT_PARAM.STRING, errors = DEFAULT_PARAM.NULL, toggleModal = DEFAULT_PARAM.NULL, handleOnSubmit = DEFAULT_PARAM.NULL }) => (
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