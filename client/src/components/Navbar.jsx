import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

const Navbar = () => {
   let {user,logout} = useContext(UserContext)
  return (
    <nav className="bg-gray-50 text-black shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Blogify
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition">
            Home
          </Link>
         {
          user &&  <Link to="/dashboard" className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition">
            Dashboard
          </Link>
         }

          {
            user&&user.name ?
            <button onClick={logout} className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition">logout</button>
          :
          <Link to="/login" className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition">
            Login
          </Link>
          }

          <Link to="/register" className="hover:bg-gray-500 rounded-2xl p-2 px-4 hover:text-white transition">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;