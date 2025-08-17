import React from 'react'
import { useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/imdb.svg'
import { dataCntxt } from "../../../context/DataContext";


const Menu = () => {
    const sideRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const { menuData } = useContext(dataCntxt)
    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="text-white hover:bg-[#313131] hidden lg:flex p-1 px-2 gap-1 cursor-pointer  items-center rounded-4xl"
            >

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
                </svg>
                <p className='font-bold '>Menu</p>

            </button>


            <div
                className={`fixed top-0 left-0 w-screen h-screen hidden lg:block z-100 transform  inset-0 transition-transform duration-500 ease-out ${!isOpen ? '-translate-y-full' : 'translate-y-0'}  flex flex-col `}
                onClick={() => setIsOpen(false)}
            >
                <div
                    ref={sideRef}
                    className='bg-[#1f1f1f] h-screen overflow-y-auto relative '
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='max-w-[1000px] mx-auto py-[2rem] '>
                        <div className='flex justify-between w-full items-center'>
                            <Link to='/' onClick={()=>setIsOpen(false)}> <img src={logo} alt="Logo" className='w-25' /></Link>

                            <div
                                onClick={() => setIsOpen(false)}
                                className="cursor-pointer p-3 m-4 hover:bg-[#f5c518ec] bg-[#F5C518]  rounded-4xl "
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill="none" d="M0 0h24v24H0V0z" />
                                    <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89a.996.996 0 0 0 0-1.4z" />
                                </svg>
                            </div>
                        </div>
                        <div className='flex flex-col h-[70vh] justify-between flex-wrap pt-10 w-full'>
                            {menuData?.map((section,index) => (
                                <div
                                    key={index}
                                    className=" flex w-1/3 gap-2  group transition cursor-pointer">
                                    <img
                                        src={section.icon}
                                        alt={`${section.name} icon`}
                                        className="w-6 h-6 transition duration-200  white-to-yellow" />

                                    <div className="text-white flex flex-col gap-2">
                                        <p className='text-white font-bold text-2xl'>{section.name}</p>
                                        {section.items.map((item, index) => (
                                            <Link
                                                    onClick={() => setIsOpen(false)}
                                                    to={item.url}
                                                    key={index}
                                                    className="block text-white hover:underline transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Menu