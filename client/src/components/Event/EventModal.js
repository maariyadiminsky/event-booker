import React from 'react';

import EventModalContent from './EventModalContent';
import Modal from '../Modal/Modal';

import { DEFAULT_PARAM, CREATE_AN_EVENT } from '../../const';

import '../Form/Form.css';

const EventModal = ({ errors = DEFAULT_PARAM.NULL, toggleModal = DEFAULT_PARAM.NULL, handleOnSubmit = DEFAULT_PARAM.NULL }) => (
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