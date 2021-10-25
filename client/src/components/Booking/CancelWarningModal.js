import React from "react";
import { Form } from "react-final-form";

import FormErrors from "../Form/FormErrors";
import Modal from "../Modal/Modal";
import ModalActionsButtons from "../Modal/ModalActionButtons";

import "../Form/Form.css";

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
                        <ModalActionsButtons 
                            submitText="Yes I'm sure"
                            toggleModal={toggleModal} 
                            submitButtonColor="red"
                        />
                    </form>
                </div>
            )}
        </Form>
    );

    return (
        <Modal 
            header={header}
            content={renderModalContent()}
            handleCancelModal={toggleModal}
            headerClass="pb-3 text-center text-3xl text-red-400 font-semibold"
            hideSubmitButtons
            startHeight={40}
        />
    );
}

export default CancelWarningModal;