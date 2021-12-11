import React from 'react';

const CreateButtonSquare = ({ className, onClick, text }) => (
    <div 
        className={className}
        onClick={onClick}
    >
        <div className="absolute inset-x-5 bottom-5 text-green-100 text-4xl font-semibold">
            <span className="">+ </span>{text}
        </div>
    </div>
);

export default CreateButtonSquare;