import AboutTrailer from "../src/Components/AboutTrailer.jsx"
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { dataCntxt } from '../context/DataContext.jsx'
import { Gallery } from "../src/Components/Gallery.jsx"
const MovieAbout = () => {
  const { swiperData } = useContext(dataCntxt);
  const { movieData } = useContext(dataCntxt);
  const { id } = useParams();
  const movie = swiperData?.find((item) => item.id === id) || movieData?.find((item) => item.id === id);
  const posterUrl = movie?.posterUrl
  return (
    <div>
      <div class="relative w-full  bg-center bg-cover bg-no-repeat "
        style={{
          backgroundImage: `url(${posterUrl})`,

        }}>
        <div class="absolute  inset-0 bg-overlay"></div>

        <div className=' px-[1.25rem] max-w-[1280px] mx-auto relative'>
          <AboutTrailer />
        </div>
      </div>
      <div className="bg-white">
        <div className=' px-[1.25rem] max-w-[1280px] mx-auto relative'>

          <Gallery />
        </div>
      </div>
    </div>
  )
}

export default MovieAbout