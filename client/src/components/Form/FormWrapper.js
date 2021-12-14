import React from 'react';
import { Form } from 'react-final-form';

import FormErrors from './FormErrors';
import ButtonTwoGroup from '../Button/ButtonTwoGroup';

import { validateForm } from '../../utils/auth';
import { DEFAULT_PARAM, SUBMIT, NEVERMIND, ERROR_COLOR, SUCCESS_COLOR } from '../../const';

const buttonColor = (isCancelModal = DEFAULT_PARAM.BOOL_FALSE) => isCancelModal ? ERROR_COLOR : SUCCESS_COLOR;
const FormWrapper = ({ 
    children = DEFAULT_PARAM.FUNCTION_COMPONENT, errors = DEFAULT_PARAM.NULL, formType = DEFAULT_PARAM.STRING, initialValues = DEFAULT_PARAM.NULL,
    handleOnSubmit = DEFAULT_PARAM.NULL, handleCancelButton = DEFAULT_PARAM.NULL, formCSS = 'form-wrapper', formContainerCSS = 'form-container',
    shouldValidate = DEFAULT_PARAM.BOOL_TRUE, shouldResetOnSubmit = DEFAULT_PARAM.BOOL_FALSE, isCancelModal = DEFAULT_PARAM.BOOL_FALSE,
    topContent=DEFAULT_PARAM.NULL, confirmButtonText = SUBMIT, cancelButtonText = NEVERMIND,
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

    const handleSubmitResetTry = (handleSubmit = DEFAULT_PARAM.NULL, form = DEFAULT_PARAM.NULL) => shouldResetOnSubmit ? (
        async(event) => {
            await handleSubmit(event);
            form.reset();
        }
    ) : handleSubmit;

    return (
        <Form 
            initialValues={initialValues ? initialValues : null}
            validate={shouldValidate && formType ? (fields = DEFAULT_PARAM.UNDEFINED) => validateForm(fields, formType) : null}
            onSubmit={handleOnSubmit}>
            {({ handleSubmit = DEFAULT_PARAM.NULL, form = DEFAULT_PARAM.NULL }) => (
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