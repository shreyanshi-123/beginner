import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">© 2024 My React App. All rights reserved.</p>
        <div className="mt-4">
          <a
            href="/about"
            className="hover:text-gray-300 mx-4 text-sm"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-gray-300 mx-4 text-sm"
          >
            Contact
          </a>
          <a
            href="/privacy-policy"
            className="hover:text-gray-300 mx-4 text-sm"
          >
            Privacy Policy
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="mt-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-4 hover:text-gray-300"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-4 hover:text-gray-300"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-4 hover:text-gray-300"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
