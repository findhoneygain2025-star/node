import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar";
import { useContext } from 'react';
import UserContext from '../UserContext';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(null);

  let { user } = useContext(UserContext);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
      const username = user.name;

      const response = await axios.post(`http://localhost:3000/blog/${id}/comment`, {
        text: newComment,
        username: username,
      });

      setBlog(prevBlog => ({
        ...prevBlog,
        comments: response.data
      }));

      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err.response?.data || err.message);
      alert("Failed to post comment. Make sure the backend endpoint is running.");
    }
  };


  const handleLikes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:3000/blog/${id}/likes`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setLikes(response.data.totalLikes);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/blog/details/${id}`);
        setBlog(response.data);
        console.log(response);
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
        <div className='text-3xl mt-8 flex flex-col justify-center w-10 items-center' >
          {likes> 0 ? (
            <FaHeart color="red" onClick={handleLikes} style={{ cursor: 'pointer' }} />
          ) : (
            <CiHeart color="black" onClick={handleLikes} style={{ cursor: 'pointer' }} />
          )}
          <p className='text-sm' >{likes}</p>
        </div>
        {/* 1. Render Existing Comments */}
        <div className="mt-12 border-t pt-8">
          <h3 className="text-2xl font-bold mb-6">Comments ({blog.comments?.length || 0})</h3>

          <div className="space-y-4 mb-8">
            {blog.comments?.map((comment) => (
              <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-800">{comment.username}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-blue-500"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Post
            </button>
          </form>
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;