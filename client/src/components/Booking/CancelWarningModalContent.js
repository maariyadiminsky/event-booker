import React from 'react';

import { DEFAULT_PARAM, YES_IM_SURE } from '../../const';

import FormWrapper from '../Form/FormWrapper';

const CancelWarningModalContent = ({ errors = DEFAULT_PARAM.NULL, handleOnSubmit = DEFAULT_PARAM.NULL, handleCancelButton = DEFAULT_PARAM.NULL }) => (
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