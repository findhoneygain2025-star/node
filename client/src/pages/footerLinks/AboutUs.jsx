import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <div className="bg-gray-100 min-h-screen text-black py-12 px-6">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium mb-6 ml-12 inline-block">
                ← Back to Blogs
            </Link>
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Voices Shared, Stories Welcomed.</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Blogify is an open blogging terminal engineered to democratize modern journaling, industry deep-dives, and independent thought spaces without configuration bottlenecks.
                </p>

                <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-2">Our Core Mission</h3>
                        <p className="text-gray-600 text-sm">To provide writers a fast, minimalistic, and functional suite to spin thoughts into accessible online reading products within seconds.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-2">Built for Developers & Creatives</h3>
                        <p className="text-gray-600 text-sm">Leveraging lightweight systems ensuring markdown stability, clear analytical views, and zero algorithm clutter filters.</p>
                    </div>
                </div>

                <Link to="/dashboard" className="inline-block bg-gray-900 text-white font-medium px-8 py-3.5 rounded-2xl hover:bg-gray-800 transition">
                    Start Writing Today
                </Link>
            </div>
        </div>
    );
};

export default AboutUs;