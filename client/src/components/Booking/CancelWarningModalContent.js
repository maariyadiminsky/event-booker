import React from 'react';

import { DEFAULT, YES_IM_SURE } from '../../const';

import FormWrapper from '../Form/FormWrapper';

const CancelWarningModalContent = ({ errors = DEFAULT.NULL, handleOnSubmit = DEFAULT.NULL, handleCancelButton = DEFAULT.NULL }) => (
    <FormWrapper
        errors={errors}
        handleOnSubmit={handleOnSubmit}
        handleCancelButton={handleCancelButton}
        confirmButtonText={YES_IM_SURE}
        shouldValidate={false}
        isCancelModal
    >
        <div className="text-center text-gray-400 text-2xl pb-4 px-3">Are you sure?</div>
    </FormWrapper>
);

export default CancelWarningModalContent;