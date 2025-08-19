import Trailer from "../src/Components/Trailer"
import MovieSwiper from "../src/Components/MovieSwiper"
import {IoIosArrowForward} from 'react-icons/io'
import {PiLineVerticalBold} from 'react-icons/pi'
const MovieDetails = () => {

  return (
    <div className='bg-black'>
      <div className='max-w-[1280px] px-[1.25rem] mx-auto flex flex-col gap-10'>
        <Trailer />
        <div className="flex flex-col gap-5 py-5">
          <div className='group flex  items-center relative  '>
            {/* [#F5C518] */}
            <PiLineVerticalBold className='text-[#F5C518] text-[2rem] font-extrabold absolute -left-3' />

            <h1 className='text-white text-2xl font-bold flex items-center pl-3'>
              Feautured Videos </h1>
          </div>
          <MovieSwiper />

        </div>
          <div className="flex flex-col gap-5 py-5">
          <div className='group flex  items-center relative  '>
            {/* [#F5C518] */}
            <PiLineVerticalBold className='text-[#F5C518] text-[2rem] font-extrabold absolute -left-3' />

            <h1 className='text-white text-2xl font-bold flex items-center pl-3'>
              Related Videos </h1>
          </div>
          <MovieSwiper />

        </div>
      </div>
    </div>
  )
}

export default MovieDetails