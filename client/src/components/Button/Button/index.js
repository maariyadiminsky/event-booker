import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT } from '../../../const';

const Button = ({ children = DEFAULT.NULL, handleOnClick = DEFAULT.NULL, buttonCSS = DEFAULT.STRING }) => (
    <button onClick={handleOnClick} className={buttonCSS}>{children}</button>
);

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
    handleOnClick: PropTypes.func.isRequired,
    buttonCSS: PropTypes.string,
};

export default Button;