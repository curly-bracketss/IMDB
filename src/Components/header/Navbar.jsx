import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import logo from '../../assets/imdb.svg';
import { Link } from 'react-router-dom';
import Search from './Search';
import Menu from './Menu';
import { PiLineVerticalBold } from 'react-icons/pi';
import { RiArrowDownSFill } from 'react-icons/ri';
import imdbpro from '../../assets/icons/imdbpro.svg';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [selectedLabel, setSelectedLabel] = useState("English (United States)");
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [isOpen, setIsOpen] = useState(false);

  const selectorRef = useRef(null);

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang.code);
    setSelectedLabel(lang.label);
  };

  const toggleLanguage = () => setIsOpen(prev => !prev);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='bg-[#121212]'>
      <div className='flex items-center sm:gap-2  h-[60px] justify-between max-w-[1280px] mx-auto'>

        <Sidebar />
        <Link to='/'><img src={logo} alt="Logo" /></Link>
        <Menu className='lg:block hidden' />
        <Search className='w-full' />
        <Link className='rounded-full px-4 py-3 hover:bg-white/10 lg:block hidden'>
          <img src={imdbpro} />
        </Link>
        <p className='text-white/10 text-4xl hidden sm:block' >|</p>
        <Link to='/list/watchlist' className='hidden gap-2 items-center rounded-full px-4 py-3 hover:bg-white/10 lg:flex'>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className='fill-white' viewBox="0 0 24 24" fill="currentColor" role="presentation">
            <path d="M17 3c1.05 0 1.918.82 1.994 1.851L19 5v16l-7-3-7 3V5c0-1.05.82-1.918 1.851-1.994L7 3h10zm-4 4h-2v3H8v2h3v3h2v-3h3v-2h-3V7z" fill="white"></path>
          </svg>
          <p className='font-bold text-sm  text-white'>Watchlist</p>
        </Link>
        <Link to='/registration/signin' className='font-bold p-2 hover:bg-white/10  rounded-full text-sm text-white'>Sign in</Link>

        {/* Language selector */}
        <div className='relative text-white' ref={selectorRef}>
          <button 
            onClick={toggleLanguage} 
            className="p-2 rounded-full lg:flex hover:bg-white/10 text-white items-center hidden group cursor-pointer"
          >
            <span className="text-sm font-bold">{selectedLanguage}</span>
            <RiArrowDownSFill className='transition-transform duration-200 ' />
          </button>

          <LanguageSelector
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            selectedLang={selectedLanguage}
            onSelect={handleLanguageSelect}
          />
        </div>
        <button className='bg-[#F5C518] p-1 sm:p-2 text-[.875rem] lg:hidden rounded-full font-bold'>
            <Link to='https://apps.apple.com/us/app/imdb-movies-tv-shows/id342792525?%2524canonical_url=https%3A%2F%2Fm.imdb.com%2F&_branch_match_id=1417190059003232684&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL86pTNJLLCjQy8nMy9YvK6kydPaPyotwTLJXNTJJTszLz8tMTsyJLy3Ksc0AaVE1dlQ1cgOiXL3M3JQkveT8XCBHra4oNS21qCgzLz0%2BqSi%2FvDi1yNY5oyg%2FNxUAU6k1ImgAAAA%3D&utm_campaign=mobile+nav+bar+OpenApp&utm_medium=marketing&utm_source=IMDb+Mdot'>Use app</Link>
        </button>

      </div>
    </div>
  )
}

export default Navbar;
