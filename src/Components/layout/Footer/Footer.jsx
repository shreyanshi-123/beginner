import React from "react";
import logo from './../../../Assets/Images/B-size6 (1).png'
import './footer.css'
// import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-blue-600 text-white py-6">
            <div className="max-w-6xl m-auto py-16 grid gap-x-4  grid-cols-4 grid-rows-1">

                <div className="mt-4 flex flex-col gap-y-4">
                    <div className="max-w-40">
                    <img src={logo} alt="" />
                    </div>
                    <p>At PNW, our goal is to deliver fast, effective solutions to your printer not working issues whenever you reach out. We specialize in printer troubleshooting and resolving <a href="#">printer errors</a> across all printer brands, ensuring that your printing problems are solved quickly and efciently.</p>
                </div>
                <div className="mt-4">
                    <h3 className="mb-4 font-semibold">Quick Links</h3>
                    <div className="flex flex-col gap-2">
                    <a
                        href="/"
                        className=" hover:pl-[5px] slide-right text-sm"
                    >
                        Home
                    </a>
                    <a
                        href="/Blogs"
                        className=" hover:pl-[5px] slide-right text-sm"
                    >
                        Blogs
                    </a>
                    <a
                        href="/Contact"
                        className=" hover:pl-[5px] slide-right text-sm"
                    >
                       Contact
                    </a>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="mb-4 font-semibold">Recent Blogs</h3>
                    <div className="flex flex-col gap-2">
                    <a
                        href="/"
                        className="hover:pl-[5px] slide-right text-sm"
                    >
                       How to Enable Offline Mode on Your Printer and Print Without Network
                    </a>
                    <a
                        href="/"
                        className="hover:pl-[5px] slide-right text-sm"
                    >
                       Print from iPhone to Epson Printer: The Ultimate Setup Guide
                    </a>
                    <a
                        href="/"
                        className="hover:pl-[5px] slide-right text-sm"
                    >
                       Types of Printer Issues You Should Know About
                    </a>
                    <a
                        href="/"
                        className="hover:pl-[5px] slide-right text-sm"
                    >
                       Dealing with Paper Jams in Printers: Expert Tips and Solutions
                    </a>
                    </div>
                </div>
                <div className="mt-4">
                <h3 className="mb-4 font-semibold">Contact Info</h3>
                    <div className="flex flex-col gap-2">
                    <a
                        href="/"
                        className="  text-sm"
                    >
                      302 Grove St, New Jersey - 07302, United States
                    </a>
                    
                    </div>
                </div>
                {/* Social Media Icons */}
                {/* <div className="mt-6"> */}
                    {/* <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-4 hover:text-gray-300"
                    > */}
                        {/* <FaFacebook size={20} /> */}
                    {/* </a> */}
                    {/* <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-4 hover:text-gray-300"
                    > */}
                        {/* <FaTwitter size={20} /> */}
                    {/* </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white mx-4 hover:text-gray-300"
                    > */}
                        {/* <FaInstagram size={20} /> */}
                    {/* </a> */}
                {/* </div> */}
            </div>
            <div className="max-w-6xl m-auto flex justify-between">
                <div>
                <p className="text-base text-left">Copyright © 2024. Designed by <i className="hover:text-slate-900">Printernotworking</i></p>
                </div>
                <div className="flex justify-end gap-4">
                <p className="text-base hover:text-slate-900"><a href="/PrivacyPolicy">Privacy Policy</a></p>
                <p className="text-base hover:text-slate-900"><a href="/TermsAndCondition">Terms of Use</a></p>
                </div>
            </div>

        </footer>
    );
}

export default Footer;
