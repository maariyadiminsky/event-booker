import React from 'react';

import FormWrapper from '../Form/FormWrapper';

const CancelWarningModalContent = ({ errors, handleOnSubmit, handleCancelButton }) => (
    <FormWrapper
        errors={errors}
        handleOnSubmit={handleOnSubmit}
        handleCancelButton={handleCancelButton}
        confirmButtonText={'Yes I\'m sure'}
        shouldValidate={false}
        isCancelModal
    >
        <div className="text-center text-gray-400 text-2xl pb-4 px-3">Are you sure?</div>
    </FormWrapper>
);

export default CancelWarningModalContent;