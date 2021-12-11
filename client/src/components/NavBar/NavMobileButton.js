import React from 'react';

const NavMobileButton = ({ handleOnClick }) => (
    <div className="md:hidden flex px-10">
        <button 
            className="outline-none"
            onClick={handleOnClick}
        >
            <svg className="w-10 h-10 text-green-400 hover:text-green-300"
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>
);

export default NavMobileButton;