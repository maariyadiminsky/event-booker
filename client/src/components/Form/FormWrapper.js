import React from 'react';
import { Form } from 'react-final-form';

import FormErrors from './FormErrors';
import ButtonTwoGroup from '../Button/ButtonTwoGroup';

import { validateForm } from '../../utils/auth';
import { DEFAULT, SUBMIT, NEVERMIND, ERROR_COLOR, SUCCESS_COLOR } from '../../const';

const buttonColor = (isCancelModal = DEFAULT.BOOL_FALSE) => isCancelModal ? ERROR_COLOR : SUCCESS_COLOR;
const FormWrapper = ({ 
    children = DEFAULT.FUNCTION, errors = DEFAULT.NULL, formType = DEFAULT.STRING, initialValues = DEFAULT.NULL,
    handleOnSubmit = DEFAULT.NULL, handleCancelButton = DEFAULT.NULL, formCSS = 'form-wrapper', formContainerCSS = 'form-container',
    shouldValidate = DEFAULT.BOOL_TRUE, shouldResetOnSubmit = DEFAULT.BOOL_FALSE, isCancelModal = DEFAULT.BOOL_FALSE,
    topContent=DEFAULT.NULL, confirmButtonText = SUBMIT, cancelButtonText = NEVERMIND,
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

    const handleSubmitResetTry = (handleSubmit = DEFAULT.NULL, form = DEFAULT.NULL) => shouldResetOnSubmit ? (
        async(event) => {
            await handleSubmit(event);
            form.reset();
        }
    ) : handleSubmit;

    return (
        <Form 
            initialValues={initialValues ? initialValues : null}
            validate={shouldValidate && formType ? (fields = DEFAULT.UNDEFINED) => validateForm(fields, formType) : null}
            onSubmit={handleOnSubmit}>
            {({ handleSubmit = DEFAULT.NULL, form = DEFAULT.NULL }) => (
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