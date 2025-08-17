import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../src/Components/header/Navbar'
import Footer from '../src/Components/footer/Footer'
const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='bg-black py-10'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout