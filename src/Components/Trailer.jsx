import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Heart, ThumbsUp, Sun, Smile, Eye, Share2, X, Plus, ChevronRight } from 'lucide-react';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Movie data
  const movieData = {
    id: "c4f7a95e-0d29-4d2b-85dc-45a77c08b3fb",
    title: "The SpongeBob Movie: Search for Squarepants (2025)",
    trailerDuration: "1:02",
    trailerUrl: "https://imdb-video.media-imdb.com/vi1122486297/1434659607842-pgv4ql-1751376199178.mp4?Expires=1751828963&Signature=lKc0q7fKt3VFlhKiPVnYmsMW3XUYT3PSoyM9gGbllRmLS3ENPoIXNPXXYozdp71qviAuENL~RmcJQ-~qo2jCDXNDm-6IrQZGS5mvxECknLW7DaCC5UmkJfQuvBaUwFnposocIOmaF2X6mCRXu5zNyd1er6aEUERixAbhxb96ljOEUh~xZvR3-Ly6BU6OkZYIWL8NR2~i-SWnu0rmDH79EPAltyCn1eGR-l0KDkPe1XJ39eod0h~VVDHQnHzcZ2hQJI8bHdl-U9OjWQsKhtFHluLkbaoy2MNYBc5j3IB-urPCLxiGERzaW6I~amlw9v15G~A4KvgIdglZRTU1LC3Zag__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
    trailerPosterUrl: "https://m.media-amazon.com/images/M/MV5BZTY4Zjk0MDMtZTM0Ny00YTI5LThiZDktZmVhNGY3NGNmY2I4XkEyXkFqcGc@._CR382,404,2503,1408_QL75_UX500_CR0,0,500,281_.jpg",
    likeCount: 63,
    reactions: {
      count: 21,
      smile: 41,
      light: 14,
      love: 21,
      wow: 10,
      sad: 12,
      angry: 10
    },
    year: 2025,
    genre: ["Animation", "Adventure", "Comedy", "Family", "Fantasy", "Horror"],
    releaseDate: "MAY 23, 2025",
    description: "SpongeBob journeys to the ocean's depths to face the Flying Dutchman's ghost, encountering challenges and uncovering maritime mysteries."
  };

  const [reactions, setReactions] = useState({
    love: movieData.reactions.love,
    light: movieData.reactions.light,
    smile: movieData.reactions.smile,
    wow: movieData.reactions.wow,
    sad: movieData.reactions.sad,
    angry: movieData.reactions.angry
  });

  const [likeCount, setLikeCount] = useState(movieData.likeCount);
  const [isLiked, setIsLiked] = useState(false);

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
    const handleError = (e) => {
      console.error('Video error:', e);
      setIsLoading(false);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (isPlaying) {
        video.pause();
      } else {
        await video.play();
      }
    } catch (error) {
      console.error('Error playing video:', error);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * duration;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, pos));
    setVolume(newVolume);
    video.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const handleReaction = (type) => {
    setReactions(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black">
        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
          <X size={20} />
          <span>Close</span>
        </div>
        <button className="p-2 hover:bg-white/10 rounded">
          <Share2 size={20} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Video Player Section */}
        <div className="flex-1 lg:w-2/3 flex flex-col">
          <div 
            className="relative bg-black flex-1 flex items-center justify-center"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              className="w-full h-full max-h-[70vh] object-contain"
              onClick={togglePlay}
              poster={movieData.trailerPosterUrl}
              preload="metadata"
              crossOrigin="anonymous"
              playsInline
            >
              <source src={movieData.trailerUrl} type="video/mp4" />
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}

            {/* Play Controls Overlay */}
            {showControls && !isLoading && (
              <div className="absolute inset-0 bg-black/20">
                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => skip(-10)}
                      className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
                    >
                      <SkipBack size={24} />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="p-4 rounded-full bg-white/90 text-black hover:bg-white transition-all"
                    >
                      {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                    </button>
                    <button
                      onClick={() => skip(10)}
                      className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
                    >
                      <SkipForward size={24} />
                    </button>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
                  {/* Progress Bar */}
                  <div 
                    className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer hover:h-2 transition-all"
                    onClick={handleSeek}
                  >
                    <div 
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={togglePlay}
                        className="p-2 text-white hover:text-gray-300 transition-colors"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={toggleMute}
                          className="p-1 text-white hover:text-gray-300 transition-colors"
                        >
                          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                        <div 
                          className="w-16 h-1 bg-gray-600 rounded-full cursor-pointer"
                          onClick={handleVolumeChange}
                        >
                          <div 
                            className="h-full bg-white rounded-full"
                            style={{ width: `${volume * 100}%` }}
                          />
                        </div>
                      </div>

                      <span className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <button 
                      onClick={toggleFullscreen}
                      className="p-2 text-white hover:text-gray-300 transition-colors"
                    >
                      <Maximize size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reaction Bar */}
          <div className="flex items-center justify-between p-4 bg-black border-t border-gray-800">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-colors ${
                  isLiked ? 'bg-blue-600/20 text-blue-400' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <ThumbsUp size={16} fill={isLiked ? 'currentColor' : 'none'} />
                <span className="text-sm">{likeCount}</span>
              </button>
              
              <button className="p-2 text-white hover:text-gray-300 transition-colors">
                <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 10l5 5 5-5"/>
                </svg>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleReaction('love')}
                className="flex items-center space-x-1 px-3 py-1 rounded-full bg-pink-600/20 hover:bg-pink-600/30 transition-colors"
              >
                <span className="text-pink-400">💖</span>
                <span className="text-white text-sm">{reactions.love}</span>
              </button>

              <button
                onClick={() => handleReaction('light')}
                className="flex items-center space-x-1 px-3 py-1 rounded-full bg-yellow-600/20 hover:bg-yellow-600/30 transition-colors"
              >
                <span className="text-yellow-400">👑</span>
                <span className="text-white text-sm">{reactions.light}</span>
              </button>

              <button
                onClick={() => handleReaction('wow')}
                className="flex items-center space-x-1 px-3 py-1 rounded-full bg-orange-600/20 hover:bg-orange-600/30 transition-colors"
              >
                <span className="text-orange-400">⭐</span>
                <span className="text-white text-sm">{reactions.wow}</span>
              </button>

              <button
                onClick={() => handleReaction('sad')}
                className="flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-600/20 hover:bg-blue-600/30 transition-colors"
              >
                <span className="text-blue-400">😢</span>
                <span className="text-white text-sm">{reactions.sad}</span>
              </button>

              <button
                onClick={() => handleReaction('angry')}
                className="flex items-center space-x-1 px-3 py-1 rounded-full bg-red-600/20 hover:bg-red-600/30 transition-colors"
              >
                <span className="text-red-400">😡</span>
                <span className="text-white text-sm">{reactions.angry}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
       
      </div>
    </div>
  );
};

export default VideoPlayer;