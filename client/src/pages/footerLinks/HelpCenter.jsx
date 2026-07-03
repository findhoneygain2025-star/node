import React, { useState } from "react";
import { Link } from "react-router-dom";
const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

const faqs = [
    { 
      q: "How do I create a new blog post?", 
      a: "Once you log into your account, click on the 'Dashboard' link in the navigation bar. From there, you will find options to create, write, and publish your new blog posts." 
    },
    { 
      q: "Can I edit or delete a post after publishing?", 
      a: "Yes! You have full control over your content. Navigate to your Dashboard, find the specific post you want to manage, and click the 'Edit' or 'Delete' button next to it." 
    },
    { 
      q: "Do I need an account to read blogs on Blogify?", 
      a: "No, anyone can browse and read all published blogs on our homepage without needing to register or log in. Accounts are only required if you want to write and manage your own posts." 
    },
    { 
      q: "Can I add formatting or images to my blog text?", 
      a: "Yes, our creation panel supports clean text structuring so you can space your paragraphs and present your stories cleanly to your audience." 
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen text-black py-12 px-6">
         <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium mb-6 ml-12 inline-block">
                ← Back to Blogs
            </Link>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Help Center</h1>
        <p className="text-gray-600 text-center mb-10">Find answers to frequently asked questions or browse our documentation.</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-5 font-semibold flex justify-between items-center hover:bg-gray-100 transition"
              >
                <span>{faq.q}</span>
                <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="p-5 border-t border-gray-100 text-gray-600 bg-gray-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;