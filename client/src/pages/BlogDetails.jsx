import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import UserContext from '../UserContext';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { motion, useScroll, useSpring } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL;

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [readingTime, setReadingTime] = useState(1);

  // States to manage editing an existing comment inline
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  let { user } = useContext(UserContext);
  const token = localStorage.getItem('token');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // --- COMMENT ACTIONS ---

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user || !user.name) {
      toast.warning("You must be logged in to post a comment.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/blog/${id}/comment`, {
        text: newComment.trim(),
        username: user.name,
      });
      setBlog(prev => ({ ...prev, comments: response.data }));
      setNewComment("");
      toast.success("Comment added successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post comment");
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      // NOTE: Ensure your backend endpoint matches this structural logic pattern
      const response = await axios.delete(`${API_BASE}/blog/${id}/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update state with the clean comment array returned from your server
      setBlog(prev => ({ 
        ...prev, 
        comments: prev.comments.filter(c => c._id !== commentId) 
      }));
      toast.success("Comment deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete comment");
    }
  };

  const handleCommentUpdateSubmit = async (commentId) => {
    if (!editingText.trim()) return;

    try {
      await axios.put(`${API_BASE}/blog/${id}/comment/${commentId}`, {
        text: editingText.trim()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBlog(prev => ({
        ...prev,
        comments: prev.comments.map(c => c._id === commentId ? { ...c, text: editingText.trim() } : c)
      }));

      setEditingCommentId(null);
      setEditingText("");
      toast.success("Comment updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update comment");
    }
  };

  // --- LIKES ENGINE ---

  const getlikes = async () => {
    try {
      const response = await axios.get(`${API_BASE}/blog/${id}/likes`);
      setLikes(response.data.totalLikes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLikes = async () => {
    if (!token) {
      toast.warning("Please log in to like this article.");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE}/blog/${id}/likes`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLikes(response.data.totalLikes);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let currentUserId = null;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        currentUserId = decoded.id;
      } catch (e) {
        console.error(e);
      }
    }

    getlikes();

    const fetchSingleBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/blog/details/${id}`);
        setBlog(response.data);
        setLikes(response.data.likes?.length || 0);
        setIsLiked(!!response.data.likes?.includes(currentUserId));

        const explicitContent = response.data.content || response.data.description || "";
        const wordCount = explicitContent.trim().split(/\s+/).length;
        setReadingTime(Math.ceil(wordCount / 225) || 1);
      } catch (err) {
        setError("Could not load the article.");
        toast.error(err.response?.data?.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleBlog();
  }, [id, token]);

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50/30">
      <div className="w-10 h-10 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin mb-3" />
      <p className="text-sm font-medium text-gray-500 animate-pulse">Loading reading experience...</p>
    </div>
  );

  if (error || !blog) return (
    <div className="max-w-xl mx-auto text-center py-24 px-6">
      <p className="text-gray-900 font-bold text-lg">{error || "Article not found."}</p>
      <Link to="/" className="mt-4 inline-flex text-purple-600 font-semibold text-sm">← Back to Home Feed</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-purple-100 text-gray-800">
      <Navbar />
      
      <div className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        <motion.div className="h-1 bg-purple-600 origin-left" style={{ scaleX }} initial={{ scaleX: 0 }} />
      </div>

      <main className="max-w-3xl mx-auto px-6 pt-8 pb-24 flex-1 w-full">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-purple-600 mb-8 transition-colors">
          ← Back to Blogs
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-gray-400 mb-4 font-medium">
            <span>By <span className="text-gray-700 font-semibold">{blog.author || "Admin"}</span></span>
            <span>•</span>
            <span>{blog.date || new Date(blog.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
              {readingTime} MIN READ
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            {blog.title}
          </h1>
        </header>

        {blog.image && (
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-xs mb-10 aspect-video w-full bg-gray-50">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-purple max-w-none text-gray-800 text-base sm:text-lg leading-relaxed whitespace-pre-line mb-10">
          {blog.content || blog.description}
        </div>

        {/* Likes Integration Panel */}
        <div className="py-4 border-y border-gray-100 flex items-center gap-3 mb-14">
          <button onClick={handleLikes} className="p-2.5 rounded-full bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all active:scale-90">
            {isLiked ? <FaHeart className="w-6 h-6 text-red-500 scale-110" /> : <CiHeart className="w-6 h-6 text-gray-700 stroke-[0.5]" />}
          </button>
          <div>
            <p className="text-sm font-bold text-gray-900">{likes} likes</p>
            <p className="text-xs text-gray-400">Appreciate this creator's work</p>
          </div>
        </div>

        {/* Comments Section */}
        <section>
          <h3 className="text-xl font-extrabold text-gray-900 mb-6">Discussions ({blog.comments?.length || 0})</h3>

          <form onSubmit={handleCommentSubmit} className="flex gap-3 items-start mb-8 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
            <input
              type="text"
              placeholder="Join the discussion..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-white px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium focus:outline-hidden focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
            />
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-2xs">
              Post
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {blog.comments && blog.comments.length > 0 ? (
              blog.comments.map((comment) => {
                // Identity Check: Is the currently active user the author of this comment?
                const isCommentOwner = user && user.name && comment.username === user.name;
                const isCurrentlyEditing = editingCommentId === comment._id;

                return (
                  <div key={comment._id} className="p-5 border border-gray-100 bg-white rounded-2xl shadow-3xs transition-all relative group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">{comment.username}</span>
                        {isCommentOwner && (
                          <span className="text-[10px] font-extrabold bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded-md tracking-wide">YOU</span>
                        )}
                      </div>
                      <span className="text-xs font-medium text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {isCurrentlyEditing ? (
                      /* Inline Editing Field Wrapper */
                      <div className="mt-2 space-y-2">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="w-full bg-white px-3 py-2 border border-purple-400 rounded-xl text-sm font-medium focus:outline-hidden text-gray-700"
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => { setEditingCommentId(null); setEditingText(""); }}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleCommentUpdateSubmit(comment._id)}
                            className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Static Text Render Mode */
                      <div>
                        <p className="text-sm text-gray-600 leading-relaxed pr-16">{comment.text}</p>
                        
                        {/* Render modification utilities exclusively for the comment author */}
                        {isCommentOwner && (
                          <div className="absolute right-4 bottom-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => { setEditingCommentId(comment._id); setEditingText(comment.text); }}
                              className="text-xs font-bold text-gray-400 hover:text-purple-600 transition-colors px-2 py-1"
                            >
                              Edit
                            </button>
                            <span className="text-gray-200 text-xs">|</span>
                            <button
                              onClick={() => handleCommentDelete(comment._id)}
                              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors px-2 py-1"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-400 italic text-center py-4 bg-gray-50/30 rounded-xl border border-dashed border-gray-100">
                No comments shared yet. Start the conversation above!
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetails;
