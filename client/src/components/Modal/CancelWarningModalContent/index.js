import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT, YES_IM_SURE } from '../../../const';

import FormWrapper from '../../Form/FormWrapper';

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

CancelWarningModalContent.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
    handleCancelButton: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
};

export default CancelWarningModalContent;