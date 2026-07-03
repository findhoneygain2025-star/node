import React, { useState } from "react";
import { Link } from "react-router-dom";
const CookieSettings = () => {
  const [preferences, setPreferences] = useState({ essential: true, analytics: true, marketing: false });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen text-black py-12 px-6">
         <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium mb-6 ml-12 inline-block">
                ← Back to Blogs
            </Link>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-2">Cookie Preferences</h1>
        <p className="text-gray-500 text-sm mb-6">Manage how cookies dictate your processing experience across Blogify.</p>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-sm">Essential Cookies</p>
              <p className="text-xs text-gray-500">Required to manage secure active user logins. Cannot be shut off.</p>
            </div>
            <input type="checkbox" checked={preferences.essential} disabled className="w-4 h-4 accent-gray-500 cursor-not-allowed" />
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-sm">Analytics Tracking</p>
              <p className="text-xs text-gray-500">Allows authors to see real hit metrics on their published posts.</p>
            </div>
            <input 
              type="checkbox" 
              checked={preferences.analytics} 
              onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
              className="w-4 h-4 accent-gray-600 cursor-pointer" 
            />
          </div>
        </div>

        <button onClick={handleSave} className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-2.5 rounded-xl transition">
          {saved ? "Preferences Saved!" : "Save Choices"}
        </button>
      </div>
    </div>
  );
};

export default CookieSettings;