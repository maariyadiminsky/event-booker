import React from 'react';
import { Link } from 'react-router-dom';

import { 
    EVENTS_PATH,
    START_HERE,
    CREATE_UNIQUE_EXPERIENCES,
    SHARE_AND_BOOK_EVENTS
} from '../../const';

import HomeImage from './svg/HomeImage';

export const buttonText = () => `🌟 ${START_HERE}`;
const Home = () => (
    <div className="grid md:grid-cols-2 sm:grid-col-1 bg-white overflow-hidden min-h-screen md:pt-32 sm:pt-10">
        <div className="md:pt-28 md:text-right sm:text-center">
            <div className="text-green-400 font-bold md:text-7xl sm:text-6xl">
                {CREATE_UNIQUE_EXPERIENCES}
            </div>
            <div className="text-gray-500 font-light md:text-xl sm:text-3xl mt-10">
                {SHARE_AND_BOOK_EVENTS}
            </div>
            <Link to={EVENTS_PATH}>
                <button className="mt-7 py-3 px-8 md:text-xl sm:text-2xl font-semibold text-white bg-green-400 rounded hover:bg-green-300 transition duration-300">
                    {buttonText()}
                </button>
            </Link>
        </div>
        <div className="transform sm:scale-125 sm:mt-20 sm:mx-auto">
            <HomeImage className="transform sm:scale-150"/>
        </div>
    </div>
);

export default Home;