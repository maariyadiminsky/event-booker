import React from 'react';
import { Form } from 'react-final-form';

import FormErrors from './FormErrors';
import ButtonTwoGroup from '../Button/ButtonTwoGroup';

import { validateForm } from '../../utils/auth';

const FormWrapper = ({ 
    children, errors, formType = '', initialValues = null,
    handleOnSubmit, handleCancelButton = null,
    shouldValidate = true, isCancelModal = false,
    confirmButtonText = 'Submit', cancelButtonText = 'Nevermind'
 }) => {
    const renderErrors = () => errors.length > 0 && (
        <FormErrors errors={errors} />
    );

    const renderButtonGroup = () => handleCancelButton && (
        <ButtonTwoGroup
            defaultClass={`text-white font-semibold bg-${isCancelModal ? 'red' : 'green'}-400 hover:bg-${isCancelModal ? 'red' : 'green'}-500 transition duration-300`}
            handleCancel={handleCancelButton}
            confirmText={confirmButtonText}
            cancelText={cancelButtonText}
        />
    );

    return (
        <Form 
            initialValues={initialValues ? initialValues : null}
            validate={shouldValidate && formType ? (fields) => validateForm(fields, formType) : null}
            onSubmit={handleOnSubmit}>
            {({ handleSubmit }) => (
                <div className="form-wrapper">
                    <form
                        onSubmit={handleSubmit} 
                        className="form-container"
                    >
                        {renderErrors()}
                        {children}
                        {renderButtonGroup()}
                    </form>
                </div>
            )}
        </Form>
    );
}

export default FormWrapper;