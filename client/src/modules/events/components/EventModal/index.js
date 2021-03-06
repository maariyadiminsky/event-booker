import React from 'react';
import PropTypes from 'prop-types';

import EventModalContent from '@modules/events/components/EventModalContent';
import Modal from '@modules/common/modal/Modal';

import { DEFAULT, CREATE_AN_EVENT } from '@modules/common/const';

import '@modules/common/form/Form.css';

const EventModal = ({ errors = DEFAULT.NULL, toggleModal = DEFAULT.NULL, handleOnSubmit = DEFAULT.NULL }) => (
    <Modal 
        header={CREATE_AN_EVENT}
        content={
            <EventModalContent
                errors={errors}
                handleOnSubmit={handleOnSubmit}
                handleCancelButton={toggleModal}
            />
        }
        handleCancelModal={toggleModal}
        headerClass="form-header"
        hideSubmitButtons
    />
);

EventModal.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
    toggleModal: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
};

export default EventModal;