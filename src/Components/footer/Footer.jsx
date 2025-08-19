import React from 'react';
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="bg-black  text-white   ">
       <div className="lg:hidden flex justify-center py-4 bg-white/10 ">
          <Link to='https://apps.apple.com/us/app/imdb-movies-tv-shows/id342792525?_branch_match_id=1417190059003232684&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL86pTNJLLCjQy8nMy9Z3TLQ0S%2FZJdkp1TLKvK0pNSy0qysxLj08qyi8vTi2ydc4oys9NBQC46bnMOwAAAA%3D%3D&utm_campaign=DesktopQRCodeFooter-Click&utm_medium=marketing&utm_source=Desktop' className="bg-[#F5C518] text-black px-8 py-2 rounded-full font-semibold hover:bg-yellow-500 transition-colors">
            Get the IMDB App
          </Link>
        </div>
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Sign in button */}
       
        <div className="flex justify-center mb-12">
          <Link to='/registration/sign-in' className="bg-white/10 hover:bg-[#5799ef]/20 text-[#5799ef] lg:bg-[#F5C518] lg:text-black px-8 py-2 rounded-full font-semibold lg:hover:bg-yellow-500 transition-colors">
            Sign in for more access
          </Link>
        </div>

        {/* Main content area */}
        <div className="flex gap-12 items-center justify-center mb-8">
          {/* Follow IMDb section */}
          <div className="flex flex-col justify-center items-center h-30 lg:border-2 border-0 rounded-lg border-white/20 w-100" >
            <h3 className="text-xl hidden lg:block font-semibold mb-6">Follow IMDb on social</h3>
            <div className="flex space-x-6">
              {/* TikTok */}
              <Link to='https://www.tiktok.com/@imdb' className=" text-white hover:underline transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.01z"/>
                </svg>
              </Link>
              
              {/* Insta am */}
              <Link  to='https://www.instagram.com/imdb/' className=" text-white hover:underline transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              
              {/* X (Twitter) */}
              <Link to='https://x.com/imdb' className=" text-white hover:underline transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              
              {/* YouTube */}
              <Link to='https://www.youtube.com/imdb' className=" text-white hover:underline transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
              
              {/* Facebook */}
              <Link to='https://www.facebook.com/imdb' className=" text-white hover:underline transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Get the IMDb App section */}
          <div className="flex-col lg:flex-row items-center hidden lg:flex  border-2 rounded-lg border-white/20 lg:items-center lg:justify-center w-100 h-30 gap-6">
            <div className="text-center lg:text-left ">
              <h3 className="text-xl font-semibold mb-2">Get the IMDb App</h3>
              <p className="text-gray-400">For Android and iOS</p>
            </div>
            <div className="w-24 h-24 bg-white p-2 rounded-lg">
              {/* QR Code placeholder */}
              <div className="w-full h-full bg-gray-900 rounded flex items-center justify-center">
                <div className="grid grid-cols-8 gap-px">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div 
                      key={i} 
                      className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links section */}
        <div className="border-t border-gray-800 pt-8">
          {/* First row of links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 text-sm">
            <Link className="  text-white gap-1 hover:underline transition-colors flex items-center">
              Help
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                <path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path>
              </svg>
            </Link>
            <Link className="  text-white gap-1 hover:underline transition-colors flex items-center">
              Site Index
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                <path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path>
              </svg>
            </Link>
            <Link className="  text-white gap-1 hover:underline transition-colors flex items-center">
              IMDbPro
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                <path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path>
              </svg>
            </Link>
            <Link className="  text-white gap-1 hover:underline transition-colors flex items-center">
              Box Office Mojo
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                <path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path>
              </svg>
            </Link>
            <Link className="  text-white gap-1 hover:underline transition-colors flex items-center">
              License IMDb Data
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                <path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path>
              </svg>
            </Link>
          </div>

          {/* Second row of links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 ">
            <Link className="  text-white hover:underline transition-colors">
              Press Room
            </Link>
            <Link className="text-white gap-1 hover:underline transition-colors flex items-center">
              Advertising
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                <path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path>
              </svg>
            </Link>
            <Link className="  text-white hover:underline transition-colors gap-1 flex items-center">
              Jobs
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                <path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path>
              </svg>
            </Link>
            <Link className="  text-white hover:underline transition-colors">
              Conditions of Use
            </Link>
            <Link className="  text-white hover:underline transition-colors">
              Privacy Policy
            </Link>
            <div className="flex items-center text-gray-300">
              <div className="w-5 h-5 bg-blue-600 rounded mr-2 flex items-center justify-center">
                <span className=" text-white hover:underline text-xs font-bold">Ad</span>
              </div>
              Your Ads Privacy Choices
            </div>
          </div>

          {/* Amazon company section */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">an amazon company</p>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 text-xs">© 1990-2025 by IMDb.com, Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}