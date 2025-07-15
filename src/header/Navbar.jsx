import React from 'react'
import { useState } from "react"
import Sidebar from './Sidebar'
import logo from '../assets/imdb.svg'
import { Link } from 'react-router-dom'
import Search from './Search'



const Navbar = () => {
    const [show, setShow] = useState(false)
    return (
        <div className='bg-[#121212] '>
            <div className='flex items-center h-[60px] justify-between max-w-[1400px] mx-auto'>
                <div className='flex items-center'>
                    <div className='lg:hidden block'>
                        <Sidebar />
                    </div>
                    <Link to='/'> <img src={logo} alt="Logo" /></Link>

                </div>
                <div>
                    <div className='md:hidden block'>
                        <Search />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar  