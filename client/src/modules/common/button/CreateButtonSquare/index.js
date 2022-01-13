import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT } from '@modules/common/const';

const CreateButtonSquare = ({ className = DEFAULT.STRING, text = DEFAULT.STRING, onClick = DEFAULT.NULL }) => (
    <div className={className} onClick={onClick}>
        <div className="absolute inset-x-5 bottom-5 text-green-100 text-4xl font-semibold">
            <span className="">+ </span>{text}
        </div>
    </div>
);

CreateButtonSquare.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default CreateButtonSquare;