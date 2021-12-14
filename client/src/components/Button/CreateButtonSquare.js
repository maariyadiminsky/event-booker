import React from 'react';

import { DEFAULT_PARAM } from '../../const';

const CreateButtonSquare = ({ className = DEFAULT_PARAM.STRING, text = DEFAULT_PARAM.STRING, onClick = DEFAULT_PARAM.NULL }) => (
    <div className={className} onClick={onClick}>
        <div className="absolute inset-x-5 bottom-5 text-green-100 text-4xl font-semibold">
            <span className="">+ </span>{text}
        </div>
    </div>
);

export default CreateButtonSquare;