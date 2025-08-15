import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { PiLineVerticalBold } from "react-icons/pi";
import Swiper from '../src/Components/Swiper'
import MovieSwiper from '../src/Components/MovieSwiper'

const Home = () => {
  return (
    <div className='bg-black'>
      <div className='max-w-[1280px] px-[1.25 rem] mx-auto'>
        <Swiper />
        <div className="flex justify-between items-center py-10">
          <h2 className=" text-3xl font-bold text-[#F5C518]">What to watch</h2>
          <Link to='/what-to-watch' className="text-[#5799EF] font-bold text-sm flex items-center">Get more recommendations 
              <IoIosArrowForward className='text-[#5799EF] font-bold text-sm' />
          </Link>
        </div>
        <div className='flex flex-col '>
          <Link to='/what-to-watch/top-picks'>
            <div className='group flex  items-center relative '>
              {/* [#F5C518] */}
              <PiLineVerticalBold className='text-[#F5C518] text-[2rem] font-extrabold absolute -left-3' />

              <h1 className='text-white text-2xl font-bold flex items-center pl-3'>
                Top picks </h1>
              <IoIosArrowForward className='text-white text-3xl font-bold group-hover:text-[#F5C518]' />
            </div>
          </Link>
          <p className="text-[#FFFFFFB3]">TV shows and movies just for you</p>
          <Link to='/registration/sign-in' className="hover:underline text-sm pt-2 text-[#5799EF]">Sign in</Link>
          <MovieSwiper />
        </div>
        <div className=" h-80">
          <Link to='/what-to-watch/from-your-watchlist'>
            <div className='group flex  items-center relative '>
              {/* [#F5C518] */}
              <PiLineVerticalBold className='text-[#F5C518] text-[2rem] font-extrabold absolute -left-3' />

              <h1 className='text-white text-2xl font-bold flex items-center pl-3'>
                From your Watchlist </h1>
              <IoIosArrowForward className='text-white text-3xl font-bold group-hover:text-[#F5C518]' />
            </div>
          </Link>
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <div >
              <svg
                className="fill-[#FFFFFFB3]/20 stroke-[#444343] stroke-[0.8]  "
                width="42px" height="62px" viewBox="0 0 32 45.3"
              >
                <polygon points="24 0 0 0 0 32 12.24 26.29 24 31.77" />
                <svg
                className="fill-white"
                width="20"
                height="24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
              </svg>
              </svg>
              
            </div>
            <div className="text-white flex flex-col items-center">
              <h3 className="font-bold">Sign in to access your Watchlist</h3>
              <h4>Save shows and movies to keep track of what you want to watch.</h4>
            </div>
            <Link to='/registration/sign-in'> <button className="rounded-4xl  py-2 px-8 bg-[#FFFFFF14] text-[#5799EF] font-medium text-sm">Sign in to IMDB</button></Link>
          </div>
        </div>
        <div className='flex flex-col '>

          <div className='group flex  items-center relative '>
            {/* [#F5C518] */}
            <PiLineVerticalBold className='text-[#F5C518] text-[2rem] font-extrabold absolute -left-3' />

            <h1 className='text-white text-2xl font-bold flex items-center pl-3'>
              Top 10 on IMDb this week </h1>
          </div>
          <MovieSwiper />
        </div>
        <div className='flex flex-col '>
          <Link to='/what-to-watch/fan-favorites/'>
            <div className='group flex  items-center relative '>
              {/* [#F5C518] */}
              <PiLineVerticalBold className='text-[#F5C518] text-[2rem] font-extrabold absolute -left-3' />

              <h1 className='text-white text-2xl font-bold flex items-center pl-3'>
                Fan favourites</h1>
              <IoIosArrowForward className='text-white text-3xl font-bold group-hover:text-[#F5C518]' />
            </div>
          </Link>
          <p className="text-[#FFFFFFB3]">This week's top TV and movies</p>
          <MovieSwiper />
        </div>
        
      </div>
    </div>
  )
}
// 
export default Home