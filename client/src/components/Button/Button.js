import React from 'react';

import { DEFAULT_PARAM } from '../../const';

const Button = ({ children = DEFAULT_PARAM.NULL, handleOnClick = DEFAULT_PARAM.NULL, buttonCSS = DEFAULT_PARAM.STRING }) => (
    <div onClick={handleOnClick} className={buttonCSS}>{children}</div>
);

export default Button;