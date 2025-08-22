import { dataCntxt } from "../../context/DataContext";
import { useContext } from "react";
import { Link, useParams } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
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

import { PiLineVerticalBold } from "react-icons/pi";
export function Gallery() {

  const { movieData, swiperData } = useContext(dataCntxt)
  const combinedData = [...(movieData || []), ...(swiperData || [])]
  const data = combinedData.filter((item, index, self) =>
    index === self.findIndex(movie => movie.id === item.id)
  )
  const { id } = useParams()
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

  return (
    <div className="flex-col flex gap-10 py-10">
      <div className="flex flex-col gap-5">
        <Link to={`/title/${id}/albumswiper/${data[0]?.id}`}>
          <div className='group flex  items-center relative '>
            {/* [#F5C518] */}
            <PiLineVerticalBold className='text-[#F5C518] text-[2rem] font-extrabold absolute -left-3' />

            <h1 className=' text-2xl font-bold flex items-center px-3 '>
              All photos </h1>
            <p className="text-sm">  {data?.length}</p>

            <IoIosArrowForward className='text-3xl font-bold group-hover:text-[#F5C518]' />
          </div>
        </Link>
        <div className="flex flex-wrap gap-2">

          {data?.slice(0, 6).map((movie, index) => (
            <div key={index} className=" xl:w-[calc(17%-1rem)] md:w-[calc(20%-1rem)] sm:w-[calc(32%)] w-9/20 overflow-hidden rounded-lg">
              <Link to={`/title/${id}/albumswiper/${movie?.id}`}>
                <img
                  className=" w-full rounded-lg object-cover object-center"
                  src={movie?.posterUrl}
                  alt={movie?.title || "gallery-photo"}
                />
              </Link>
            </div>
          ))}
          <Link to={`/title/${id}/albumswiper/${data[6]?.id}`} className="bg-black/40 cursor-pointer hover:bg-black/50 text-white rounded-lg px-10 py-20">+23 more</Link>


        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Link to={`/title/${id}/videogallery`}>
          <div className='group flex  items-center relative '>
            {/* [#F5C518] */}
            <PiLineVerticalBold className='text-[#F5C518] text-[2rem] font-extrabold absolute -left-3' />

            <h1 className=' text-2xl font-bold flex items-center px-3 '>
              All videos </h1>
            <p className="text-sm">  {Object.entries(videoMap).length - 2}</p>

            <IoIosArrowForward className='text-3xl font-bold group-hover:text-[#F5C518]' />
          </div>
        </Link>
        <div className="flex flex-wrap gap-2 w-full">

          {Object.entries(videoMap).slice(2, 6).map(([movieId, videoSrc], index) => (

            <div key={index} className=" rounded-lg flex flex-col gap-2 w-[calc(98.35%-0.125rem)] sm:w-[calc(32.35%-0.125rem)] lg:w-[calc(24%-0.25rem)]">
              <Link to={`/video/${movieId}`} className='h-full relative group '>
                <video
                  src={videoSrc} // Use the videoMap to get the correct video source

                  slot='media'
                  muted
                  playsInline
                  className="w-full h-full 
        rounded-[10px] object-cover cursor-pointer"

                />

                <span className='absolute bottom-2 left-2 flex items-end justify-between w-full text-white'>
                  <span className='flex items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-8' viewBox="0 0 24 24" fill="white" role="presentation">
                      <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                      <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                    </svg>
                    <h4 >Trailer</h4>
                    <p>{data.find(item => item.id === movieId)?.trailerDuration}</p>
                  </span>

                </span>

              </Link>
              <Link to={`/video/${movieId}`} className="text-[1rem] group-hover:underline">Official Trailer</Link>
              <span className="flex items-center text-sm gap-3 ">

                <span className=" flex text-sm items-center gap-1 text-black/50"  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                    <path d="M13.12 2.06c.58-.59 1.52-.59 2.11-.01.36.36.51.87.41 1.37L14.69 8h5.65c2.15 0 3.6 2.2 2.76 4.18l-3.26 7.61C19.52 20.52 18.8 21 18 21H9c-1.1 0-2-.9-2-2V9.01c0-.53.21-1.04.58-1.41l5.54-5.54zM9.293 8.707A1 1 0 0 0 9 9.414V18a1 1 0 0 0 1 1h7.332a1 1 0 0 0 .924-.617c1.663-4.014 2.527-6.142 2.594-6.383.07-.253.12-.587.15-1v-.002A1 1 0 0 0 20 10h-8l1.34-5.34-4.047 4.047zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z"></path>
                  </svg>
                  {formatNumber(data.find(item => item.id === movieId)?.likeCount)}
                </span>
                <span className="flex items-center gap-1 text-black/50" >
                  <span className="relative">
                    <FaHeart className="text-[#f5185ab0]  absolute text-[1.2rem] " />
                    <FaFaceGrinStars className=" text-[#f5c51893] ml-3 mt-1 text-[0.85rem]" />
                  </span>
                  {data.find(item => item.id === movieId)?.reactions?.count}
                </span>
              </span>

            </div>
          ))}
          <Link to={`/title/${id}/videogallery`} className="bg-black/40 cursor-pointer hover:bg-black/50 flex items-center justify-center text-white rounded-lg w-full sm:w-100 h-40 ">+6 more</Link>


        </div>

      </div>
    </div>
  );
}
