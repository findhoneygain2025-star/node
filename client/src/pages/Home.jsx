import React from "react";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

const Home = () => {

  let { user } = useContext(UserContext)
  let [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let response = await axios.get("http://localhost:3000/blog/");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();

  }, []);

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

      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {user && user.name && <h1>welcome {user.name}</h1>}
          <h1 className="text-5xl font-bold mb-4">
            Welcome to DevBlog
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Explore the latest articles on web development, programming,
            and technology.
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold mb-8 inline">Latest Blogs</h2>
        <div class="flex flex-col gap-1.5 max-w-xs">
            <label for="blogs" class="text-xs font-semibold text-slate-700 tracking-wide">
              Filter by category
            </label>

            <div class="relative min-w-[200px] max-w-xs mb-4">
              <select
                name="category"
                id="blogs"
                className="block w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 shadow-xs transition-all hover:border-purple-300 focus:border-purple-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 cursor-pointer"
              >
                <option value="All" className="bg-white text-slate-900 py-2">All Categories</option>
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
    </div>
  );
};

export default Home;