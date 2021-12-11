import React from 'react';

const CreateButtonRectangle = ({ className, onClick, text }) => (
    <div 
        className={className}
        onClick={onClick}
    >
        <div className="flex flex-wrap justify-center items-center text-center">
            <div className="text-white my-auto text-center text-xl font-semibold">
                <span className="text-2xl">+ </span>{text}
            </div>
        </div>
    </div>
);

export default CreateButtonRectangle;