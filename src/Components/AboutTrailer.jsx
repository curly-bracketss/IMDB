import React from 'react'

import { useContext, useState, useEffect, useRef } from 'react'
import { dataCntxt } from '../../context/DataContext';
import { GrFormNext } from "react-icons/gr";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { LuDot } from "react-icons/lu";
import { IoMdPhotos } from "react-icons/io";
import { useNavigate, Link, useParams } from "react-router-dom"
import { updateWatchList } from "../../service/AuthService"
import { BiSolidVideos } from "react-icons/bi"
import RoundedLoader from './CircularBubblesLoader'
import imdbpro from '../assets/icons/imdbpro.svg'
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
import { FaFaceGrinStars } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import Post from './Post';
import Rate from './Rate';
import Watched from './Watched';
import RatePopUp from './RatePopUp';

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
  const { swiperData, movieData } = useContext(dataCntxt);
  const { id } = useParams();
  const movie = swiperData?.find((item) => item.id === id) || movieData?.find((item) => item.id === id);
  const posterUrl = movie?.trailerPosterUrl || movie?.posterUrl;
  const videoSrc = videoMap[id];
  const boxRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [openRate, setOpen] = useState(false)
  const videoRef = useRef(null);
  const checkScroll = () => {
    const el = boxRef.current;
    if (!el) return;

    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    setShowPrev(!atStart);
    setShowNext(!atEnd && el.scrollWidth > el.clientWidth);
  };

  useEffect(() => {
    checkScroll();
    const el = boxRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [movie]);

  const scrollByAmount = (amount) => {
    boxRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };
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

  const [watchList, setFav] = useState([]);


  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem('watchList')) || [];
    setFav(fav);
  }, []);


  const [watchlist, setWatchList] = useState(false)
  const [userExist, setUserExist] = useState(false)
  const { currentUser, setCurrentUser } = useContext(dataCntxt)
  const [loading, setLoading] = useState(false)
  const rated = currentUser?.rateHistory?.find((item) => item.movieId === movie?.id);
  const navigate = useNavigate()
  useEffect(() => {
    if (!movie) return;
    if (localStorage.getItem('user') && currentUser) {
      setUserExist(true);
      setWatchList(currentUser.watchList.some(m => m.id === movie.id));
    } else {
      setUserExist(false);
    }
  }, [movie, currentUser]);

  async function handleWatchList(userId, movie) {
    if (!userExist) {
      navigate('/registration/signin');
      return;
    }

    setLoading(true);

    let newWatchList;
    if (watchlist) {
      newWatchList = currentUser.watchList.filter(m => m.id !== movie.id);
    } else {
      newWatchList = [...currentUser.watchList, movie];
    }

    try {
      // Update in backend
      const updatedUser = await updateWatchList(userId, newWatchList);
      console.log("Watchlist updated:", updatedUser.watchList);

      // Update context
      setWatchList(prev => !prev);
      setCurrentUser(prev => ({
        ...prev,
        watchList: updatedUser.watchList
      }));

    } catch (err) {
      console.error("Failed to update watchlist:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='py-5 bg-center bg-cover flex flex-col gap-5'>
      <div className='flex text-white justify-end items-center gap-1 text-[0.925rem]'>
        <p className='lg:block hidden font-bold'>
          Cast & crew</p>
        <LuDot
          className='lg:block hidden font-bold' />
        <p className='lg:block hidden font-bold'>

          User reviews</p>
        <LuDot
          className='lg:block hidden font-bold' />
        <p className='lg:block hidden font-bold'>

          Trivia
        </p>
        <LuDot
          className='lg:block hidden font-bold' />
        <p className='lg:block hidden font-bold pr-2'>

          FAQ
        </p>
        <p className='border-l-1 lg:block hidden font-bold border-white/20 px-2'>IMDbPro</p>
        <button className='flex gap-1 border-0 lg:border-l-1 border-white/20 px-2 items-end'>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="ipc-icon ipc-icon--categories ipc-responsive-button__icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12.036 17.153a4.579 4.579 0 0 1 5.117-5.117c1.97.239 3.604 1.802 3.935 3.758a4.576 4.576 0 0 1-1.042 3.76l.197.19h.556L22.5 21.5a.743.743 0 0 1 0 1.049.743.743 0 0 1-1.049 0l-1.708-1.75v-.556l-.19-.197a4.576 4.576 0 0 1-3.759 1.042c-1.956-.331-3.519-1.964-3.758-3.935zm4.54-3.745a3.163 3.163 0 0 0-3.168 3.168 3.163 3.163 0 0 0 3.168 3.167 3.163 3.163 0 0 0 3.167-3.167 3.163 3.163 0 0 0-3.167-3.168zM8.298 11.972c1.47 0 2.73 1.26 2.73 2.73v3.464c0 1.574-1.26 2.834-2.73 2.834H4.834A2.822 2.822 0 0 1 2 18.166v-3.464c0-1.47 1.26-2.73 2.73-2.73h3.568zm0 1.47H4.834c-.735 0-1.26.525-1.26 1.26v3.464c0 .735.525 1.26 1.26 1.26h3.464c.735 0 1.26-.525 1.26-1.26v-3.464c0-.63-.525-1.26-1.26-1.26zM8.298 2c1.47 0 2.73 1.26 2.73 2.73v3.463c0 1.575-1.26 2.73-2.73 2.73H4.834C3.26 10.923 2 9.768 2 8.193V4.73C2 3.26 3.26 2 4.73 2h3.568zm0 1.47H4.834c-.735 0-1.26.524-1.26 1.26v3.463c0 .735.525 1.26 1.26 1.26h3.464c.735 0 1.26-.525 1.26-1.26V4.73c0-.735-.525-1.26-1.26-1.26zM18.27 2C19.74 2 21 3.26 21 4.73v3.463c0 1.575-1.155 2.73-2.73 2.73h-3.463c-1.47 0-2.73-1.26-2.73-2.73V4.73c0-1.47 1.26-2.729 2.73-2.729h3.464zm0 1.47h-3.463c-.735 0-1.26.524-1.26 1.26v3.463c0 .735.525 1.26 1.26 1.26h3.464c.735 0 1.26-.525 1.26-1.26V4.73c0-.735-.525-1.26-1.26-1.26z"></path></svg>
          All topics
        </button>
        <button className='border-l-1 border-white/20 pl-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--share" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg>
        </button>
      </div>
      <div className='flex justify-between items-start '>
        <div className='flex flex-col '>
          <h2 className='text-white text-4xl '> {movie?.title}</h2>
          {movie?.production ?
            (<span className='flex invert-80 items-center text-sm'>
              <p>{movie?.production}</p>

              {movie.duration &&
                <p className='flex items-center'> <LuDot />{movie?.duration}</p>}
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
          {movie?.rating && <div className='flex flex-col gap-1 items-center '>
            <p className='invert-60 tracking-wider font-bold text-sm'>IMDB RATING</p>
            <span className='flex items-center  hover:bg-white/20 rounded-4xl px-1'>
              <TiStarFullOutline className='text-[#F5C518] text-4xl pr-1' />
              <p className='text-white text-xl font-bold'>{movie?.rating}</p>
              <p className='invert-60'> /10</p>
            </span>
          </div>}
          <div className='flex flex-col gap-1 items-center '>
            <p className='invert-60 tracking-wider font-bold text-sm '>YOUR RATING</p>
            <div className=' flex items-center hover:bg-white/10 cursor-pointer rounded-full'>{rated ? <span><span onClick={() => setOpen(true)} className='flex items-center  hover:bg-white/20 rounded-4xl px-1'>
              <svg className='fill-[#5799ef] mx-2' width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
              <p className='text-white text-xl font-bold'>{rated?.rating}</p>
              <p className='invert-60'> /10</p>
            </span>
              {openRate && <RatePopUp
                movie={movie}
                onClose={() => setOpen(false)}
              />}
            </span> : <div className='font-bold text-2xl  hover:bg-white/10  text-[#5799ef] fill-[#5799ef] cursor-pointer rounded-full'><Rate movie={movie} /></div>}</div>
 
          </div>
          <div className='flex flex-col gap-1 items-center'>
            <p className='invert-60 tracking-wider font-bold text-sm uppercase'>Popularity</p>
            <span className='flex items-center gap-1 font-bold hover:bg-white/20 rounded-4xl px-1'>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" className='fill-green-600' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-2.6 0-5-1.3-6.4-3.3l2.8-3.4 1.3 1.5c.4.4 1 .4 1.3 0l2.9-3.2 1.3 1.4c.3.3.8.1.8-.3V8.5c0-.3-.2-.5-.5-.5h-4c-.4 0-.6.5-.3.8l1.3 1.4-2.2 2.5L9 11.3c-.4-.4-1-.4-1.3 0L4.6 15c-.4-.9-.6-1.9-.6-3 0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"></path></svg>
              <p className=' text-white text-sm'>no data</p>
            </span>

          </div>
        </div>
      </div>
      {videoSrc && <div className='flex relative justify-between gap-1 lg:flex-row flex-wrap lg:h-[calc(45vh-3rem)] xl:h-[calc(50vh-3rem)]'>
        {
          movie &&
          <div className="absolute -bottom-55 sm:bottom-0 w-[120px] sm:relative sm:w-[calc(27.65%-0.125rem)] lg:w-[calc(26%-0.125rem)] xl:w-[calc(23.75%-0.125rem)] sm:h-full flex-shrink-0 overflow-hidden border-white/10">
            <Post movie={movie} />
          </div>
        }

        {/* Video container - takes most of the remaining space */}
        <Link to={`/video/${movie?.id}`} className='h-full relative sm:w-[calc(72.35%-0.125rem)] lg:w-[calc(59%-0.25rem)]'>
          <video
            src={videoSrc}
            poster={posterUrl}
            ref={videoRef}
            slot='media'
            muted
            playsInline
            className="w-full h-full 
            sm:rounded-[10px] object-cover cursor-pointer"
            onMouseEnter={(e) => e.currentTarget.play()}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className='w-12 sm:w-14  block  absolute top-1/3 left-1/2 lg:hidden' viewBox="0 0 24 24" fill="white" role="presentation"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg>

          <span className=
            ' absolute bottom-4 left-4 flex items-end justify-between w-full text-white'>
            <span className='flex items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" className='w-14 lg:w-18 lg:block hidden ' viewBox="0 0 24 24" fill="white" role="presentation"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg>
              <h4 className='lg:text-2xl'>Play Trailer</h4>
              <p>{movie?.trailerDuration}</p>
            </span>
            <span className="flex items-center text-[#FFFFFFB3] gap-3 ">
              <span className=" flex text-sm items-center gap-1" onClick={() => handleLike()} >

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M13.12 2.06c.58-.59 1.52-.59 2.11-.01.36.36.51.87.41 1.37L14.69 8h5.65c2.15 0 3.6 2.2 2.76 4.18l-3.26 7.61C19.52 20.52 18.8 21 18 21H9c-1.1 0-2-.9-2-2V9.01c0-.53.21-1.04.58-1.41l5.54-5.54zM9.293 8.707A1 1 0 0 0 9 9.414V18a1 1 0 0 0 1 1h7.332a1 1 0 0 0 .924-.617c1.663-4.014 2.527-6.142 2.594-6.383.07-.253.12-.587.15-1v-.002A1 1 0 0 0 20 10h-8l1.34-5.34-4.047 4.047zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z"></path></svg>

                {formatNumber(movie?.likeCount)}

              </span>
              <span className="flex items-center gap-1 pr-8" >
                <span className="relative">
                  <FaHeart className="text-[#f5185ad3]  absolute text-[1.2rem] " />
                  <FaFaceGrinStars className=" text-[#f5c518] ml-3 mt-1 text-[0.85rem]" />
                </span>
                {movie?.reactions?.count}
              </span>

            </span>
          </span>
        </Link>

        {/* Stats container - narrow sidebar like IMDb */}
        <div className='flex flex-row h-4 pt-4 lg:pt-0 w-full lg:h-full lg:flex-col lg:w-[calc(15%-0.125rem)] xl:w-[calc(17.25%-0.25rem)] justify-between items-center gap-1'>
          <Link to={`/title/${movie?.id}/videogallery`} className="bg-[#4d46435b] cursor-pointer hover:bg-white/10 lg:h-[calc(50%-0.125rem)] w-[calc(50%-0.125rem)] py-2 rounded-4xl text-white flex lg:flex-col gap-2 items-center justify-center lg:rounded-xl lg:w-full flex-1 px-2">
            <BiSolidVideos className='text-md lg:text-2xl xl:text-4xl' />
            <p className="text-white tracking-wider  font-medium text-sm lg:pt-1">{movie?.videoCount} videos</p>
          </Link>
          <Link to={`/title/${movie?.id}/albumswiper/${movie?.id}`} className='bg-[#4d46435b] cursor-pointer hover:bg-white/10 py-2 w-[calc(50%-0.125rem)] lg:h-[calc(50%-0.125rem)] text-white flex lg:flex-col gap-2 items-center justify-center rounded-4xl lg:rounded-xl lg:w-full flex-1 px-2'>
            <IoMdPhotos className='text-md lg:text-2xl xl:text-4xl' />
            <p className="text-white tracking-wider font-medium text-sm lg:pt-1">{movie?.photoCount} photos</p>
          </Link>
        </div>
      </div>}
      <div className='flex  gap-5 flex-col lg:flex-row items-center'>
        {
          !videoSrc && movie &&
          <div className="lg:relative absolute left-5 lg:left-0 w-[120px] lg:w-[240px] flex-shrink-0 overflow-hidden border-white/10">
            <Post movie={movie} />
          </div>
        }
        <div className='flex justify-between lg:flex-row flex-col  w-full lg:items-center'>
          <div className='w-full lg:max-w-2/3 flex flex-col gap-5 pt-5 lg:pt-0'>
            <div className={`flex w-full flex-col  gap-5 relative    pl-[136px] min-h-[185.6px] ${videoSrc && 'sm:pl-0 sm:min-h-0'} ${!videoSrc && movie && 'lg:pl-0 lg:min-h-0'}`}>
              <div className='flex w-full relative  items-center '>
                {showPrev && <button onClick={() => scrollByAmount(-100)} className='font-bold text-3xl  rotate-180 border-l-1 border-[#fff3] hover:text-[#f5c518] py-2 cursor-pointer text-white'><GrFormNext /></button>}
                <div ref={boxRef} className='flex  gap-2 overflow-scroll scrollbar-hide w-full transition-colors ease-in-out duration-200'>
                  {movie?.genre && movie.genre?.map((genre) => (
                    <span key={genre} className='text-white min-w-fit line-clamp-1 cursor-pointer  hover:bg-white/10  border-1 text-[0.875rem] tracking-wider border-[#444343] px-2 py-1 rounded-4xl '>
                      {genre}
                    </span>
                  ))}

                </div>
                {showNext && <button onClick={() => scrollByAmount(100)} className='font-bold text-3xl   border-l-1 border-[#fff3] hover:text-[#f5c518] py-2 cursor-pointer text-white'><GrFormNext /></button>}
              </div>
              <h3 className='text-white tracking-tighter sm:tracking-wide line-clamp-5'>{movie?.preDescription || movie?.description}</h3>
            </div>
            <div className='flex lg:hidden  gap-5 items-center'>
              {movie?.rating && <div className='flex  hover:bg-white/10 rounded-full cursor-pointer p-1  flex-col gap-1 items-center '>
                <span className='flex items-center'>
                  <TiStarFullOutline className='text-[#F5C518] text-2xl pr-1' />
                  <p className='text-white  font-bold'>{movie?.rating}</p>
                  <p className='invert-60'> /10</p>
                </span>
              </div>}
              <div className='flex flex-col gap-1 items-center'>
                <div className=' flex items-center hover:bg-white/10 cursor-pointer rounded-full'>{rated ? <span> <span onClick={() => setOpen(true)} className='flex items-center  hover:bg-white/20 rounded-4xl p-1'>
                  <svg className='fill-[#5799ef] mx-2' width="18" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>

                  <p className='text-white  font-bold'>{rated?.rating}</p>
                  <p className='invert-60'> /10</p>
                </span>
                  {openRate && <RatePopUp
                    movie={movie}
                    onClose={() => setOpen(false)}
                  />}
                </span> : <div className='font-bold text-xl text-[#5799ef] fill-[#5799ef] hover:bg-white/10  cursor-pointer rounded-full'><Rate movie={movie} /></div>}</div>

              </div>
              <div className='flex flex-col gap-1 items-center'>
                <span className='flex items-center gap-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='fill-green-600' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-2.6 0-5-1.3-6.4-3.3l2.8-3.4 1.3 1.5c.4.4 1 .4 1.3 0l2.9-3.2 1.3 1.4c.3.3.8.1.8-.3V8.5c0-.3-.2-.5-.5-.5h-4c-.4 0-.6.5-.3.8l1.3 1.4-2.2 2.5L9 11.3c-.4-.4-1-.4-1.3 0L4.6 15c-.4-.9-.6-1.9-.6-3 0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"></path></svg>
                  <p className=' text-white  font-bold'>76</p>
                </span>

              </div>
            </div>
            <div>{movie?.director && <div className='flex items-center border-t-1 border-[#fff3] py-4 w-full gap-5 '>
              <h3 className='text-white font-bold'>Director</h3>
              <p className='text-[#5799ef] hover:underline'>{movie.director}</p>
            </div>}
              {movie?.writers && <div className='flex items-center border-t-1 border-[#fff3] py-4 w-full gap-5 '>
                <h3 className='text-white font-bold'>Writers</h3>
                <div className='flex'>{


                  <p className="text-[#5799ef] ">
                    {Array.isArray(movie.writers)
                      ? movie.writers.map((writer, i) => (
                        <span key={writer} className='hover:underline'>
                          {writer}
                          {i < movie.writers.length - 1 && <LuDot className="inline text-white" />}
                        </span>
                      ))
                      : movie.writers}
                  </p>

                }
                </div>
              </div>}
              {movie?.actors && <div className='flex border-t-1 items-center border-[#fff3] py-4 w-full gap-5 '>
                <h3 className='text-white font-bold'>Actors</h3>
                <div className='flex'>{


                  <p className="text-[#5799ef] ">
                    {Array.isArray(movie.actors)
                      ? movie.actors.map((actor, i) => (
                        <span key={actor} className='hover:underline'>
                          {actor}
                          {i < movie.actors.length - 1 && <LuDot className="inline text-white" />}
                        </span>
                      ))
                      : movie.actors}
                  </p>

                }
                </div>
              </div>}
              {movie?.stars && <div className='flex border-t-1 items-center border-[#fff3] py-4 w-full gap-5 '>
                <h3 className='text-white font-bold'>Stars</h3>
                <div className='flex'>{


                  <p className="text-[#5799ef] ">
                    {Array.isArray(movie.stars)
                      ? movie.stars.map((star, i) => (
                        <span key={star} className='hover:underline'>
                          {star}
                          {i < movie.stars.length - 1 && <LuDot className="inline text-white" />}
                        </span>
                      ))
                      : movie.stars}
                  </p>

                }
                </div>
              </div>}
              {<div className=' hidden lg:flex border-t-1 items-center border-[#fff3] py-2 w-full gap-5 '>
                <img src={imdbpro} className='fill-white' />
                <p className="text-[#5799ef] font-bold flex items-center gap-1">See production info at IMDbPro
                  <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                    <path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path>
                  </svg>
                </p>
              </div>}
            </div>

          </div>
          <div className='  border-t-1 border-[#fff3] py-4 lg:border-0 lg:py-0 lg:w-[calc(33.33%-3rem)] flex flex-col gap-2'>
            <button className='bg-[#f5c518] cursor-pointer rounded-4xl pr-2 pl-3 flex justify-between items-center max-w-100 lg:w-full' onClick={() => handleWatchList(currentUser?.id, movie)}>
              <span className='flex gap-2'>
                {watchlist ?
                  (loading ? <div ><RoundedLoader /></div> : <svg xmlns="http://www.w3.org/2000/svg" width="24" className="fill-black "
                    height="28"
                    viewBox="0 0 20 20" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.2l-3.5-3.5a.984.984 0 0 0-1.4 0 .984.984 0 0 0 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 0 0 0-1.4.984.984 0 0 0-1.4 0L9 16.2z"></path></svg>)
                  : (loading ? <div ><RoundedLoader /></div> : <svg
                    className="fill-black"
                    width="24"
                    height="28"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                  </svg>)}

                <span className='flex flex-col  items-start text-[0.875rem]'>
                  <p className='font-bold'>
                    Add to Watchlist

                  </p>
                  <p>
                    Added by {movie?.countWishlist && formatNumber(movie?.countWishlist)} users
                  </p>
                </span>
              </span>
              <p className='border-l-1 px-2 py-4 border-gray-900'> <GrFormNext className='rotate-90 text-2xl ' /></p>
            </button>
            <div className=' max-w-100 lg:w-full text-[#5799ef] fill-[#5799ef] font-bold'><Watched movie={movie} /></div>

          </div>
          <div className='flex border-t-1 items-center border-[#fff3] py-2 w-full gap-5 lg:hidden'>
            <p className="text-[#5799ef] font-bold flex items-center gap-1">See production info at IMDbPro
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                <path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path>
              </svg>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AboutTrailer