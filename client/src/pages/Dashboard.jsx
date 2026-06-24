import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  const blogs = [
    {
      id: 1,
      title: "React Basics",
      author: "John Doe",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      description:
        "Learn the fundamentals of React and build interactive UI easily.",
    },
    {
      id: 2,
      title: "Node.js Backend",
      author: "Sarah Smith",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      description:
        "Understand how to create backend APIs using Node.js and Express.",
    },
    {
      id: 3,
      title: "MongoDB Guide",
      author: "Alex Johnson",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      description:
        "Store and manage data efficiently using MongoDB database.",
    },
  ];

  const pageStyle = {
    padding: "30px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    fontFamily: "Arial",
  };

  const topBar = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  };

  const headingStyle = {
    color: "#333",
  };

  const createBtn = {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const blogContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  const contentStyle = {
    padding: "15px",
  };

  const buttonContainer = {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  };

  const updateBtn = {
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const deleteBtn = {
    padding: "8px 15px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
  <div>
    <Navbar/>
      <div style={pageStyle}>
      <div style={topBar}>
        <h1 style={headingStyle}>User Dashboard</h1>

        <Link to="/create-blog" style={createBtn}>
          Create Blog
        </Link>
      </div>

      <div style={blogContainer}>
        {blogs.map((blog) => (
          <div key={blog.id} style={cardStyle}>
            <img src={blog.image} alt={blog.title} style={imageStyle} />

            <div style={contentStyle}>
              <h2>{blog.title}</h2>

              <p>
                <strong>Author:</strong> {blog.author}
              </p>

              <p>{blog.description}</p>

              <div style={buttonContainer}>
                <button style={updateBtn}>Update</button>

                <button style={deleteBtn}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default UserDashboard;