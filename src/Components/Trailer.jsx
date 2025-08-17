import { useParams, useNavigate, Link } from 'react-router-dom';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { dataCntxt } from '../../context/DataContext';
import maximize from '../assets/icons/maximize.svg'
import minimize from '../assets/icons/minimize.svg'
import light from '../assets/icons/light.svg'
import love from '../assets/icons/love.svg'
import wow from '../assets/icons/wow.svg'
import smile from '../assets/icons/smile.svg'
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
import { PiLineVerticalBold } from "react-icons/pi";

import { FaFaceGrinStars } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

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

  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [more, showMore] = useState(false);
  const [userReactions, setUserReactions] = useState({});
  const [reactionCounts, setReactionCounts] = useState(movie?.reactions || {});
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef(null);
  const sliderRef = useRef(null);
  const wrapperRef = useRef(null);
  const containerRef = useRef(null)
  const buttonRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e) => {
      console.error('Video error:', e);
      setIsLoading(false);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, []);

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

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.volume = volume;
      }
    } else {
      setIsMuted(true);
      if (videoRef.current) {
        videoRef.current.volume = 0;
      }
    }
  };

  const handleMouseDown = (e) => {
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();

    const updateVolumeFromMouse = (mouseEvent) => {
      const y = mouseEvent.clientY - rect.top;
      const sliderHeight = rect.height;

      const percentage = 1 - (y / sliderHeight);
      const newVolume = Math.max(0, Math.min(1, percentage));

      setVolume(newVolume);

      if (videoRef.current) {
        videoRef.current.volume = newVolume;
      }
    };

    updateVolumeFromMouse(e);

    const handleMouseMove = (moveEvent) => {
      updateVolumeFromMouse(moveEvent);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  const handleOpen = () => {
    setOpen(prev => !prev);
  };


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
  })
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen(); // Safari
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen(); // IE/Edge
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Safari
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE/Edge
      }
    }
  };
  // const handleReaction = (reactionType) => {
  //   const wasActive = userReactions[reactionType];

  //   // Update user reactions
  //   const newUserReactions = { ...userReactions };
  //   if (wasActive) {
  //     delete newUserReactions[reactionType];
  //   } else {
  //     // Remove any existing reaction first (assuming one reaction per user)
  //     Object.keys(newUserReactions).forEach(key => {
  //       if (newUserReactions[key]) {
  //         setReactionCounts(prev => ({
  //           ...prev,
  //           [key]: Math.max(0, (prev[key] || 0) - 1)
  //         }));
  //       }
  //     });
  //     // Clear all reactions and set the new one
  //     Object.keys(newUserReactions).forEach(key => {
  //       newUserReactions[key] = false;
  //     });
  //     newUserReactions[reactionType] = true;
  //   }
  //   setUserReactions(newUserReactions);

  //   setReactionCounts(prev => {
  //     const newCounts = { ...prev };
  //     if (wasActive) {
  //       newCounts[reactionType] = Math.max(0, (newCounts[reactionType] || 0) - 1);
  //     } else {
  //       newCounts[reactionType] = (newCounts[reactionType] || 0) + 1;
  //     }
  //     return newCounts;
  //   });
  // };

  const reactionButtons = [
    { type: 'love', icon: love, label: 'Love', name: 'Love it' },
    { type: 'smile', icon: smile, label: 'Smile', name: 'Funny' },
    { type: 'wow', icon: wow, label: 'Wow', name: 'Wow' },
    { type: 'light', icon: light, label: 'Light', name: 'Insightful' }
  ];

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  }


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
                  className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors"
                >
                  <X size={22} />
                  <span className="text-md font-medium">Close</span>
                </button>
                <button className="text-white hover:text-gray-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--share" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg>
                </button>
              </div>
            )}
            <div ref={containerRef} className={isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'relative'}>
              {videoSrc ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  onClick={togglePlay}
                  poster={posterUrl}
                  
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              ) : (
                <p className="text-gray-400 h-[50vh] text-2xl w-full flex items-center justify-center">No trailers found</p>
              )}
              {/* Center Play Controls */}

              {videoSrc && <div className={`absolute inset-0 flex items-center justify-center z-10  ${showControls ? 'opacity-100' : 'opacity-0'}`} onClick={togglePlay}>
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
              }
              {/* Bottom Controls */}
              
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-2 transition-opacity duration-300 z-20 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
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
                  <div className=" flex items-center justify-between">
                    <div className="flex items-center space-x-4 relative">
                      <button
                        onClick={togglePlay}
                        className="w-6 h-6 transition-all duration-300 opacity-[0.8] hover:opacity-100 cursor-pointer"
                      >
                        {isPlaying ?
                          <img src={pause} className="invert-80" alt="pause" /> :
                          <img src={play} className="invert-80" alt="play" />
                        }
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
                          className="w-7 h-7 opacity-[0.8] cursor-pointer hover:opacity-100 transition-all duration-100"
                        >
                          {isMuted ? (
                            <img src={volumeMin} className="invert-80" />
                          ) : (
                            <img src={volumeMax} className="invert-80" />
                          )}
                        </button>


                        <div className="absolute left-0 -top-40 w-12 h-48 bg-transparent" />

                        <div
                          ref={sliderRef}
                          onMouseDown={handleMouseDown}
                          onClick={isMuted ? toggleMute : undefined}
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
                      {!isFullscreen ? <img src={maximize} className="invert-80" /> : <img src={minimize} className="invert-80" />}
                    </button>
                  </div>
                </div>
              
            </div>

            {/* Reaction Controls*/}

            <div className="flex   items-center  relative   py-2">
              <div className="flex gap-5">
                <button className="flex gap-2 items-center cursor-pointer ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-[#ffffffb3]" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M13.12 2.06c.58-.59 1.52-.59 2.11-.01.36.36.51.87.41 1.37L14.69 8h5.65c2.15 0 3.6 2.2 2.76 4.18l-3.26 7.61C19.52 20.52 18.8 21 18 21H9c-1.1 0-2-.9-2-2V9.01c0-.53.21-1.04.58-1.41l5.54-5.54zM9.293 8.707A1 1 0 0 0 9 9.414V18a1 1 0 0 0 1 1h7.332a1 1 0 0 0 .924-.617c1.663-4.014 2.527-6.142 2.594-6.383.07-.253.12-.587.15-1v-.002A1 1 0 0 0 20 10h-8l1.34-5.34-4.047 4.047zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z"></path></svg>
                  <p className="text-[#ffffffb3] font-bold">{formatNumber(movie?.likeCount || 0)}</p>
                </button>
                <button className="flex gap-2 items-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-[#ffffffb3]" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M16.41 16.4l-5.53 5.54c-.58.59-1.52.59-2.11.01-.36-.36-.51-.87-.41-1.37L9.31 16H3.66c-2.15 0-3.6-2.2-2.75-4.18l3.26-7.61A1.99 1.99 0 0 1 6 3h8.99c1.1 0 2 .9 2 2v9.99c0 .53-.21 1.04-.58 1.41zm-1.703-1.107a1 1 0 0 0 .293-.707V6a1 1 0 0 0-1-1H6.66a1 1 0 0 0-.92.607c-1.667 3.902-2.53 5.981-2.586 6.236-.06.268-.11.606-.154 1.013V13a1 1 0 0 0 1 1h8l-1.077 4.293c-.153.527-.19.814-.11.86.08.046.281-.144.605-.571l3.29-3.29zM21 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></svg>
                </button>
                <span className="md:hidden flex  gap-1" >
                  <span className="relative">
                    <FaHeart className="text-pink-800  absolute text-[1.45rem] " />
                    <FaFaceGrinStars className="text-yellow-400 ml-4 mt-2" />
                  </span>
                  <p className="text-[#ffffffb3] font-bold"> {movie?.reactions?.count}</p>
                </span>
                <button className="hidden cursor-pointer md:flex gap-2" ref={buttonRef} onClick={() =>
                  handleOpen()}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className="fill-[#ffffffb3]" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 9.5C7 8.67 7.67 8 8.5 8s1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5zm5 8c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5zm3.5-6.5c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zM22 1h-2v2h-2v2h2v2h2V5h2V3h-2V1zm-2 11c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.46 0 2.82.4 4 1.08V2.84A9.929 9.929 0 0011.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12c0-1.05-.17-2.05-.47-3H19.4c.38.93.6 1.94.6 3z"></path></svg>
                </button>
              </div>
              {/* Reactions and react bar*/}
              {open && <div ref={wrapperRef} className="flex absolute top-10 left-35 z-50 bg-[#1F1F1F] p-3 rounded-md">
                {reactionButtons.map((reaction) => (
                  <button
                    key={reaction.type}
                    // onClick={() => handleReaction(reaction.type)}
                    className={`flex  flex-col items-center gap-2 px-3 py-2 w-25  rounded-md cursor-pointer transition-all duration-200  ${userReactions[reaction.type]
                      ? 'bg-white/20  scale-105'
                      : 'hover:bg-white/10'
                      } backdrop-blur-sm`}
                    title={`${reaction.label} (${reactionCounts[reaction.type] || 0})`}
                  >
                    <img
                      src={reaction.icon}
                      alt={reaction.label}
                      className={`w-12 h-12 transition-transform duration-200 ${userReactions[reaction.type] ? 'scale-110' : ''
                        }`}
                    />

                    <span className=" text-sm invert-80 font-medium">
                      {reaction.name}
                    </span>
                  </button>
                ))}
              </div>
              }
              <PiLineVerticalBold className=" hidden md:block text-[#ffffffb3] text-4xl " />

              <div className="flex gap-3">{reactionButtons.map((reaction) => (
                <button
                  key={reaction.type}
                  // onClick={() => handleReaction(reaction.type)}
                  className={` hidden md:flex items-center cursor-pointer gap-2 px-3 py-2 rounded-full border-white/40 transition-all duration-700 ease-in-out  border ${userReactions[reaction.type]
                    ? 'bg-white/20 border-white/50 scale-105'
                    : 'hover:bg-white/10 border-white/20 '
                    } backdrop-blur-sm`}
                  title={`${reaction.label} (${reactionCounts[reaction.type] || 0})`}
                >
                  <img
                    src={reaction.icon}
                    alt={reaction.label}
                    className={`w-4 h-4 transition-transform duration-200 ${userReactions[reaction.type] ? 'scale-110' : ''
                      }`}
                  />
                  <span className="text-white text-sm font-medium">
                    {reactionCounts[reaction.type] || 0}
                  </span>
                </button>
              ))}
              </div>
            </div>
          </div>



          {/* Details about movie */}

          {movie && (
            <div className=" text-white lg:w-2/4 px-4 lg:pr-10">
              <div className="flex flex-col gap-6 items-start">
                <div className="flex  w-full  justify-between lg:gap-10 ">
                  <div className="flex lg:gap-2 ">

                    {posterUrl && (
                      <div>
                        <div className="relative   overflow-hidden   border-white/10  ">
                          <Link to={`/title/${movie.id}`} className="flex gap-2 ">
                            <img
                              src={movie.posterUrl}
                              alt={movie.title}
                              className="w-25 "
                            />
                            <div>
                              <h2 className="text-md font-bold mb-2 line-clamp-2">{movie.title}</h2>

                              {movie.genre && (
                                <p className="invert-40 text-sm mb-2 font-medium"  >
                                  {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                                </p>
                              )}
                            </div>

                          </Link>
                          <Link to='/registration/sign-in'>
                            <div className="absolute -top-1 left-0 ">
                              <svg
                                className="fill-[#1f1f1fb6] stroke-[#444343] stroke-[0.8] absolute top-0 left-0 "
                                width="40px" height="60px" viewBox="0 0 32 45.3"
                              >
                                <polygon points="24 0 0 0 0 32 12.24 26.29 24 31.77" />
                              </svg>
                              <svg
                                className="fill-white absolute left-1 z-60 top-1"
                                width="20"
                                height="24"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                              </svg>
                            </div>
                          </Link>
                        </div>
                      </div>
                    )}

                  </div>
                  <Link to={`/title/${movie.id}`}  ><MdKeyboardArrowRight className="text-2xl font-bold mt-5 rounded-full  hover:bg-white/20" /></Link>
                </div>
                <hr className="invert-60 w-full"></hr>
                <div className="flex-1">
                  {movie.releaseDate && (
                    <p className="text-gray-300 mb-2">
                      Release Date: {new Date(movie.releaseDate).getFullYear()}
                    </p>
                  )}


                  <div className="flex flex-col items-center ">


                    {movie.description &&
                      <div className="relative w-full  text-white ">
                        <h2 className="font-bold text-2xl pb-2">Official Trailer</h2>

                        <div className="relative overflow-hidden">
                          <p className={`${more ? '' : 'line-clamp-3'} text-sm lg:text-md  text-gray-200 `}>
                            {movie.description}
                          </p>
                          {!more && <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-black to-transparent" />}
                        </div>                       <div className="flex justify-center mt-1">
                          {more ? (<MdOutlineKeyboardArrowUp className='text-white text-xl' onClick={() => showMore(false)} />) : (<MdOutlineKeyboardArrowDown className='text-white text-xl' onClick={() => showMore(true)} />
                          )}
                        </div>
                      </div>

                    }

                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div >

  );
}