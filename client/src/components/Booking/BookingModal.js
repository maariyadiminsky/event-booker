import React from 'react';

import Loader from '../Loader';
import BookingModalContent from './BookingModalContent';
import Modal from '../Modal/Modal';

import { BOOKINGS_NEED_EVENTS } from '../../const';

import '../Form/Form.css';

const BookingModal = ({ eventOptions, formType, toggleModal, errors, handleOnSubmit }) => {
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
            header="Book an Event"
            content={renderModalContent()}
            handleCancelModal={toggleModal}
            headerClass="form-header"
            hideSubmitButtons
        />
    );
}

export default BookingModal;