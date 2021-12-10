import React from 'react';
import { Form } from 'react-final-form';

import FormErrors from './FormErrors';
import ButtonTwoGroup from '../Button/ButtonTwoGroup';

import { validateForm } from '../../utils/auth';

const FormWrapper = ({ 
    children, formType, errors, initialValues = null,
    handleOnSubmit, handleCancelButton = null,
    shouldValidate = true, 
 }) => {
    const renderErrors = () => errors.length > 0 && (
        <FormErrors errors={errors} />
    );

    const renderButtonGroup = () => handleCancelButton && (
        <ButtonTwoGroup
            defaultClass='text-white font-semibold bg-green-400 hover:bg-green-500 transition duration-300'
            handleCancel={handleCancelButton}
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