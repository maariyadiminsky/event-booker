import React from 'react';
import { Form } from 'react-final-form';

import FormErrors from '../Form/FormErrors';
import Modal from '../Modal/Modal';
import ButtonTwoGroup from '../Button/ButtonTwoGroup';

import '../Form/Form.css';
import CancelWarningModalContent from './CancelWarningModalContent';

const CancelWarningModal = ({ header, toggleModal, errors, handleOnSubmit }) => {
    const renderErrors = () => errors.length > 0 && (
        <FormErrors errors={errors} />
    );

    const renderModalContent = () => (
        <Form 
            onSubmit={handleOnSubmit}>
            {({ handleSubmit }) => (
                <div className="form-wrapper">
                    <form
                        onSubmit={handleSubmit} 
                        className="form-container"
                    >
                        {renderErrors()}
                        <div className="text-center text-gray-400 text-2xl pb-4 px-3">Are you sure?</div>
                        <ButtonTwoGroup
                            defaultClass='text-white font-semibold bg-red-400 hover:bg-red-500 transition duration-300'
                            confirmText={'Yes I\'m sure'}
                            handleCancel={toggleModal}
                        />
                    </form>
                </div>
            )}
        </Form>
    );

    return (
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
}

export default CancelWarningModal;