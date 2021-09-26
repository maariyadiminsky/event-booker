import React from "react";
import { Form } from "react-final-form";

import FormErrors from "../Form/FormErrors";
import Modal from "../Modal/Modal";
import ModalActionsButtons from "../Modal/ModalActionButtons";

import "../Form/Form.css";

const CancelWarningModal = ({ header, toggleModal, serverErrors, handleOnSubmit }) => {
    const renderServerErrors = () => serverErrors.length > 0 && (
        <FormErrors errors={serverErrors} />
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
                        {renderServerErrors()}
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