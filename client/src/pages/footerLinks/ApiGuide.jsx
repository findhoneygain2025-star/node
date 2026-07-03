import React, { useState } from "react";
import { Link } from "react-router-dom";
const ApiGuide = () => {
  const [copied, setCopied] = useState(false);
  const codeSnippet = `fetch('https://api.blogify.com/v1/posts')\n  .then(response => response.json())\n  .then(data => console.log(data));`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-black py-12 px-6">
         <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium mb-6 ml-12 inline-block">
                ← Back to Blogs
            </Link>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Blogify Public API</h1>
        <p className="text-gray-600 mb-8">Integrate Blogify's public feeds into your own apps or external reader systems.</p>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-6">
          <h2 className="text-xl font-bold mb-2">Get Latest Posts</h2>
          <p className="text-sm text-gray-500 mb-4"><span className="bg-green-100 text-green-800 font-mono px-2 py-1 rounded mr-2">GET</span> /v1/posts</p>
          
          <div className="relative bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto">
            <button 
              onClick={handleCopy} 
              className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 text-xs rounded text-white transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <pre>{codeSnippet}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiGuide;