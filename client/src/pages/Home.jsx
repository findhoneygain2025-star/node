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
        <h2 className="text-3xl font-bold mb-8">Latest Blogs</h2>

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