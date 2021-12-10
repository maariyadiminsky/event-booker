import React from 'react';

import EventModalContent from './EventModalContent';
import Modal from '../Modal/Modal';

import '../Form/Form.css';

const EventModal = ({ toggleModal, errors, handleOnSubmit }) => (
    <Modal 
        header="Create an Event"
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

export default EventModal;