import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar";

const BlogDetails = () => {
  const { id } = useParams(); // Grabs the ':id' value from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        setLoading(true);
        // Make an API call to get a single blog item by its ID
        const response = await axios.get(`http://localhost:3000/blog/details/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error("Error loading article:", err);
        setError("Could not load the article. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-height-screen py-20">
        <p className="text-lg text-gray-600 animate-pulse">Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-4">
        <p className="text-red-500 mb-4">{error || "Article not found."}</p>
        <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Back Link */}
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium mb-6 inline-block">
          ← Back to Blogs
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {blog.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center text-gray-600 text-sm md:text-base mb-8 pb-4 border-b border-gray-200">
          <span>By <strong className="text-gray-800">{blog.author || "Admin"}</strong></span>
          <span className="mx-2">•</span>
          <span>{blog.date}</span>
        </div>

        {/* Hero Image */}
        {blog.image && (
          <div className="rounded-xl overflow-hidden shadow-lg mb-8 aspect-video max-h-[450px] w-full">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Full Blog Content */}
        <div className="prose max-w-none text-gray-800 text-lg leading-relaxed whitespace-pre-line">
          {blog.content || blog.description}
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;