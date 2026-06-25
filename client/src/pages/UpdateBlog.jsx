import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Added useParams

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Grabs the :id parameter from your route URL

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    author: "",
  });

  // ✅ Fetch current blog details when the page loads
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        // Using your working details endpoint from earlier
        const response = await axios.get(`http://localhost:3000/blog/details/${id}`);
        
        // Populate the form state with existing data from the database
        setFormData({
          title: response.data.title || "",
          image: response.data.image || "",
          content: response.data.content || "",
          author: response.data.author || "",
        });
      } catch (err) {
        console.error("Error fetching blog details:", err.response?.data || err.message);
        alert("Failed to load blog data.");
      }
    };

    if (id) fetchBlogDetails();
  }, [id]);

  // ✅ Uncommented: Keeps the input values in sync with state as you type
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Fixed handleSubmit parameters
  async function handleSubmit(e) {
    e.preventDefault(); // Fixed: Added 'e' parameter to prevent page refresh
    
    const token = localStorage.getItem("token"); // Pulling the token from storage if necessary

    try {
      const response = await axios.put(
        `http://localhost:3000/blog/update/${id}`, 
        formData, // ✅ Sends the entire updated formData object
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Blog updated successfully", response.data);
      navigate("/dashboard"); // Redirect back to dashboard after a successful update
    } catch (err) {
      console.error("Error updating blog:", err.response?.data || err.message);
      alert("Failed to update blog.");
    }
  }

  // Styles remain unchanged
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    fontFamily: "Arial",
  };

  const formStyle = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "450px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const textareaStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    minHeight: "120px",
    resize: "none",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <div>
      <Navbar />
      <div style={pageStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h2 style={headingStyle}>Update Blog</h2>

          <input
            type="text"
            name="title"
            placeholder="Enter Blog Title"
            value={formData.title}
            onChange={handleChange} // ✅ Activated
            style={inputStyle}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Enter Image URL"
            value={formData.image}
            onChange={handleChange} // ✅ Activated
            style={inputStyle}
            required
          />

          <textarea
            name="content"
            placeholder="Enter Blog Content"
            value={formData.content}
            onChange={handleChange} // ✅ Activated
            style={textareaStyle}
            required
          ></textarea>

          <input
            type="text"
            name="author"
            placeholder="Enter Author Name"
            value={formData.author}
            onChange={handleChange} // ✅ Activated
            style={inputStyle}
            required
          />

          <button type="submit" style={buttonStyle}>
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;