import { useParams, Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { dataCntxt } from '../context/DataContext.jsx'
import { GrFormNext } from 'react-icons/gr';
import { LuDot } from 'react-icons/lu';
import MoreExplore from '../src/Components/MoreExplore.jsx';
import Loader from '../src/Components/Loader.jsx';
import { FaFaceGrinStars } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa"
import darknight from '../src/assets/videos/darknight.mp4'
import godfather from '../src/assets/videos/godfather.mp4'
import godfather2 from '../src/assets/videos/godfather2.mp4'
import twelveangrymen from '../src/assets/videos/twelveangrymen.mp4'
import lotrreturnking from '../src/assets/videos/lotrreturnking.mp4'
import schindlerslist from '../src/assets/videos/schindlerslist.mp4'
import pulpfiction from '../src/assets/videos/pulpfiction.mp4'
import glenpowellistherunningman from '../src/assets/videos/glenpowellistherunningman.mp4'
import theshawshankredemption from '../src/assets/videos/theshawshankredemption.mp4'
import headsofstatestarstakeourbigbadbuddiesquiz from '../src/assets/videos/headsofstatestarstakeourbigbadbuddiesquiz.mp4';
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

const VideoGallery = () => {
  const { swiperData } = useContext(dataCntxt);
  const { movieData } = useContext(dataCntxt);
  const { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    const initialData = [];
    Object.keys(videoMap).forEach((movieId) => {
      const movieInfo = swiperData?.find((item) => item.id === movieId) || movieData?.find((item) => item.id === movieId);
      if (movieInfo) {
        initialData.push(movieInfo);
      }
    });
    setData(initialData);
  }, [swiperData, movieData]);

  const movie = swiperData?.find((item) => item.id === id) || movieData?.find((item) => item.id === id);
  const posterUrl = movie?.posterUrl;

  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState("ascending");
  const [activeSort, setActiveSort] = useState("Date");
  const [border, setBorder] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  function formatNumber(num) {
    if (num === undefined || typeof num !== 'number') {
      return '';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  }

  function durationToMinutes(duration) {
    const hoursMatch = duration.match(/(\d+)h/);
    const minsMatch = duration.match(/(\d+)m/);

    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const mins = minsMatch ? parseInt(minsMatch[1], 10) : 0;

    return hours * 60 + mins;
  }

  function updateSortedData(sortedData) {
    setData(sortedData);
  }

  function toggleOrdering() {
    setActiveOrder((prev) => {
      const newOrder = prev === "ascending" ? "descending" : "ascending";

      let sortedData = [...data];

      if (activeSort === 'Date') {
        sortedData.sort((a, b) => {
          const yearA = parseInt(a.year, 10);
          const yearB = parseInt(b.year, 10);
          return newOrder === "ascending" ? yearA - yearB : yearB - yearA;
        });
      }
      else if (activeSort === 'Duration') {
        sortedData.sort((a, b) =>
          newOrder === "ascending"
            ? durationToMinutes(a.duration) - durationToMinutes(b.duration)
            : durationToMinutes(b.duration) - durationToMinutes(a.duration)
        );
      }

      updateSortedData(sortedData);

      return newOrder;
    });
  }

  function handleSort(e) {
    const sortType = e.target.value;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    setActiveSort(sortType);

    let sortedData = [...data]; // Create a copy

    if (sortType === 'Date') {
      sortedData.sort((a, b) => {
        const yearA = parseInt(a.year, 10);
        const yearB = parseInt(b.year, 10);
        return activeOrder === "ascending" ? yearA - yearB : yearB - yearA;
      });
    }
    else if (sortType === 'Duration') {
      sortedData.sort((a, b) =>
        activeOrder === "ascending"
          ? durationToMinutes(a.duration) - durationToMinutes(b.duration)
          : durationToMinutes(b.duration) - durationToMinutes(a.duration)
      );
    }

    // Update sorted data
    updateSortedData(sortedData);
  }

  return (
    <div>
      <div class="relative w-full h-[22vh] bg-center  bg-cover bg-no-repeat "
        style={{
          backgroundImage: `url(${posterUrl})`,

        }}>
        <div class="absolute  inset-0 bg">
          <div className='max-w-[1280px] mx-auto px-[0.75rem] flex flex-col justify-around h-full '>
            <div className='flex justify-between items-center'>
              <Link to={`/title/${movie?.id}`} className='flex' >
                <GrFormNext className='rotate-180 text-2xl text-white' />
                <p className=' hover:underline text-white'>Back</p>
              </Link>
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
                <button className='flex gap-1 font-bold border-0 lg:border-l-1 border-white/20 px-2 items-end'>
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="ipc-icon ipc-icon--categories ipc-responsive-button__icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12.036 17.153a4.579 4.579 0 0 1 5.117-5.117c1.97.239 3.604 1.802 3.935 3.758a4.576 4.576 0 0 1-1.042 3.76l.197.19h.556L22.5 21.5a.743.743 0 0 1 0 1.049.743.743 0 0 1-1.049 0l-1.708-1.75v-.556l-.19-.197a4.576 4.576 0 0 1-3.759 1.042c-1.956-.331-3.519-1.964-3.758-3.935zm4.54-3.745a3.163 3.163 0 0 0-3.168 3.168 3.163 3.163 0 0 0 3.168 3.167 3.163 3.163 0 0 0 3.167-3.167 3.163 3.163 0 0 0-3.167-3.168zM8.298 11.972c1.47 0 2.73 1.26 2.73 2.73v3.464c0 1.574-1.26 2.834-2.73 2.834H4.834A2.822 2.822 0 0 1 2 18.166v-3.464c0-1.47 1.26-2.73 2.73-2.73h3.568zm0 1.47H4.834c-.735 0-1.26.525-1.26 1.26v3.464c0 .735.525 1.26 1.26 1.26h3.464c.735 0 1.26-.525 1.26-1.26v-3.464c0-.63-.525-1.26-1.26-1.26zM8.298 2c1.47 0 2.73 1.26 2.73 2.73v3.463c0 1.575-1.26 2.73-2.73 2.73H4.834C3.26 10.923 2 9.768 2 8.193V4.73C2 3.26 3.26 2 4.73 2h3.568zm0 1.47H4.834c-.735 0-1.26.524-1.26 1.26v3.463c0 .735.525 1.26 1.26 1.26h3.464c.735 0 1.26-.525 1.26-1.26V4.73c0-.735-.525-1.26-1.26-1.26zM18.27 2C19.74 2 21 3.26 21 4.73v3.463c0 1.575-1.155 2.73-2.73 2.73h-3.463c-1.47 0-2.73-1.26-2.73-2.73V4.73c0-1.47 1.26-2.729 2.73-2.729h3.464zm0 1.47h-3.463c-.735 0-1.26.524-1.26 1.26v3.463c0 .735.525 1.26 1.26 1.26h3.464c.735 0 1.26-.525 1.26-1.26V4.73c0-.735-.525-1.26-1.26-1.26z"></path></svg>
                  All topics
                </button>
                <button className='border-l-1 border-white/20 pl-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--share" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg>
                </button>
              </div>
            </div>
            <div className='flex justify-start items-end gap-2'>
              <div className="relative  w-20 rounded-lg rounded-tl-none hover:brightness-90 overflow-hidden   border-white/10 ">
                <Link to={`/title/${movie?.id}`}>
                  <img
                    src={movie?.posterUrl}
                    alt={movie?.title}
                    className="w-full h-full object-cover rounded-tr-2xl"
                  />
                </Link>
                <Link to='/registration/sign-in'>
                  <div className="absolute top-0 left-0 ">
                    <svg
                      className="fill-[#1f1f1fb6] stroke-[#444343] stroke-[0.8] absolute top-0 left-0 "
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
              <div className='flex flex-col gap-2'>
                <h3 className='font-bold text-xl text-[#ffffffb3]'>{movie?.title}</h3>
                <h2 className=' text-white text-4xl'>Videos</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='max-w-[1280px] mx-auto px-[0.75rem] py-10 flex lg:flex-row flex-col justify-between'>

          <div className="flex flex-col gap-2 w-full lg:w-2/3">
            <div className="flex items-center justify-end ">
              <p className="pr-2">Sort by  </p>
              <span className={`rounded-lg relative overflow-hidden p-2 items-center flex cursor-pointer text-[#0e63be]  h-[2.25rem] border-dashed  border-1  hover:bg-[#0e63be]/10 outline-none ${border ? 'border-[#0e63be]' : 'border-transparent'} `}>
                <label className="cursor-pointer">{activeSort}</label>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"></path></svg>
                <select onChange={(e) => handleSort(e)}

                  onFocus={() => setBorder(true)}
                  onBlur={() => setBorder(false)}
                  className=" absolute left-2 cursor-pointer h-full opacity-0 w-full">

                  <option value="Date" className="bg-[#eee] text-black " selected>Date</option>
                  <option value="Duration" className="bg-[#eee] text-black " selected>Duration</option>


                </select>
              </span>
              <button onClick={toggleOrdering} className='rounded-full flex items-center justify-center h-12 w-12 cursor-pointer  hover:bg-[#0e63be]/10'>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className={`${activeOrder === 'ascending' ? '' : 'rotate-180'}  fill-[#0e63be]`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 22a.968.968 0 01-.713-.288A.967.967 0 0111 21V5.825L7.1 9.7a.977.977 0 01-.688.288A.93.93 0 015.7 9.7a.948.948 0 01-.275-.7c0-.283.092-.517.275-.7l5.6-5.6c.1-.1.208-.17.325-.212.117-.042.242-.063.375-.063s.258.02.375.063a.877.877 0 01.325.212l5.6 5.6a.933.933 0 01.275.688c0 .275-.092.512-.275.712-.2.2-.438.3-.713.3a.973.973 0 01-.712-.3L13 5.825V21c0 .283-.096.52-.287.712A.968.968 0 0112 22z"></path></svg>
              </button>
            </div>
            {loading ? (
              <Loader />
            ) : (<div className='flex-wrap gap-2 flex w-full'>
              {data.map((movie, index) => (

                <div key={index} className=" rounded-lg flex  py-2 flex-col gap-2 w-[calc(98.35%-0.125rem)] sm:w-[calc(32.35%-0.125rem)] lg:w-[calc(50%-0.25rem)]">
                  <Link to={`/video/${movie.id}`} className='h-full relative group '>
                    <video
                      src={videoMap[movie.id] || ''}
                      className="w-full h-full rounded-[10px] object-cover cursor-pointer"

                    />

                    <span className='absolute bottom-2 left-2 flex items-end justify-between w-full text-white'>
                      <span className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-8' viewBox="0 0 24 24" fill="white" role="presentation">
                          <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                          <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                        </svg>
                        <p>{movie?.trailerDuration}</p>
                      </span>

                    </span>

                  </Link>
                  <Link to={`/video/${movie.id}`} className="text-[1rem] hover:underline">{movie?.title}
                  </Link>
                  <span className="flex items-center text-sm gap-3 ">

                    <span className=" flex text-sm items-center gap-1 text-black/50"  >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                        <path d="M13.12 2.06c.58-.59 1.52-.59 2.11-.01.36.36.51.87.41 1.37L14.69 8h5.65c2.15 0 3.6 2.2 2.76 4.18l-3.26 7.61C19.52 20.52 18.8 21 18 21H9c-1.1 0-2-.9-2-2V9.01c0-.53.21-1.04.58-1.41l5.54-5.54zM9.293 8.707A1 1 0 0 0 9 9.414V18a1 1 0 0 0 1 1h7.332a1 1 0 0 0 .924-.617c1.663-4.014 2.527-6.142 2.594-6.383.07-.253.12-.587.15-1v-.002A1 1 0 0 0 20 10h-8l1.34-5.34-4.047 4.047zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z"></path>
                      </svg>
                      {formatNumber(movie?.likeCount)}
                    </span>
                    <span className="flex items-center gap-1 text-black/50" >
                      <span className="relative">
                        <FaHeart className="text-[#f5185ab0]  absolute text-[1.2rem] " />
                        <FaFaceGrinStars className=" text-[#f5c51893] ml-3 mt-1 text-[0.85rem]" />
                      </span>
                      {movie?.reactions?.count}
                    </span>
                  </span>

                </div>
              ))}
            </div>
            )}
          </div>
          <hr className='w-full h-1 my-10 lg:hidden block bg-black/10 border-none rounded-2xl'/>
          <MoreExplore />

        </div>
      </div>
    </div>
  )
}

export default VideoGallery