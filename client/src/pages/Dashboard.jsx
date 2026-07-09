import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios"
import { useState } from "react";
import Footer from '../components/Footer'
const API_BASE = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";


const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");

  axios.get(`${API_BASE}/blog/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    let {message} = res.data;
    toast.success(message);
    setBlogs(res.data);
  })
    .catch((err) => {
      let errorMessage = err.response?.data?.message || err.message || "Failed to get blogs from server";
      toast.error(errorMessage);
    })

 function handleDelete(id) {
    axios.delete(`${API_BASE}/blog/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res)=>{
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
      let {message} = res.data;
      toast.success(message);
      console.log("Blog deleted successfully");
    }).catch ((err)=> {
      let errorMessage = err.response?.data?.message || err.message || "Failed to delete blog";
      toast.error(errorMessage);
    })
  }


  const pageStyle = {
    padding: "5%", // Fluid padding for small screens
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", // Clean modern font stack
  };

  const topBar = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap", // Wraps nicely if title and button collide on tiny phones
    gap: "15px",
  };

  const headingStyle = {
    color: "#212529",
    fontSize: "1.75rem",
    margin: 0,
  };

  const createBtn = {
    padding: "8px 16px",
    backgroundColor: "#198754",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.9rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  };

  const blogContainer = {
    display: "grid",
    // 240px is the sweet spot for clean, compact cards on mobile and desktop alike
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
    width: "100%", // Let it utilize the full page container width smoothly
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease",
  };

  const imageStyle = {
    width: "100%",
    height: "130px",
    objectFit: "cover",
  };

  const contentStyle = {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  };

  const titleStyle = {
    fontSize: "1.05rem",
    color: "#212529",
    margin: "0 0 12px 0",
    fontWeight: "600",
    lineHeight: "1.3",
  };

  const buttonContainer = {
    display: "flex",
    gap: "8px",
    width: "100%",
  };

  const updateBtn = {
    flex: 1,
    padding: "6px 12px",
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "500",
  };

  const deleteBtn = {
    flex: 1,
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "500",
  };

  return (
    <div>
      <Navbar />
      <div style={pageStyle}>
        <div style={topBar}>
          <h1 style={headingStyle}>User Dashboard</h1>

          <Link to="/create-blog" style={createBtn} className="flex text-center justify-center gap-2 items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Create Blog <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          </Link>
        </div>

        <div style={blogContainer}>
          {blogs.map((blog) => (
            <div key={blog._id} style={cardStyle}>
              <Link to={`/blog/${blog._id || blog.id}`}>
                <img src={blog.image} className="w-full h-52 object-cover" alt={blog.title} style={imageStyle} />
              </Link>
              <div style={contentStyle}>
                <h2 style={titleStyle}>{blog.title}</h2>

                <div style={buttonContainer}>

                  <Link
                    to={`/update-blog/${blog._id}`}
                    style={updateBtn}
                    className="flex justify-center items-center gap-2 text-center no-underline text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">
                    Update
                    <svg class="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                    </svg>
                  </Link>

                  <button style={deleteBtn} onClick={() => handleDelete(blog._id)} className="flex text-center justify-center gap-2 items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">
                    Delete
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;