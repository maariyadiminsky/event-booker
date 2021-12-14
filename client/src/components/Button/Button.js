import React from 'react';

import { DEFAULT } from '../../const';

const Button = ({ children = DEFAULT.NULL, handleOnClick = DEFAULT.NULL, buttonCSS = DEFAULT.STRING }) => (
    <div onClick={handleOnClick} className={buttonCSS}>{children}</div>
);

export default Button;