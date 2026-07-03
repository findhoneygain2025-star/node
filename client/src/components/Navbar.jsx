import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

const Navbar = () => {
  let { user, logout } = useContext(UserContext);
  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-50 text-black shadow-md relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Blogify
        </Link>

        {/* Hamburger / Cross Icon Button (Mobile Only) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black focus:outline-none p-2 rounded-md hover:bg-gray-200 transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              // Cross (X) Icon
              <svg className="w-6 height-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger (3 lines) Icon
              <svg className="w-6 height-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition">
            Home
          </Link>
          {user && (
            <Link to="/dashboard" className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition">
              Dashboard
            </Link>
          )}

          {user && user.name ? (
            <button onClick={logout} className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition">
              Login
            </Link>
          )}

          <Link to="/register" className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition">
            Register
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Links Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col gap-4 absolute left-0 right-0 z-50 shadow-lg">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition inline-block text-left"
          >
            Home
          </Link>
          {user && (
            <Link 
              to="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition inline-block text-left"
            >
              Dashboard
            </Link>
          )}

          {user && user.name ? (
            <button 
              onClick={() => { logout(); setIsOpen(false); }} 
              className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition text-left w-full"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition inline-block text-left"
            >
              Login
            </Link>
          )}

          <Link 
            to="/register" 
            onClick={() => setIsOpen(false)}
            className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition inline-block text-left"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;