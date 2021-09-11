import React from "react";

const Events = () => {
    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-green-400 to-green-300 container shadow-xl rounded px-8 py-8 mt-12">
                <div className="flex flex-wrap justify-center items-center text-center">
                    <div className="text-white my-auto text-center text-xl font-semibold">
                        <span className="text-2xl">+ </span>Create an Event
                    </div>
                </div>
            </div>
            <div className="container shadow-xl rounded px-8 py-10 mt-6 border-2 border-green-400">
                An event
            </div>
        </div>
    );
}

export default Events;