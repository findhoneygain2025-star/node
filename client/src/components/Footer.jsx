import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-8 sm:pt-12 lg:px-6">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand/Newsletter Segment */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              {/* Soft Purple Accent Logo Icon Placeholder */}
              <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                B
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Blogify</span>
            </div>
            
            <p className="text-sm leading-6 text-gray-600 max-w-md">
              The latest industry news, interviews, technologies, and academic resources delivered right to your inbox weekly.
            </p>
            
          </div>

          {/* Nav Links Layout Column Grid splits into 2 sub-columns on tiny screens, or takes 2/3 space on big grids */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 sm:grid-cols-4">
            
            {/* Column 1: Core Topics */}
            <div>
              <h3 className="text-xs font-semibold text-purple-600 tracking-wider uppercase">Topics</h3>
              <ul className="mt-4 space-y-3">
                <li><Link to="/?category=Psychology" className="text-sm text-gray-600 hover:text-purple-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Psychology</Link></li>
                <li><Link to="/?category=Animals" className="text-sm text-gray-600 hover:text-purple-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Animals</Link></li>
                <li><Link to="/?category=Technology" className="text-sm text-gray-600 hover:text-purple-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Technology</Link></li>
                <li><Link to="/?category=Design" className="text-sm text-gray-600 hover:text-purple-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Design</Link></li>
              </ul>
            </div>

            {/* Column 2: Additional Categories */}
            <div>
              <h3 className="text-xs font-semibold text-slate-800 tracking-wider uppercase">More Categories</h3>
              <ul className="mt-4 space-y-3">
                <li><Link to="/?category=Lifestyle" className="text-sm text-gray-600 hover:text-purple-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Lifestyle</Link></li>
                <li><Link to="/?category=Productivity" className="text-sm text-gray-600 hover:text-purple-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Productivity</Link></li>
                <li><Link to="/?category=Business" className="text-sm text-gray-600 hover:text-purple-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Business</Link></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h3 className="text-xs font-semibold text-slate-800 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-3">
                <li><Link to="/about" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">About Us</Link></li>
                <li><Link to="/dashboard" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Write a Post</Link></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">API Guide</a></li>
              </ul>
            </div>

            {/* Column 4: Legal Protocols */}
            <div>
              <h3 className="text-xs font-semibold text-slate-800 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Cookie Settings</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Horizontal Separation Border line & Fine Print */}
        <div className="mt-16 border-t border-gray-200 pt-8 sm:flex sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-gray-400 sm:order-1">
            &copy; {new Date().getFullYear()} Blogify Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0 sm:order-2">
            {/* Optional Small Social Text Badges or links */}
            <span className="text-xs text-gray-400 font-medium">Built with React & Tailwind</span>
          </div>
        </div>

      </div>
    </footer>
  );
}