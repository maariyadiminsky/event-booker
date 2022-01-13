import React from 'react';
import PropTypes from 'prop-types';

import BookingModalContent from '@modules/bookings/components/BookingModalContent';
import Modal from '@modules/common/modal/Modal';

import { DEFAULT, BOOK_AN_EVENT } from '@modules/common/const';

import '@modules/common/form/Form.css';

const BookingModal = ({ eventOptions = DEFAULT.NULL, errors = DEFAULT.NULL, formType = DEFAULT.STRING, toggleModal = DEFAULT.FUNCTION, handleOnSubmit = DEFAULT.FUNCTION }) => (
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
    errors: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string
        })
    ),
    formType: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
};

export default BookingModal;