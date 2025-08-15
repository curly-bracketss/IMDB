import { dataCntxt } from "../../context/DataContext";
import { useContext } from "react";
import Movie from "./Movie";


const AllTrailers = () => {
    const { movieData } = useContext(dataCntxt);
      const slides = movieData || [];
  return (
    <div className="max-w-[1280px] mx-auto flex flex-wrap gap-2">
         {slides.map(movie => (
              <div key={movie.title} className='max-w-2xl'>
                <Movie movie={movie} />
              </div>
            ))}
    </div>
  )
}

export default AllTrailers