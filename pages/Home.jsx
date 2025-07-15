import React from 'react'
import Swiper from '../src/Components/Swiper'
import MovieSwiper from '../src/Components/MovieSwiper'

const Home = () => {
  return (
    <div className='bg-black'>
    <div className='max-w-[1400px] mx-auto'>
        <Swiper/>
        <MovieSwiper/>
    </div>
    </div>
  )
}

export default Home