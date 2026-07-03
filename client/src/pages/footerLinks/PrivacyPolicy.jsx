import React from "react";
import { Link } from "react-router-dom";
const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-black py-12 px-6">
         <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium mb-6 ml-12 inline-block">
                ← Back to Blogs
            </Link>
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-6">Last Updated: July 2026</p>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-black mb-2">1. Information We Collect</h2>
            <p>We collect your basic registration data (name, email password hashes) to securely run your Blogify account and display author profiles on public articles.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-black mb-2">2. How We Use Cookies</h2>
            <p>We use session cookies to remember your login status, customize dashboard preferences, and analyze generalized viewer counts per blog post.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-black mb-2">3. Data Controls</h2>
            <p>You maintain absolute control over your content. Any blog deletion deletes your record completely from our production databases instantaneously.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;