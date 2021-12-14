import React from 'react';
import { Form } from 'react-final-form';
import PropTypes from 'prop-types';

import FormErrors from './FormErrors';
import ButtonTwoGroup from '../Button/ButtonTwoGroup';

import { validateForm } from '../../utils/auth';
import { DEFAULT, SUBMIT, NEVERMIND, ERROR_COLOR, SUCCESS_COLOR } from '../../const';

const buttonColor = (isCancelModal = DEFAULT.BOOL_FALSE) => isCancelModal ? ERROR_COLOR : SUCCESS_COLOR;
const FormWrapper = ({ 
    children = DEFAULT.FUNCTION, errors = DEFAULT.NULL, formType = DEFAULT.STRING, initialValues = DEFAULT.NULL,
    handleOnSubmit = DEFAULT.NULL, handleCancelButton = DEFAULT.NULL, formCSS = 'form-wrapper', formContainerCSS = 'form-container',
    shouldValidate = DEFAULT.BOOL_TRUE, shouldResetOnSubmit = DEFAULT.BOOL_FALSE, isCancelModal = DEFAULT.BOOL_FALSE,
    topContent = DEFAULT.NULL, confirmButtonText = SUBMIT, cancelButtonText = NEVERMIND,
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
            initialValues={initialValues ? initialValues : DEFAULT.NULL}
            validate={shouldValidate && formType ? (fields = DEFAULT.UNDEFINED) => validateForm(fields, formType) : DEFAULT.NULL}
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

FormWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
    topContent: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func
    ]),
    errors: PropTypes.arrayOf(PropTypes.string),
    formType: PropTypes.string,
    initialValues: PropTypes.objectOf(PropTypes.any),
    handleOnSubmit: PropTypes.func.isRequired,
    handleCancelButton: PropTypes.func,
    formCSS: PropTypes.string,
    formContainerCSS: PropTypes.string,
    shouldValidate: PropTypes.bool,
    shouldResetOnSubmit: PropTypes.bool,
    isCancelModal: PropTypes.bool,
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
};

export default FormWrapper;