import React from "react";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import Footer from '../components/Footer'
import { Link,useLocation } from "react-router-dom";

const Home = () => {

  let { user } = useContext(UserContext)
  let [blogs, setBlogs] = useState([]);

  let [selectedCategory, setSelectedCategory] = useState("All Categories");

  const location = useLocation();

  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");

    if(categoryFromUrl){
      setSelectedCategory(categoryFromUrl);
    }else{
      setSelectedCategory("All Categories")
    }
  },[location.search])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let response = await axios.get(`http://localhost:3000/blog/?category=${selectedCategory}`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();

  }, [selectedCategory]);

  const formatShortDate = (dateString) => {
  if (!dateString) return "No date";
  
  const date = new Date(dateString);
  
  const day = date.getDate(); 
  
  const month = date.toLocaleString('en-US', { month: 'short' }); 
  
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-6 py-12">
  {/* --- Header Row Wrap Starts Here --- */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <h2 className="text-3xl font-bold">Latest Blogs</h2>

    {/* Dropdown Container */}
    <div className="flex flex-col gap-1.5 max-w-xs w-full sm:w-auto">
      <label htmlFor="blogs" className="text-xs font-semibold text-slate-700 tracking-wide">
        Filter by category
      </label>

      <div className="relative min-w-[200px] max-w-xs">
        <select
          name="category"
          id="blogs"
          value={selectedCategory}
          onChange={(e)=> setSelectedCategory(e.target.value)}
          className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 shadow-xs transition-all hover:border-purple-300 focus:border-purple-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 cursor-pointer"
        >
          <option value="All Categories" className="bg-white text-slate-900 py-2">All Categories</option>
          <option value="Psychology" className="bg-white text-slate-900 py-2">Psychology</option>
          <option value="Animals" className="bg-white text-slate-900 py-2">Animals</option>
          <option value="Technology" className="bg-white text-slate-900 py-2">Technology</option>
          <option value="Lifestyle" className="bg-white text-slate-900 py-2">Lifestyle</option>
          <option value="Productivity" className="bg-white text-slate-900 py-2">Productivity</option>
          <option value="Design" className="bg-white text-slate-900 py-2">Design</option>
          <option value="Business" className="bg-white text-slate-900 py-2">Business</option>
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  {/* --- Header Row Wrap Ends Here --- */}

  {/* Blog Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {blogs.map((blog) => (
      <div
        key={blog.id}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-52 object-cover"
        />

        <div className="p-5">
          <p className="text-sm text-gray-500 mb-2">
            By {blog.author} • {formatShortDate(blog.createdAt)}
          </p>

          <h3 className="text-xl font-semibold mb-3">
            {blog.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {blog.description}
          </p>

          <Link
            to={`/blog/${blog._id || blog.id}`}
            className="text-blue-600 font-medium hover:text-blue-800 inline-block"
          >
            Read More →
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>
    <Footer/>
    </div>
  );
};

export default Home;