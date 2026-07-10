import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UserContext from "../UserContext";
import axios from 'axios';
import Footer from '../components/Footer';
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL;

const BlogSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-xs overflow-hidden animate-pulse border border-gray-100 flex flex-col h-full">
    <div className="w-full h-52 bg-gray-200" />
    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded-sm w-1/3" />
        <div className="h-5 bg-gray-200 rounded-md w-11/12" />
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded-sm w-full" />
        <div className="h-3 bg-gray-200 rounded-sm w-4/5" />
      </div>
    </div>
  </div>
);

// Framer Motion staggered animation setups
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const Home = () => {
  let { user } = useContext(UserContext);
  let [blogs, setBlogs] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  let [selectedCategory, setSelectedCategory] = useState("All Categories");
  let [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");
    const searchFromUrl = queryParams.get("search");
    
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("All Categories");
    }

    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    } else {
      setSearchQuery("");
    }
  }, [location.search]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        let response = await axios.get(
          `${API_BASE}/blog/?category=${selectedCategory}&search=${encodeURIComponent(searchQuery)}`
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory, searchQuery]);

  const formatShortDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-16 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Latest Stories
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Explore insightful perspectives across product, code, and design.
            </p>
          </div>

          <div className="flex flex-col gap-2 max-w-xs w-full sm:w-auto">
            <label htmlFor="blogs" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Category Filter
            </label>

            <div className="relative min-w-[220px]">
              <select
                name="category"
                id="blogs"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full appearance-none rounded-xl border border-gray-200/80 bg-white px-4 py-3 pr-10 text-sm font-semibold text-gray-700 shadow-xs transition-all hover:border-purple-300 focus:border-purple-500 focus:outline-hidden focus:ring-4 focus:ring-purple-500/10 cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                <option value="Psychology">Psychology</option>
                <option value="Animals">Animals</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Productivity">Productivity</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>


        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </motion.div>
          ) : blogs.length > 0 ? (
            <motion.div 
              key="blog-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {blogs.map((blog) => (
                <motion.div key={blog._id || blog.id} variants={cardVariants}>
                  <Link to={`/blog/${blog._id || blog.id}`} className="group block h-full">
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col h-full active:scale-[0.99]">
                      
                      {/* Image Frame */}
                      <div className="overflow-hidden aspect-video w-full h-52 bg-gray-50 relative">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                      </div>

                      {/* Info Body */}
                      <div className="p-6 flex flex-col flex-1">
                        <p className="text-xs font-semibold text-gray-400 mb-2.5 tracking-wide">
                          By <span className="text-gray-600 font-medium">{blog.author}</span> • {formatShortDate(blog.createdAt)}
                        </p>

                        <h3 className="text-lg font-bold text-gray-900 mb-2.5 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200 leading-snug">
                          {blog.title}
                        </h3>

                        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed mt-auto">
                          {blog.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 shadow-xs max-w-xl mx-auto"
            >
              <div className="inline-flex p-4 rounded-full bg-gray-50 text-gray-400 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">No stories matching criteria</h3>
              <p className="mt-1.5 text-sm text-gray-500 max-w-xs mx-auto">Try checking your spelling or selecting a different main topic module.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;