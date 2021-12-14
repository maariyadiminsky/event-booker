import React from 'react';
import PropTypes from 'prop-types';

import BookingModalContent from './BookingModalContent';
import Modal from '../Modal/Modal';

import { DEFAULT, BOOK_AN_EVENT } from '../../const';

import '../Form/Form.css';

const BookingModal = ({ eventOptions = DEFAULT.NULL, errors = DEFAULT.NULL, formType = DEFAULT.STRING, toggleModal = DEFAULT.NULL, handleOnSubmit = DEFAULT.NULL }) => (
    <Modal 
        header={BOOK_AN_EVENT}
        content={
            <BookingModalContent
                formType={formType}
                errors={errors}
                eventOptions={eventOptions}
                handleOnSubmit={handleOnSubmit}
                handleCancelButton={toggleModal}
            />
        }
        handleCancelModal={toggleModal}
        headerClass="form-header"
        hideSubmitButtons
    />
);

BookingModal.propTypes = {
    eventOptions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            user: PropTypes.shape({
                _id: PropTypes.string.isRequired,
            }).isRequired,
        })
    ),
    errors: PropTypes.arrayOf(PropTypes.string),
    formType: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
};

export default BookingModal;