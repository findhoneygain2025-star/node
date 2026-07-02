import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios"
import { useState } from "react";
import Footer from  '../components/Footer'
const API_BASE = import.meta.env.VITE_API_URL;



const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");

  axios.get(`${API_BASE}/blog/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setBlogs(res.data);
  })
    .catch((err) => {
      console.log(err.response.data)
    })

  async function handleDelete(id) {
    try {
      await axios.delete(`${API_BASE}/blog/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));

      console.log("Blog deleted successfully");
    } catch (err) {
      console.error("Error deleting blog:", err.response?.data || err.message);
    }
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

          <Link to="/create-blog" style={createBtn}>
            Create Blog
          </Link>
        </div>

        <div style={blogContainer}>
          {blogs.map((blog) => (
            <div key={blog._id} style={cardStyle}>
              <img src={blog.image} alt={blog.title} style={imageStyle} />

              <div style={contentStyle}>
                <h2 style={titleStyle}>{blog.title}</h2>

                <div style={buttonContainer}>

                  <Link
                    to={`/update-blog/${blog._id}`}
                    style={updateBtn}
                    className="flex justify-center items-center text-center no-underline"
                  >
                    Update
                  </Link>

                  <button style={deleteBtn} onClick={() => handleDelete(blog._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default UserDashboard;