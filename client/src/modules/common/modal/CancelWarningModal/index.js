import React from 'react';
import PropTypes from 'prop-types';

import CancelWarningModalContent from '@modules/common/modal/CancelWarningModalContent';
import Modal from '@modules/common/modal/Modal';

import { DEFAULT } from '@modules/common/const';

import '@modules/common/form/Form.css';

const CancelWarningModal = ({ header = DEFAULT.STRING, errors = DEFAULT.NULL, toggleModal = DEFAULT.NULL, handleOnSubmit = DEFAULT.NULL }) => (
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

CancelWarningModal.propTypes = {
    header: PropTypes.string.isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    toggleModal: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
};

export default CancelWarningModal;