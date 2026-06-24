import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

const Navbar = () => {
   let {user,logout} = useContext(UserContext)
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          BlogApp
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
         {
          user &&  <Link to="/dashboard" className="hover:text-gray-200 transition">
            Dashboard
          </Link>
         }

          {
            user&&user.name ?
            <button onClick={logout}>logout</button>
          :
          <Link to="/login" className="hover:text-gray-200 transition">
            Login
          </Link>
          }

          <Link to="/register" className="hover:text-gray-200 transition">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;