import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    author: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(formData);
      axios.post("http://localhost:3000/blog/add",formData,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res)=>{
      console.log(res.data)
      navigate('/dashboard')
    })
    .catch((err)=>{
      console.log(err.response.data)
    })
  };

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
    <Navbar/>
      <div style={pageStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={headingStyle}>Create Blog</h2>

        <input
          type="text"
          name="title"
          placeholder="Enter Blog Title"
          value={formData.title}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Enter Image URL"
          value={formData.image}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <textarea
          name="content"
          placeholder="Enter Blog Content"
          value={formData.content}
          onChange={handleChange}
          style={textareaStyle}
          required
        ></textarea>

        <input
          type="text"
          name="author"
          placeholder="Enter Author Name"
          value={formData.author}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <button type="submit" style={buttonStyle}>
          Create Blog
        </button>
      </form>
    </div>
  </div>
  );
};

export default CreateBlog;