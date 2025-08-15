import React, { useState, useEffect, useContext } from 'react';
import { dataCntxt } from "../../context/DataContext";
import Movie from './Movie';

const MovieSwiper = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3); // default to 3
  const [isPaused, setIsPaused] = useState(false);
  const { movieData } = useContext(dataCntxt);

  const slides = movieData || [];

  const totalSlides = Math.max(0, Math.ceil(slides.length / slidesPerView) - 1);

  const updateBreakpoints = () => {
    const width = window.innerWidth;
    if (width >= 1240) {
      setSlidesPerView(6.5);
    } else if (width >= 1024) {
      setSlidesPerView(5.5);
    } else if (width >= 598) {
      setSlidesPerView(4.5);
    } else {
      setSlidesPerView(2.5);
    }
  };

  useEffect(() => {
    updateBreakpoints();
    window.addEventListener('resize', updateBreakpoints);
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
  }, [slidesPerView]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (totalSlides + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides + 1) % (totalSlides + 1));
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
    <div className="py-10 pl-[0.75rem] xl:pl-0 group">
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
            {slides.map((movie) => (
              <div
                key={movie.title}
                className="w-full"
                style={{ flex: `0 0 ${100 / slidesPerView}%` }} // ← updated to handle multiple per view
              >
                <Movie movie={movie} />
              </div>
            ))}
          </div>
        </div>

        {currentSlide > 0 && (
          <button
            onClick={prevSlide}
            className="absolute hidden group-hover:flex top-1/3 transform -translate-y-1/2 w-12 h-16 border-1 rounded-md left-0.5 border-white shadow-lg bg-[#12121273] items-center justify-center transition-all duration-300 group z-10"
            aria-label="Previous slide"
          >
            <svg className="w-10 h-10 text-white hover:text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <button
          onClick={nextSlide}
          className="absolute flex  top-1/3 transform -translate-y-1/2 w-12 h-16 border-1 rounded-md right-0.5 border-white shadow-lg bg-[#12121273] items-center justify-center transition-all duration-300 group z-10"
          aria-label="Next slide"
        >
          <svg className="w-10 h-10 text-white hover:text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieSwiper;
