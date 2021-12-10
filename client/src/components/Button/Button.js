import React from 'react';

const Button = ({ children, handleOnClick, buttonCSS }) => (
    <div 
        onClick={handleOnClick}
        className={buttonCSS}
    >
        {children}
    </div>
);

export default Button;