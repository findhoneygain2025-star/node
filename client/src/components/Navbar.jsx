import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import DonateModal from "./DonateModal"; 

const Navbar = () => {
  let { user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDonateOpen, setIsDonateOpen] = useState(false); 
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); 
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <nav className="bg-gray-50 text-black shadow-md sticky top-0 z-99">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          
          {/* Main Top Bar */}
          <div className="flex justify-between items-center gap-4">
            {/* Brand Logo */}
            <Link to="/" className="text-2xl font-bold whitespace-nowrap">
              Blogify
            </Link>

            {/* Desktop Search Bar (Hidden on mobile) */}
            <div className="hidden md:flex justify-center flex-1 max-w-lg mx-6">
              <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
                <input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  type="text" 
                  className="border rounded-3xl py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Search Blogs..." 
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-3xl transition whitespace-nowrap"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Hamburger Button (Mobile Only) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-black focus:outline-none p-2 rounded-md hover:bg-gray-200 transition"
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-4 whitespace-nowrap">
              <Link to="/" className="hover:bg-gray-200 rounded-2xl p-2 px-4 transition">
                Home
              </Link>
              {user && (
                <>
              <button
                onClick={() => setIsDonateOpen(true)}
                className="hover:bg-gray-200 rounded-2xl p-2 px-4 transition" >
                Donate 
              </button>

                <Link to="/dashboard" className="hover:bg-gray-200 rounded-2xl p-2 px-4 transition">
                  Dashboard
                </Link>
                </>
              )}

              {user && user.name ? (
                <button onClick={logout} className="hover:bg-gray-200 rounded-2xl p-2 px-4 transition">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="hover:bg-gray-200 rounded-2xl p-2 px-4 transition">
                  Login
                </Link>
              )}

              {!user && (
                <Link to="/register" className="hover:bg-gray-200 rounded-2xl p-2 px-4 transition">
                  Register
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Search Bar Row (Directly under Blogify and Hamburger) */}
          <div className="md:hidden mt-3 pt-2 border-t border-gray-200">
            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                type="text" 
                className="border rounded-3xl py-2 px-4 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Search Blogs..." 
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-3xl transition"
              >
                Search
              </button>
            </form>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col gap-3 shadow-lg">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-200 rounded-2xl p-2 px-4 transition text-left"
            >
              Home
            </Link>
            {user && (
              <>
            <button
              onClick={() => { setIsDonateOpen(true); setIsOpen(false); }}
              className="hover:bg-gray-200 rounded-2xl p-2 px-4 transition text-left"
            >
              Donate
            </button>

            
              <Link 
                to="/dashboard" 
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-200 rounded-2xl p-2 px-4 transition text-left"
              >
                Dashboard
              </Link>
              </>
            )}

            {user && user.name ? (
              <button 
                onClick={() => { logout(); setIsOpen(false); }} 
                className="hover:bg-gray-200 rounded-2xl p-2 px-4 transition text-left w-full"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-200 rounded-2xl p-2 px-4 transition text-left"
              >
                Login
              </Link>
            )}

            {!user && (
              <Link 
                to="/register" 
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-200 rounded-2xl p-2 px-4 transition text-left"
              >
                Register
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Razorpay Donation Modal Component */}
      <DonateModal 
        isOpen={isDonateOpen} 
        onClose={() => setIsDonateOpen(false)} 
      />
    </>
  );
};

export default Navbar;
