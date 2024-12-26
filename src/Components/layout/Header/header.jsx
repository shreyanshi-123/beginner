import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for client-side navigation
import Logo from './../../../Assets/Images/B-size5 2.png'
// Array of navigation links
const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" }, // Ensure paths match exactly (case-sensitive)
    { name: "Contact", path: "/contact" },
];

function Header() {
    // State to control the visibility of the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white text-blue  shadow-lg ">

            <div className="max-w-6xl m-auto p-4 flex  justify-center gap-4 border-b-2 border-blue-600">
                <div className="text-blue-600">FACING ISSUE WITH YOUR PRINTER ? </div>
                <div>
                    <Link
                        to="/login" // Use Link instead of a for client-side routing
                        className="bg-red-800 text-white py-2 px-4 rounded-3xl hover:bg-slate-900"
                    >
                        BOOK FREE CONSULTATION
                    </Link>
                </div>
            </div>

            <div className="max-w-6xl m-auto p-2 flex justify-between items-center">
                {/* Logo or App Name */}
                <div className="text-2xl font-bold">
                    <Link to="/" className="flex h-14"><img src={Logo} alt="" /></Link>
                </div>
                <div className="flex gap-x-6">
                    {/* Navigation Links */}
                    <nav className={`md:flex ${isMenuOpen ? "block" : "hidden"} md:block`}>
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path} // Use Link for client-side routing
                                className={`text-blue-600 font-semibold px-[20px] py-[6px] 
                ${index !== 0 ? "border-l-2 border-blue-600" : ""}
                hover:text-slate-900`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Hamburger Menu (Only visible on small screens) */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu} // Toggle menu visibility when clicked
                            className="text-white"
                        >
                            {isMenuOpen ? "✖" : "☰"} {/* Change icon based on menu state */}
                        </button>
                    </div>

                    {/* Optional: Call to Action Button */}
                    <div>
                        <Link
                            to="/login" // Use Link instead of a for client-side routing
                            className="bg-red-800 text-white py-2 px-4 rounded-3xl hover:bg-slate-900"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
