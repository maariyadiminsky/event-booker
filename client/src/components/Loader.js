import React from "react";

const Loader = () => {
    const mainClass = "h-3 w-3 m-3 mr-1 rounded-full";

    return (
        <div className="flex justify-center mt-36 h-96 flex-wrap content-center animate-pulse">
            <div className={`${mainClass} bg-green-200 animate-bounce`}></div>
            <div className={`${mainClass} bg-green-300 animate-bounce200`}></div>
            <div className={`${mainClass} bg-green-400 animate-bounce400`}></div>
        </div>
    );
};


export default Loader;