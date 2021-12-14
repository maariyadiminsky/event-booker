import React from 'react';

import Loader from '../Loader';
import BookingModalContent from './BookingModalContent';
import Modal from '../Modal/Modal';

import { DEFAULT_PARAM, BOOKINGS_NEED_EVENTS, BOOK_AN_EVENT } from '../../const';

import '../Form/Form.css';

const BookingModal = ({ eventOptions = DEFAULT_PARAM.NULL, formType = DEFAULT_PARAM.STRING, errors = DEFAULT_PARAM.NULL, toggleModal = DEFAULT_PARAM.NULL, handleOnSubmit = DEFAULT_PARAM.NULL, }) => {
    const renderModalContent = () => {
        if (!eventOptions) {
            return <Loader height={0} />;
        }
        
        if (eventOptions && eventOptions.length === 0) {
            return (
                <div className="font-light">
                    ⚠ {BOOKINGS_NEED_EVENTS}
                </div>
            );
        }

        return (
            <BookingModalContent
                formType={formType}
                errors={errors}
                eventOptions={eventOptions}
                handleOnSubmit={handleOnSubmit}
                handleCancelButton={toggleModal}
            />
        );
    }

    return (
        <Modal 
            header={BOOK_AN_EVENT}
            content={renderModalContent()}
            handleCancelModal={toggleModal}
            headerClass="form-header"
            hideSubmitButtons
        />
    );
}

export default BookingModal;