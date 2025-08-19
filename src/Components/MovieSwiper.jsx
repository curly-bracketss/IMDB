import React, { useState, useEffect, useContext } from 'react';
import { dataCntxt } from "../../context/DataContext";
import { useParams, Link } from 'react-router-dom';
import Movie from './Movie';
import { FaFaceGrinStars } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa"
import darknight from '../assets/videos/darknight.mp4'
import godfather from '../assets/videos/godfather.mp4'
import godfather2 from '../assets/videos/godfather2.mp4'
import twelveangrymen from '../assets/videos/twelveangrymen.mp4'
import lotrreturnking from '../assets/videos/lotrreturnking.mp4'
import schindlerslist from '../assets/videos/schindlerslist.mp4'
import pulpfiction from '../assets/videos/pulpfiction.mp4'
import glenpowellistherunningman from '../assets/videos/glenpowellistherunningman.mp4'
import theshawshankredemption from '../assets/videos/theshawshankredemption.mp4'
import headsofstatestarstakeourbigbadbuddiesquiz from '../assets/videos/headsofstatestarstakeourbigbadbuddiesquiz.mp4';
const videoMap = {
  'c4f7a95e-0d29-4d2b-85dc-45a77c08b3fb': glenpowellistherunningman,
  "c4f7a95e-0d29-4d3b-85dc-45a77c08b3fb": glenpowellistherunningman,
  "7d2e2e98-b0a3-40b3-9e36-46d2eb4ff502": headsofstatestarstakeourbigbadbuddiesquiz,
  "c4f7a95e-0d29-4d4b-85dc-45a77c08b3fb": glenpowellistherunningman,
  "0468569": darknight,
  "0111161": theshawshankredemption,
  "0068646": godfather,
  "0071562": godfather2,
  "0050083": twelveangrymen,
  "0167260": lotrreturnking,
  "0108052": schindlerslist,
  "0110912": pulpfiction
};


const MovieSwiper = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3); // default to 3
  const [isPaused, setIsPaused] = useState(false);
  const { movieData } = useContext(dataCntxt);
  const { id } = useParams()
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
  const { swiperData } = useContext(dataCntxt);
  function formatNumber(num) {
    if (num === undefined || typeof num !== 'number') {
      return '';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  }

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
    <div className="py-5 pl-[0.75rem] xl:pl-0 group ">
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

            {id ?
              (Object.entries(videoMap).map(([movieId, videoSrc], index) => (

                <div key={index} className={` rounded-lg flex flex-col gap-2  ${movieId===id ? 'bg-white/14 pb-5' :''}`} style={{ flex: `0 0 ${210 / slidesPerView}%` }}>
                  <Link to={`/video/${movieId}`} className='h-full relative '>
                    <video
                      src={videoSrc} // Use the videoMap to get the correct video source
                      key={index}
                      slot='media'
                      muted
                      playsInline
                      className="w-full 
                        rounded-[10px] object-cover cursor-pointer border-1 border-white/20"

                    />

                    <span  className='absolute bottom-2 left-2 flex items-end justify-between w-full text-white  '>
                      <span className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-8 hover:fill-[#F5C518] fill-white' viewBox="0 0 24 24" role="presentation">
                          <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                          <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                        </svg>
                        <h4 >Trailer</h4>
                        <p>{movieData.find(item => item.id === movieId)?.trailerDuration || swiperData.find(item => item.id === movieId)?.trailerDuration}</p>
                      </span>

                    </span>

                  </Link>
                  <Link to={`/video/${movieId}`} className="text-[1rem] text-white hover:underline px-2">{(movieData.find(item => item.id === movieId)?.likeCount || swiperData.find(item => item.id === movieId))?.title}</Link>
                  <Link to={`/video/${movieId}`} className="text-[1rem] text-white/60 px-2">Official Trailer</Link>
                  <span className="flex items-center text-sm gap-3 px-2 ">

                    <span className=" flex text-sm items-center gap-1 text-white "  >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                        <path d="M13.12 2.06c.58-.59 1.52-.59 2.11-.01.36.36.51.87.41 1.37L14.69 8h5.65c2.15 0 3.6 2.2 2.76 4.18l-3.26 7.61C19.52 20.52 18.8 21 18 21H9c-1.1 0-2-.9-2-2V9.01c0-.53.21-1.04.58-1.41l5.54-5.54zM9.293 8.707A1 1 0 0 0 9 9.414V18a1 1 0 0 0 1 1h7.332a1 1 0 0 0 .924-.617c1.663-4.014 2.527-6.142 2.594-6.383.07-.253.12-.587.15-1v-.002A1 1 0 0 0 20 10h-8l1.34-5.34-4.047 4.047zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z"></path>
                      </svg>
                      {formatNumber(movieData.find(item => item.id === movieId)?.likeCount || swiperData.find(item => item.id === movieId)?.likeCount)}
                    </span>
                    <span className="flex items-center gap-1 text-white p-2" >
                      <span className="relative">
                        <FaHeart className="text-[#f5185ab0]  absolute text-[1.2rem] " />
                        <FaFaceGrinStars className=" text-[#f5c51893] ml-3 mt-1 text-[0.85rem]" />
                      </span>
                      {movieData.find(item => item.id === movieId)?.reactions?.count || swiperData.find(item => item.id === movieId)?.reactions?.count}
                    </span>
                  </span>

                </div>
              )))
              :
              (
                slides.map((movie) => (
                  <div
                    key={movie.id || movie.title}
                    className="w-full flex-shrink-0"
                    style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                  >
                    <Movie movie={movie} />
                  </div>
                ))
              )}


          </div>
        </div>

        {currentSlide > 0 && (
          <button
            onClick={prevSlide}
            className="absolute cursor-pointer hidden group-hover:flex top-1/3 transform -translate-y-1/2 w-12 h-16 border-1 rounded-md left-0.5 border-white shadow-lg bg-[#12121273] items-center justify-center transition-all duration-300 group "
            aria-label="Previous slide"
          >
            <svg className="w-10 h-10 text-white hover:text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <button
          onClick={nextSlide}
          className="absolute flex  cursor-pointer  top-1/3 transform -translate-y-1/2 w-12 h-16 border-1 rounded-md right-0.5 border-white shadow-lg bg-[#12121273] items-center justify-center transition-all duration-300 group "
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
