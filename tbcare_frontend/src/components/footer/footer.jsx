import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-indigo shadow-inner mt-12 py-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            {/* Ganti placeholder SVG dengan tag <img> untuk PNG */}
            <img src="/images/logo.png" alt="Logo tbcare" className="h-8 w-auto" />
          </div>

          {/* Navigation Links Section */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold text-gray-800">About</h3>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
                About us
              </Link>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Team
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Careers
              </a>
            </div>

            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold text-gray-800">Resources</h3>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Blog
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                FAQ
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Support
              </a>
            </div>

            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold text-gray-800">Legal</h3>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">&copy; {new Date().getFullYear()} tbcare. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
