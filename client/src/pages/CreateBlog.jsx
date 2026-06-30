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
    axios.post("http://localhost:3000/blog/add", formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log("this is data")
        navigate('/dashboard')
      })
      .catch((err) => {
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
      <Navbar />
      <div style={pageStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h2 style={headingStyle}>Create Blog</h2>

          <div class="flex flex-col gap-1.5 max-w-xs">
            <label for="blogs" class="text-xs font-semibold text-slate-700 tracking-wide">
              Filter by category
            </label>

            <div class="relative min-w-[200px] max-w-xs mb-4">
              <select
                name="category"
                id="blogs"
                value={formData.category || 'All Categories'}
                onChange={handleChange}
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