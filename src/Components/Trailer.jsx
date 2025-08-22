import { useParams, useNavigate, Link } from 'react-router-dom';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { dataCntxt } from '../../context/DataContext';
import maximize from '../assets/icons/maximize.svg'
import minimize from '../assets/icons/minimize.svg'

import play from '../assets/icons/play.svg'
import pause from '../assets/icons/pause.svg'
import volumeMax from '../assets/icons/volumeMax.svg'
import volumeMin from '../assets/icons/volumeMin.svg'
import rewind from '../assets/icons/rewind.svg'
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
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { X } from 'lucide-react';

import Post from './Post';
import Loader from './Loader';
import ReactionBar from './ReactionBar';

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

export default function Trailer() {
  const { swiperData, movieData } = useContext(dataCntxt);
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = swiperData?.find((item) => item.id === id) || movieData?.find((item) => item.id === id);
  const posterUrl = movie?.trailerPosterUrl || movie?.posterUrl;
  const videoSrc = videoMap[id];

  const [isPlaying, setIsPlaying] = useState(false);
  const [more, showMore] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  const videoRef = useRef(null);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
 
  const controlsTimeoutRef = useRef(null);

  // Auto-play when video is ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const tryAutoPlay = async () => {
      try {
        setIsLoading(true);
        // Preload the video
        video.load();
        await video.play();
        setHasStartedPlaying(true);
      } catch (error) {
        console.log('Autoplay prevented by browser:', error);
        setIsLoading(false);
      }
    };

    // Small delay to ensure video element is properly mounted
    const timer = setTimeout(tryAutoPlay, 100);
    return () => clearTimeout(timer);
  }, [videoSrc]);

  // Click outside to close reactions


  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    const handleLoadStart = () => setIsLoading(true);

    const handleCanPlay = () => {
      setIsLoading(false);
      // Auto-play when ready if not already started
      if (!hasStartedPlaying && !isPlaying) {
        video.play().catch(console.error);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setHasStartedPlaying(true);
    };

    const handlePause = () => setIsPlaying(false);

    const handleError = (e) => {
      console.error('Video error:', e);
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    video.addEventListener('timeupdate', updateTime);

    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, [hasStartedPlaying, isPlaying]);

  // Controls auto-hide
  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setShowControls(true);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const handleMouseMove = () => resetControlsTimeout();

    if (isPlaying) {
      document.addEventListener('mousemove', handleMouseMove);
      resetControlsTimeout();
    } else {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (isPlaying) {
        await video.pause();
      } else {
        await video.play();
        setHasStartedPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling video:', error);
    }
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 10);
    }
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * duration;
  };

  const formatTime = (time) => {
    if (!time || !isFinite(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
useEffect(() => {
  if (videoRef.current) {
    videoRef.current.volume = volume;
    setIsMuted(volume === 0);
  }
}, [volume]);
  // Fixed volume toggle function
 const toggleMute = () => {
  const video = videoRef.current;
  if (!video) return;

  if (isMuted) {
    // Unmute: restore previous volume
    video.volume = volume; // make sure volume state has the correct value
    setIsMuted(false);
  } else {
    // Mute: save current volume in state and set volume to 0
    setVolume(video.volume); // store current volume
    video.volume = 0;
    setIsMuted(true);
  }
};
  const handleVolumeChange = (e) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const sliderHeight = rect.height;
    const percentage = 1 - (y / sliderHeight);
    const newVolume = Math.max(0, Math.min(1, percentage));

    setVolume(newVolume);
    setIsMuted(newVolume === 0);

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };


  const handleMouseDown = (e) => {
    handleVolumeChange(e);

    const handleMouseMove = (moveEvent) => {
      handleVolumeChange(moveEvent);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };



  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };



 

  return (
    <div className="flex items-center justify-center w-full">
      <div className={`w-full h-3/5 flex lg:flex-row flex-col gap-5 -px-2 justify-between ${isFullscreen ? 'bg-black' : 'bg-[#121212]'}`}>

        {/* Video Section */}
        <div className={`h-full ${isFullscreen ? 'w-full' : 'lg:w-8/10 w-full xl:w-full'} bg-black flex flex-col justify-center relative`}>

          {/* Header - Hidden in fullscreen */}
          {!isFullscreen && (
            <div className="flex items-center justify-between w-full p-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 cursor-pointer text-white hover:text-gray-300 transition-colors"
              >
                <X size={22} />
                <span className="text-md font-medium">Close</span>
              </button>
              <button className="text-white hover:text-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ipc-icon ipc-icon--share" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg>
              </button>
            </div>
          )}

          <div ref={containerRef} className={isFullscreen ? 'fixed inset-0 bg-black' : 'relative'}>
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                <Loader />
              </div>
            )}

            {videoSrc ? (
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                onClick={togglePlay}
                poster={posterUrl}
                preload="auto"
                muted={isMuted}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Loader />
              </div>
            )}

            {/* Center Play Controls */}
            {videoSrc && !isLoading && (
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`} onClick={togglePlay}>
                <div className="flex items-center gap-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      skipBackward();
                    }}
                    className="w-10 h-10 sm:w-20 sm:h-20 md:w-26 md:h-26 text-white transition-all duration-300 opacity-[0.8] hover:opacity-100 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#ffffffb3] rotate-180" viewBox="0 0 240 240">
                      <path d="M165,60v53.3L59.2,42.8C56.9,41.3,55,42.3,55,45v150c0,2.7,1.9,3.8,4.2,2.2L165,126.6v53.3h20v-120L165,60L165,60z"></path>
                    </svg>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="w-10 h-10 sm:w-20 sm:h-20 md:w-26 md:h-26 text-white transition-all duration-300 opacity-[0.8] hover:opacity-100 cursor-pointer"
                  >
                    {isPlaying ? (
                      <img src={pause} className="invert-80" alt="pause" />
                    ) : (
                      <img src={play} className="invert-80" alt="play" />
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      skipForward();
                    }}
                    className="w-10 h-10 sm:w-20 sm:h-20 md:w-26 md:h-26 text-white transition-all duration-300 opacity-[0.8] hover:opacity-100 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#ffffffb3]" viewBox="0 0 240 240">
                      <path d="M165,60v53.3L59.2,42.8C56.9,41.3,55,42.3,55,45v150c0,2.7,1.9,3.8,4.2,2.2L165,126.6v53.3h20v-120L165,60L165,60z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            {!isLoading && (
              <div className={`absolute bottom-0 left-0 right-0 p-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                {/* Progress Bar */}
                <div
                  className="w-full h-1 bg-[#ffffffb3] opacity-[0.8] rounded-full mb-4 cursor-pointer hover:opacity-100 transition-all"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>

                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center space-x-4 relative">
                    <button
                      onClick={togglePlay}
                      className="w-6 h-6 transition-all duration-300 opacity-[0.8] hover:opacity-100 cursor-pointer"
                    >
                      {isPlaying ? (
                        <img src={pause} className="invert-80" alt="pause" />
                      ) : (
                        <img src={play} className="invert-80" alt="play" />
                      )}
                    </button>

                    <button
                      onClick={skipBackward}
                      className="w-7 h-7 duration-300 opacity-[0.8] hover:opacity-100 cursor-pointer transition-colors"
                    >
                      <img src={rewind} className="invert-80" alt="rewind" />
                    </button>

                    <div className="flex items-center flex-col group relative border-b-2 border-transparent hover:border-white">
                      <button
                        onClick={toggleMute}
                        className="w-7 h-7  opacity-[0.8] cursor-pointer hover:opacity-100 transition-all duration-100"
                      >
                        {isMuted ? (
                          <img  src={volumeMin} className="invert-80" alt="muted" />
                        ) : (
                          <img  src={volumeMax} className="invert-80" alt="unmuted" />
                        )}
                      </button>

                      <div className="absolute left-0 -top-40 w-12 h-48 bg-transparent" />

                      <div
                        ref={sliderRef}
                        onMouseDown={handleMouseDown}
                        className="absolute hidden group-hover:block -top-35 w-1 h-25 bg-[#ffffffb3] cursor-pointer"
                      >
                        <div
                          className="absolute bottom-0 left-0 w-full bg-white"
                          style={{ height: `${isMuted ? 0 : volume * 100}%` }}
                        />
                        <div
                          className="absolute -left-1.5 w-4 h-4 rounded-full bg-white translate-x-1/2"
                          style={{
                            bottom: `${isMuted ? 0 : volume * 100}%`,
                            transform: "translate(-50%, 50%)",
                          }}
                        />
                      </div>
                    </div>

                    <span className="text-white text-sm tracking-wide">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <button onClick={toggleFullscreen} className="w-4 h-4 text-white transition-all duration-300 opacity-[0.8] hover:opacity-100 cursor-pointer">
                    {!isFullscreen ? (
                      <img src={maximize} className="invert-80" alt="maximize" />
                    ) : (
                      <img src={minimize} className="invert-80" alt="minimize" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reaction Controls*/}
           <ReactionBar movie={movie}/>
        </div>

        {/* Movie Details Section */}
        {movie && (
          <div className="text-white lg:w-2/4 px-4 lg:pr-10">
            <div className="flex flex-col gap-6 items-start">
              <div className="flex w-full justify-between lg:gap-10">
                <div className="flex lg:gap-2">
                  {posterUrl && (
                    <Link to={`/title/${movie.id}`}>
                      <div className="relative overflow-hidden pt-5 border-white/10">
                        <div className="flex gap-2 cursor-pointer">
                          <div className='w-45'>
                            <Post movie={movie} />
                          </div>
                          <div>
                            <h2 className="text-md font-bold mb-2 line-clamp-2">{movie.title}</h2>
                            {movie.genre && (
                              <p className="invert-40 text-sm mb-2 font-medium">
                                {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
                <Link to={`/title/${movie.id}`}>
                  <MdKeyboardArrowRight className="text-2xl font-bold mt-5 rounded-full hover:bg-white/20" />
                </Link>
              </div>

              <hr className="invert-60 w-full" />

              <div className="flex-1">
                {movie.releaseDate && (
                  <p className="text-gray-300 mb-2">
                    Release Date: {new Date(movie.releaseDate).getFullYear()}
                  </p>
                )}

                <div className="flex flex-col items-center">
                  {movie.description && (
                    <div className="relative w-full text-white">
                      <h2 className="font-bold text-2xl pb-2">Official Trailer</h2>
                      <div className="relative overflow-hidden">
                        <p className={`${more ? '' : 'line-clamp-3'} text-sm lg:text-md text-gray-200`}>
                          {movie.description}
                        </p>
                        {!more && (
                          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-black to-transparent" />
                        )}
                      </div>
                      <div className="flex justify-center mt-1">
                        {more ? (
                          <MdOutlineKeyboardArrowUp
                            className='text-white text-xl cursor-pointer'
                            onClick={() => showMore(false)}
                          />
                        ) : (
                          <MdOutlineKeyboardArrowDown
                            className='text-white text-xl cursor-pointer'
                            onClick={() => showMore(true)}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>)
}