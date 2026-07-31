import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Footer from '../components/Footer';
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL;

// Clean loading placeholder matching dashboard constraints
const DashboardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-xs overflow-hidden animate-pulse border border-gray-100 flex flex-col h-full">
    <div className="w-full h-44 bg-gray-200" />
    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
      <div className="h-4 bg-gray-200 rounded-sm w-5/6" />
      <div className="flex gap-2">
        <div className="h-9 bg-gray-200 rounded-lg flex-1" />
        <div className="h-9 bg-gray-200 rounded-lg flex-1" />
      </div>
    </div>
  </div>
);

// Framer motion orchestration variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 110, damping: 16 } 
  }
};

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fixed core logic: Wrap endpoint execution safely inside useEffect to prevent render loops
  useEffect(() => {
    const fetchDashboardBlogs = async () => {
      setIsLoading(true);
      try {
        let res = await axios.get(`${API_BASE}/blog/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBlogs(res.data);
      } catch (err) {
        let errorMessage = err.response?.data?.message || err.message || "Failed to get blogs from server";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchDashboardBlogs();
    } else {
      setIsLoading(false);
      toast.error("Authentication missing. Please log in.");
    }
  }, [token]);

  function handleDelete(id) {
    axios.delete(`${API_BASE}/blog/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
      let errorMessage = res.data?.message || "Blog deleted successfully";
      toast.success(errorMessage);
    })
    .catch((err) => {
      let errorMessage = err.response?.data?.message || err.message || "Failed to delete blog";
      toast.error(errorMessage);
    });
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-16 flex-1 w-full">
        {/* Dynamic Header Deck */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Creator Dashboard
            </h1>
          </div>

          <Link 
            to="/create-blog" 
            className="inline-flex items-center justify-center gap-2 text-white bg-purple-600 hover:bg-purple-700 active:scale-[0.98] transition-all font-semibold rounded-xl text-sm px-5 py-3 shadow-sm shadow-purple-500/10 sm:w-auto self-start"
          >
            <span>Create Blog</span>
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>

        {/* Dashboard Grid System */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="skeleton-deck"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <DashboardSkeleton />
              <DashboardSkeleton />
              <DashboardSkeleton />
              <DashboardSkeleton />
            </motion.div>
          ) : blogs.length > 0 ? (
            <motion.div 
              key="active-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {blogs.map((blog) => (
                <motion.div 
                  key={blog._id} 
                  variants={cardVariants}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Visual Frame */}
                  <Link to={`/blog/${blog._id || blog.id}`} className="block overflow-hidden aspect-video bg-gray-50 relative">
                    <img 
                      src={blog.image} 
                      className="w-full h-44 object-cover group-hover:scale-102 transition-transform duration-500 ease-out" 
                      alt={blog.title} 
                    />
                  </Link>

                  {/* Body Text Stack */}
                  <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                    <h2 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-purple-600 transition-colors">
                      {blog.title}
                    </h2>

                    {/* Operational Trigger Actions */}
                    <div className="flex gap-2.5">
                      <Link
                        to={`/update-blog/${blog._id}`}
                        className="flex-1 inline-flex justify-center items-center gap-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 active:scale-95 text-gray-700 font-semibold text-xs py-2.5 transition-all shadow-2xs"
                      >
                        <span>Update</span>
                        <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.25">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </Link>

                      <button 
                        onClick={() => handleDelete(blog._id)} 
                        className="flex-1 inline-flex justify-center items-center gap-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 active:scale-95 font-semibold text-xs py-2.5 transition-all"
                      >
                        <span>Delete</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.25">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 shadow-2xs max-w-xl mx-auto"
            >
              <div className="inline-flex p-4 rounded-full bg-purple-50 text-purple-500 mb-4">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">You haven't written any articles yet</h3>
              <p className="mt-1.5 text-sm text-gray-500 max-w-xs mx-auto mb-5">Your published blogs will be visible here for editing or tracking purposes.</p>
              <Link 
                to="/create-blog" 
                className="inline-flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all font-semibold rounded-xl text-xs px-4 py-2.5"
              >
                Write your first story
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;