import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = ({ activePage, setActivePage }) => {
  return (
    <nav className="fixed w-full z-50 top-0 left-0 flex justify-center items-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img src="/images/logo.png" alt="Logo tbcare" className="h-8 w-auto" />
          </div>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className={`font-medium transition-colors ${activePage === "Home" ? "text-teal-400 border-b-2 border-teal-400" : "text-gray-600 hover:text-teal-600"}`} onClick={() => setActivePage("Home")}>
              Home
            </Link>
            <Link to="/about" className={`font-medium transition-colors ${activePage === "About" ? "text-teal-400 border-b-2 border-teal-400" : "text-gray-600 hover:text-teal-600"}`} onClick={() => setActivePage("About")}>
              About us
            </Link>
          </div>

          <div className="flex space-x-4">
            <button className="px-6 py-2 border border-gray-300 text-gray-800 font-semibold rounded-full shadow-sm hover:bg-gray-100 transition duration-300 transform hover:scale-105">Sign In</button>
            <button className="px-6 py-2 bg-teal-400 text-white font-semibold rounded-full shadow-lg hover:bg-teal-500 transition duration-300 transform hover:scale-105">Log In</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
