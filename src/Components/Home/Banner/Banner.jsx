import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'
import bannerimg from './../../../Assets/Images/banner.jpg'
function Banner() {
    return (
        <div className='banner-img'>
            <div className="max-w-6xl m-auto flex items-center justify-between gap-4 p-6  ">


                {/* left Column for Text */}
                <div className="flex flex-col flex-1 pl-6 gap-y-4">
                    <h1 className="text-7xl font-semibold text-white mb-4">
                        Welcome to PNW Blogs
                    </h1>
                    <p className="text-lg text-white">
                        Is your printer not printing or showing “offline” errors? Get expert tips, quick fixes, and simple guides to resolve issues like Wi-Fi or laser printer problems.
                    </p>
                    <Link
                        to="/login" // Use Link instead of a for client-side routing
                        className="bg-red-800 text-white py-2 px-4 w-fit  hover:bg-slate-900"
                    >
                        BOOK FREE CONSULTATION
                    </Link>
                </div>
                {/* right Column for Image */}
                <div className="flex-1 h-[600px] overflow-hidden object-contain">
                    <img
                        src={bannerimg} // Replace with your image URL
                        alt="Banner"
                        className="w-full h-auto object-cover  shadow-md"
                    />
                </div>
            </div>
        </div>
    );
}

export default Banner;
