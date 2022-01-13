import React from 'react';
import PropTypes from 'prop-types';

const mainClass = 'h-3 w-3 m-3 mr-1 rounded-full';

const Loader = ({ height = 36 }) => (
    <div className={`flex justify-center mt-${height} h-96 flex-wrap content-center animate-pulse`}>
        <div className={`${mainClass} bg-green-200 animate-bounce`}></div>
        <div className={`${mainClass} bg-green-300 animate-bounce200`}></div>
        <div className={`${mainClass} bg-green-400 animate-bounce400`}></div>
    </div>
);

Loader.propTypes = { 
    height: PropTypes.number,
};

export default Loader;