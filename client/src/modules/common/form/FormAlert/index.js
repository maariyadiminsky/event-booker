import React from 'react';
import PropTypes from 'prop-types';

import { getColorForAlertType } from '@modules/common/utils/colors';

import { DEFAULT } from '@modules/common/const';

export const getFormAlertColorCSS = (type) => {
    const color = getColorForAlertType(type);
    return `bg-${color}-100 border-t-4 max-w-2xl m-auto border-${color}-500 rounded-b-lg text-${color}-900 px-4 py-3 shadow-md`;
}
const FormAlert = ({ type = DEFAULT.STRING, children = DEFAULT.FUNCTION }) => (
    <div 
        className={getFormAlertColorCSS(type)}
        role="alert"
    >
        <div className="flex">
            <div className="py-1">
                <svg 
                    className="fill-current h-6 w-6 text-teal-500 mr-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                </svg>
            </div>
            {children}
        </div>
    </div>
);

FormAlert.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.func,
        PropTypes.string,
    ]).isRequired
};

export default FormAlert;