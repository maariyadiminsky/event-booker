import React from "react";

const Bookings = () => {
    return (
        <div className="w-full mt-12">
             <div className="overflow-y-scroll max-h-screen px-20 pb-20 m-auto">
                 <div className="grid grid-cols-5 gap-3">
                    <div className="relative animate-pulse flex flex-wrap justify-end text-right content-right h-64 max-h-64 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-400 border-2 border-green-300 container shadow-lg rounded cursor-pointer">
                        <div className="absolute inset-x-5 bottom-5 text-green-100 text-4xl font-semibold">
                            <span className="">+ </span>Book an Event
                        </div>
                    </div>
                    <div className="relative flex flex-wrap justify-end text-right bg-gradient-to-r h-64 max-h-64 from-red-500 to-red-400 hover:from-red-400 hover:to-red-400 border-2 border-red-300 shadow-xl rounded-lg cursor-pointer">
                        <div className="absolute inset-x-5 top-5 font-light text-red-100 text-xl">
                            Concert Hall
                        </div>
                        <div className="absolute inset-x-5 bottom-5 text-red-100 text-4xl font-semibold">
                            Sept 15th
                        </div>
                    </div>
                    <div className="relative flex flex-wrap justify-end text-right bg-gradient-to-r h-64 max-h-64 from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-400 border-2 border-blue-300 shadow-xl rounded-lg cursor-pointer">
                        <div className="absolute inset-x-5 top-5 font-light text-blue-100 text-xl">
                            Breakfast with Friends at Dr Stuart Office
                        </div>
                        <div className="absolute inset-x-5 bottom-5 text-blue-100 text-4xl font-semibold">
                            Oct 10th
                        </div>
                    </div>
                 </div>
             </div>
        </div>
    );
}

export default Bookings;