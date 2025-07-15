import React, { useState, useEffect, useContext } from 'react';
import { dataCntxt } from "../../context/DataContext";
import Movie from './Movie'
const MovieSwiper = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [show, setShow] = useState(false);
  const [slideClass, setSlideClass] = useState("w-full");
  const { movieData } = useContext(dataCntxt);
  const slides = movieData || [];

  const updateBreakpoints = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setSlidesPerView(5);
      setSlideClass("w-1/6");
    } else if (width >= 768) {
      setSlidesPerView(3);
      setSlideClass("w-4/6");
    } else if (width < 768) {
      setSlidesPerView(2);
      setSlideClass("w-3/4");
    }

  }
  useEffect(() => {
    updateBreakpoints();
    window.addEventListener('resize', updateBreakpoints);
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  const totalSlides = Math.ceil(slides.length / slidesPerView) - 1;
  const nextSlide = () => {
     setCurrentSlide((prev) => {
       const newSlide = (prev + 1) % totalSlides;
       console.log(newSlide); // Log the new slide index
       return newSlide;
     });
   }; 
  const prevSlide = () => {
    setCurrentSlide((prev) => { prev == 1 ? setShow(false) : (prev - 1 + totalSlides) % totalSlides });
  };

  useEffect(() => {
    if (isPaused || totalSlides === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      else if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  if (totalSlides === 0) return null;

  return (
    <div className="py-10 mx-auto max-w-[1400px] ">
      <div
        className="relative w-full rounded-2xl shadow-2xl group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden w-full h-full">
          <div
            className="flex gap-3 w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map(movie => (
              <div key={movie.title} className={` ${slideClass}`}>

                <Movie movie={movie} />
              </div>
            ))}
          </div>
        </div>

        {show ? '' :<button
          onClick={prevSlide}
          className="group-hover:flex hidden absolute top-1/3 transform -translate-y-1/2 w-12 h-16 border-1 rounded-md left-0.5 border-white shadow-lg bg-[#12121273] items-center justify-center transition-all duration-300 group z-10"
          aria-label="Previous slide"
        >
          <svg className="w-10 h-10 text-white hover:text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>}

        <button
          onClick={nextSlide}
          className="absolute md:flex hidden top-1/3 transform -translate-y-1/2 w-12 h-16 border-1 rounded-md right-0.5 border-white shadow-lg bg-[#12121273] items-center justify-center transition-all duration-300 group z-10"
          aria-label="Next slide"
        >
          <svg className="w-10 h-10 text-white hover:text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
export default MovieSwiper