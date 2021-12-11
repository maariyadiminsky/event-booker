import React from 'react';
import { Form } from 'react-final-form';

import FormErrors from './FormErrors';
import ButtonTwoGroup from '../Button/ButtonTwoGroup';

import { validateForm } from '../../utils/auth';
import { ERROR_COLOR, SUCCESS_COLOR } from '../../const';

const buttonColor = (isCancelModal) => isCancelModal ? ERROR_COLOR : SUCCESS_COLOR;
const FormWrapper = ({ 
    children, errors, formType = '', initialValues = null,
    handleOnSubmit, handleCancelButton = null, formCSS = 'form-wrapper', formContainerCSS = 'form-container',
    shouldValidate = true, shouldResetOnSubmit = false, isCancelModal = false,
    topContent=null, confirmButtonText = 'Submit', cancelButtonText = 'Nevermind',
 }) => {
    const renderErrors = () => errors && errors.length > 0 && (
        <FormErrors errors={errors} />
    );

    const renderButtonGroup = () => handleCancelButton && (
        <ButtonTwoGroup
            defaultClass={`text-white font-semibold bg-${buttonColor(isCancelModal)}-400 hover:bg-${buttonColor(isCancelModal)}-500 transition duration-300`}
            handleCancel={handleCancelButton}
            confirmText={confirmButtonText}
            cancelText={cancelButtonText}
        />
    );

    const handleSubmitResetTry = (handleSubmit, form) => shouldResetOnSubmit ? (
        async(event) => {
            await handleSubmit(event);
            form.reset();
        }
    ) : handleSubmit;

    return (
        <Form 
            initialValues={initialValues ? initialValues : null}
            validate={shouldValidate && formType ? (fields) => validateForm(fields, formType) : null}
            onSubmit={handleOnSubmit}>
            {({ handleSubmit, form }) => (
                <div className={formCSS}>
                    <form
                        onSubmit={handleSubmitResetTry(handleSubmit, form)} 
                        className={formContainerCSS}
                    >
                        {topContent}
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