import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { dataCntxt } from '../../context/DataContext';

import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { LuDot } from "react-icons/lu";
import { IoMdPhotos } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi"
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
import { Heading3 } from 'lucide-react';
const AboutTrailer = () => {

  const videoMap = {
    'c4f7a95e-0d29-4d2b-85dc-45a77c08b3fb': glenpowellistherunningman,
    "7d2e2e98-b0a3-40b3-9e36-46d2eb4ff502": headsofstatestarstakeourbigbadbuddiesquiz,
    "c4f7a95e-0d29-4d3b-85dc-45a77c08b3fb": glenpowellistherunningman,
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
  const { swiperData } = useContext(dataCntxt);
  const { movieData } = useContext(dataCntxt);
  const { id } = useParams();
  const movie = swiperData?.find((item) => item.id === id) || movieData?.find((item) => item.id === id);
  const posterUrl = movie?.trailerPosterUrl || movie?.posterUrl;
  const videoSrc = videoMap[id];

  return (
    <div className='py-10 flex flex-col gap-2' >
      <div className='flex justify-between items-start '>
        <div className='flex flex-col '>
          <h2 className='text-white text-4xl '> {movie?.title}</h2>
          {movie?.production ?
            (<span className='flex invert-80 items-center text-sm'>
              <p>{movie?.production}</p>
              <LuDot />
              {movie.duration &&
                <p> {movie?.duration}</p>}
            </span>) :
            (movie?.year && <span className='flex invert-80 items-center'>
              <p>{movie?.year}</p>
              <LuDot />
              {movie.duration &&
                <p> {movie?.duration}</p>}
            </span>)
          }
        </div>
        <div className='lg:flex hidden  gap-5'>
          {movie?.rating && <div className='flex flex-col gap-1 items-center'>
            <p className='invert-60 tracking-wider font-bold text-sm'>IMDB RATING</p>
            <span className='flex items-center'>
              <TiStarFullOutline className='text-[#F5C518] text-4xl pr-1' />
              <p className='text-white text-xl font-bold'>{movie?.rating}</p>
              <p className='invert-60'> /10</p>
            </span>
          </div>}
          <div className='flex flex-col gap-1 items-center'>
            <p className='invert-60 tracking-wider font-bold text-sm '>YOUR RATING</p>
            <span className='flex items-end gap-1'>
              <TiStarOutline className='text-[#5799EF] font-bold text-3xl' />
              <p className='text-[#5799EF] font-medium text-xl'>Rate</p>
            </span>

          </div>
          <div className='flex flex-col gap-1 items-center'>
            <p className='invert-60 tracking-wider font-bold text-sm uppercase'>Popularity</p>
            <span className='flex items-center gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" className='fill-green-600' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-2.6 0-5-1.3-6.4-3.3l2.8-3.4 1.3 1.5c.4.4 1 .4 1.3 0l2.9-3.2 1.3 1.4c.3.3.8.1.8-.3V8.5c0-.3-.2-.5-.5-.5h-4c-.4 0-.6.5-.3.8l1.3 1.4-2.2 2.5L9 11.3c-.4-.4-1-.4-1.3 0L4.6 15c-.4-.9-.6-1.9-.6-3 0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"></path></svg>
              <p className=' text-white text-sm'>no data</p>
            </span>

          </div>
        </div>
      </div>
      <div className='flex relative justify-between gap-1 lg:flex-row flex-wrap lg:h-[calc(45vh-3rem)] xl:h-[calc(50vh-3rem)]'>
        {
          movie &&
          <div className=" absolute  w-[95px] sm:relative sm:w-[calc(27.65%-0.125rem)] lg:w-[calc(22.75%-0.125rem)] sm:h-full flex-shrink-0 overflow-hidden border-white/10">
            <Link to={`/title/${movie.id}`} >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="rounded-xl w-full h-full object-cover rounded-t-l-0 rounded-tr-[10px]"
              />
            </Link>
            <Link to='/registration/sign-in'>
              <div className="absolute top-0 left-0">
                <svg
                  className="fill-[#1f1f1fb6] stroke-[#444343] stroke-[0.8] absolute top-0 left-0"
                  width="48px" height="68px" viewBox="0 0 32 45.3"
                >
                  <polygon points="24 0 0 0 0 32 12.24 26.29 24 31.77" />
                </svg>
                <svg
                  className="fill-white absolute left-1 z-60 top-1"
                  width="24"
                  height="28"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                </svg>
              </div>
            </Link>
          </div>
        }

        {/* Video container - takes most of the remaining space */}
        <div className='h-full sm:w-[calc(72.35%-0.125rem)] lg:w-[calc(60%-0.25rem)]'>
          <video
            src={videoSrc}
            poster={posterUrl}
            muted
            loop
            playsInline
            className="w-full h-full sm:rounded-[10px] object-cover cursor-pointer"
            onMouseEnter={(e) => e.currentTarget.play()}
          />
        </div>

        {/* Stats container - narrow sidebar like IMDb */}
        <div className='flex flex-row h-4 pt-4 lg:pt-0 w-full lg:h-full lg:flex-col lg:w-[calc(17.25%-0.25rem)] justify-between items-center gap-1'>
          <div className="bg-[#4d46435b] lg:h-[calc(50%-0.125rem)] w-[calc(50%-0.125rem)] py-2 rounded-4xl text-white flex lg:flex-col gap-2 items-center justify-center lg:rounded-xl lg:w-full flex-1 px-2">
            <BiSolidVideos className='text-md lg:text-2xl xl:text-4xl' />
            <p className="text-white tracking-wider  font-medium text-sm lg:pt-1">{movie?.videoCount} videos</p>
          </div>
          <div className='bg-[#4d46435b] py-2 w-[calc(50%-0.125rem)] lg:h-[calc(50%-0.125rem)] text-white flex lg:flex-col gap-2 items-center justify-center rounded-4xl lg:rounded-xl lg:w-full flex-1 px-2'>
            <IoMdPhotos className='text-md lg:text-2xl xl:text-4xl' />
            <p className="text-white tracking-wider font-medium text-sm lg:pt-1">{movie?.photoCount} photos</p>
          </div>
        </div>
      </div>
      <div>
        {movie?.genre && (
          <p className="invert-40 text-sm mb-2 font-medium"  >
            {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
          </p>
        )}
         
      </div>
    </div>
  )
}

export default AboutTrailer