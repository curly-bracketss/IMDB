import React from 'react'
import { GrFormNext } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
const Filter = ({ onFilterChange }) => {
    const [filter, setFilter] = useState('All')
    const [isOpen, setIsOpen] = useState(false)
    const boxRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };


        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    const handleFilter = (newFilter) => {
        setFilter(newFilter)
        setIsOpen(false)
        if (onFilterChange) {
            onFilterChange(newFilter)
        }
    }
    function handleOpen() {
        setIsOpen((prev) => !prev)
    }

    return (
        <div>
            <div ref={boxRef} onClick={(e) => handleClickOutside(e)}>
                <button onClick={() => handleOpen()} className='sm:bg-white  sm:rounded-tl-md sm:rounded-bl-md  flex outline-none py-1 sm:hover:bg-[#f5f5f5] hover:bg-white/10  text-sm md:text-md  items-center  border-r-1 border-black px-2 cursor-pointer'>
                    <p className='text-white sm:text-black line-clamp-1'>{filter}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${isOpen ? 'rotate-180' : ''} sm:fill-black fill-white transition-all duration-200 ease-in-out `} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"></path></svg>

                </button>
                {isOpen &&
                    <div className={`bg-[#1f1f1f] ${isOpen ? 'open' : 'transition '} mt-2  flex flex-col py-4 w-60 absolute text-white z-200 max-[600px]:-bottom-[95vh] max-[600px]:w-full  `}>
                        <button onClick={() => handleFilter('All')} className='flex hover:bg-white/10 cursor-pointer items-center gap-4 px-[1rem] py-[.75rem] group'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={` ${filter === "All" ? "fill-[#F5C518]" : "fill-[#ffffff80] group-hover:fill-white"}`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                            <p className={` ${filter === "All" ? 'text-[#F5C518]' : 'text-white'}`}>All</p>
                        </button>
                        <button onClick={() => handleFilter('Titles')} className='flex hover:bg-white/10 cursor-pointer items-center gap-4 px-[1rem] py-[.75rem] group'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={` ${filter === "Titles" ? "fill-[#F5C518]" : "fill-[#ffffff80] group-hover:fill-white"}`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></svg>
                            <p className={` ${filter === "Titles" ? 'text-[#F5C518]' : 'text-white'}`}>Titles</p>

                        </button>
                        <button onClick={() => handleFilter('Tv episodes')} className='flex hover:bg-white/10 cursor-pointer items-center gap-4 px-[1rem] py-[.75rem] group'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={` ${filter === "Tv episodes" ? "fill-[#F5C518]" : "fill-[#ffffff80] group-hover:fill-white"}`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 0 0-2-2zm-1 14H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"></path></svg>
                            <p className={` ${filter === "Tv episodes" ? 'text-[#F5C518]' : 'text-white'}`}>Tv episodes</p>

                        </button>
                        <button onClick={() => handleFilter('Celebs')} className='flex hover:bg-white/10 cursor-pointer items-center gap-4 px-[1rem] py-[.75rem] group'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={` ${filter === "Celebs" ? "fill-[#F5C518]" : "fill-[#ffffff80] group-hover:fill-white"}`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z"></path></svg>
                            <p className={` ${filter === "Celebs" ? 'text-[#F5C518]' : 'text-white'}`}>Celebs</p>

                        </button>
                        <button onClick={() => handleFilter('Companies')} className='flex hover:bg-white/10 cursor-pointer items-center gap-4 px-[1rem] py-[.75rem] group'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={` ${filter === "Cpmpanies" ? "fill-[#F5C518]" : "fill-[#ffffff80] group-hover:fill-white"}`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12 7V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-8zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm9 12h-7v-2h2v-2h-2v-2h2v-2h-2V9h7c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1zm-1-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></svg>
                            <p className={` ${filter === "Companies" ? 'text-[#F5C518]' : 'text-white'}`}>Companies</p>

                        </button>
                        <button onClick={() => handleFilter('Keywords')} className='flex hover:bg-white/10 cursor-pointer items-center gap-4 px-[1rem] py-[.75rem] group'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={` ${filter === "Keywords" ? "fill-[#F5C518]" : "fill-[#ffffff80] group-hover:fill-white"}`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84l3.96-5.58a.99.99 0 0 0 0-1.16l-3.96-5.58z"></path></svg>
                            <p className={` ${filter === "Keywords" ? 'text-[#F5C518]' : 'text-white'}`}>Keywords</p>

                        </button>
                        <Link to='/search' className='flex border-t-1 border-white/40 hover:bg-white/10 cursor-pointer items-center gap-4 px-[1rem] py-[.75rem] group'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={` ${filter === "Advance search    " ? "fill-[#F5C518]" : "fill-[#ffffff80] group-hover:fill-white"}`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M20 19.59V8.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.86.56-1.89.88-3 .82-2.37-.11-4.4-1.96-4.72-4.31a5.013 5.013 0 0 1 5.83-5.61c1.95.33 3.57 1.85 4 3.78.33 1.46.01 2.82-.7 3.9L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"></path></svg>
                            <p className={` ${filter === "Advance search" ? 'text-[#F5C518]' : 'text-white'}`}>Advanced search</p>
                            <GrFormNext className=' text-[#ffffff80]  group-focus:fill-[#F5C518] text-xl' />

                        </Link>
                    </div>}
            </div>
            {isOpen && <div onClick={() => setIsOpen(false)} className='inset-0 bg-black/40 fixed z-100'>
                <span
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer p-2  sm:hidden hover:bg-[#313131] w-fit rounded-4xl absolute bottom-[38vh] right-0   text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0V0z" />
                        <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89a.996.996 0 0 0 0-1.4z" />
                    </svg>
                </span>
            </div>}

        </div>
    )
}

export default Filter