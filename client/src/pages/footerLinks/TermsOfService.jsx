import React from "react";
import { Link } from "react-router-dom";
const TermsOfService = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-black py-12 px-6">
         <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium mb-6 ml-12 inline-block">
                ← Back to Blogs
            </Link>
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-6">Effective Date: July 2026</p>

        <section className="space-y-6 text-gray-700">
          <div>
            <h2 className="text-xl font-bold text-black mb-2">1. Account Responsibilities</h2>
            <p>You are wholly responsible for the safety of your security credentials and all publishing actions conducted under your user credentials.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-black mb-2">2. Intellectual Property Rights</h2>
            <p>You retain full copy ownership of the written material you publish on Blogify. However, you grant us permission to serve and display it publically across our platform architectures.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-black mb-2">3. Prohibited Content</h2>
            <p>Malicious coding, heavy spam campaigns, extreme harassment materials, and illegal distribution properties will be removed without advance notice.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;