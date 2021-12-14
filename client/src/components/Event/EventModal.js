import React from 'react';

import EventModalContent from './EventModalContent';
import Modal from '../Modal/Modal';

import { DEFAULT, CREATE_AN_EVENT } from '../../const';

import '../Form/Form.css';

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

export default EventModal;