import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for client-side navigation

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
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <div className="text-2xl font-bold">
          <Link to="/">My React App</Link>
        </div>

        {/* Navigation Links */}
        <nav className={`md:flex space-x-6 ${isMenuOpen ? "block" : "hidden"} md:block`}>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path} // Use Link instead of a for client-side routing
              className="hover:text-gray-200"
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
            className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
