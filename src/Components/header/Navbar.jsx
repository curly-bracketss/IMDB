import React, { useState, useRef, useEffect, useContext } from 'react';
import Sidebar from './Sidebar';
import logo from '../../assets/imdb.svg';
import { Link } from 'react-router-dom';
import Search from './Search';
import Menu from './Menu';
import { PiLineVerticalBold } from 'react-icons/pi';
import { RiArrowDownSFill } from 'react-icons/ri';
import imdbpro from '../../assets/icons/imdbpro.svg';
import LanguageSelector from './LanguageSelector';
import { dataCntxt } from '../../../context/DataContext';

const Navbar = () => {
  const [selectedLabel, setSelectedLabel] = useState("English (United States)");
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const selectorRef = useRef(null);

  const { currentUser,setCurrentUser } = useContext(dataCntxt)


  console.log(currentUser?.name)
  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang.code);
    setSelectedLabel(lang.label);
  };

  function handleUserData() {
    setUserDropdown((prev) => !prev)
  }
  const toggleLanguage = () => setIsOpen(prev => !prev);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(true)
    }
    const handleClickOutside = (e) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  function handleSignOut(setCurrentUser) {
    // Remove user data from localStorage
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token"); // optional if you store token

    // Update context state
    if (setCurrentUser) setCurrentUser(null);
}
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
        <Link to={`${user ? `/user/ur${currentUser?.id}/watchList` : '/registration/signin'}`} className='hidden gap-1 items-center rounded-full px-4 py-1 hover:bg-white/10 lg:flex'>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className='fill-white' viewBox="0 0 24 24" fill="currentColor" role="presentation">
            <path d="M17 3c1.05 0 1.918.82 1.994 1.851L19 5v16l-7-3-7 3V5c0-1.05.82-1.918 1.851-1.994L7 3h10zm-4 4h-2v3H8v2h3v3h2v-3h3v-2h-3V7z" fill="white"></path>
          </svg>
          <p className='font-bold text-sm  text-white'>Watchlist</p>
          {user ? <p className='px-2 bg-[#F5C518] rounded-full text-[0.7rem]'>{currentUser?.watchList?.length}</p> : ''}
        </Link>
        {!user ? <Link to='/registration/signin' className='font-bold p-2 hover:bg-white/10  rounded-full text-sm text-white'>Sign in</Link>
          :
          <div className='flex  relative gap-2 text-white rounded-full px-4 py-1 hover:bg-white/10 cursor-pointer' onClick={() => handleUserData()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"></path></svg>
            <p className='font-bold text-white'>{currentUser?.name.split(" ")[0]}</p>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${userDropdown ? 'rotate-180' : ''} transition-all duration-200 ease-in-out `} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"></path></svg>
            {userDropdown &&
              <div className='bg-[#121212] border-1 rounded-sm border-[#ffffff1a] right-0 py-2 absolute text-white flex top-11 text-lg w-55 flex-col'>
                <Link className='px-8 py-2 hover:bg-white/10' to={`/user/ur${currentUser?.id}/watchList`}>Your Watchlist</Link>
                <Link className='px-8 py-2 hover:bg-white/10' to={`/user/ur${currentUser?.id}/watchHistory`}>Your watch history</Link>
                <Link className='px-8 py-2 hover:bg-white/10' to={`/user/ur${currentUser?.id}/rateHistory`}>Your ratings</Link>
                <span className='px-8 py-2 hover:bg-white/10' onClick={() => handleSignOut({currentUser})}>Sign out</span>
              </div>}


          </div>
        }


        {/* Language selector */}
        <div className='relative text-white' ref={selectorRef}>
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 rounded-full lg:flex hover:bg-white/10 text-white items-center hidden group cursor-pointer"
          >
            <span className="text-sm font-bold">{selectedLanguage}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${isOpen ? 'rotate-180' : ''} transition-all duration-200 ease-in-out `} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"></path></svg>

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
