import React from 'react';

import { DEFAULT } from '../../const';

const CreateButtonRectangle = ({ className = DEFAULT.STRING, text = DEFAULT.STRING, onClick = DEFAULT.NULL }) => (
    <div className={className} onClick={onClick}>
        <div className="flex flex-wrap justify-center items-center text-center">
            <div className="text-white my-auto text-center text-xl font-semibold">
                <span className="text-2xl">+ </span>{text}
            </div>
        </div>
    </div>
);

export default CreateButtonRectangle;