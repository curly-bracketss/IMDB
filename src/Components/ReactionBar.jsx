import React, { useState, useRef, useEffect } from 'react'
import light from '../assets/icons/light.svg'
import love from '../assets/icons/love.svg'
import wow from '../assets/icons/wow.svg'
import smile from '../assets/icons/smile.svg'
import { PiLineVerticalBold } from "react-icons/pi";
import { FaFaceGrinStars } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const ReactionBar = ({ movie }) => {
    const [userReactions, setUserReactions] = useState({});
    const [open, setOpen] = useState(false);
    const [reactionCounts, setReactionCounts] = useState(movie?.reactions || {});
    const [userLikeStatus, setUserLikeStatus] = useState(null);
    // "like" | "dislike" | null
    const [likeCount, setLikeCount] = useState(movie?.likeCount || 0);
    const [dislikeCount, setDislikeCount] = useState(movie?.dislikeCount || 0);
    const wrapperRef = useRef(null);
    const buttonRef = useRef(null);

    const handleOpen = () => {
        setOpen(prev => !prev);
    };
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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num.toString();
    }

    const reactionButtons = [
        { type: 'love', icon: love, label: 'Love', name: 'Love it' },
        { type: 'smile', icon: smile, label: 'Smile', name: 'Funny' },
        { type: 'wow', icon: wow, label: 'Wow', name: 'Wow' },
        { type: 'light', icon: light, label: 'Light', name: 'Insightful' }
    ];

    // ✅ Handles adding/removing reactions
    function handleReaction(type) {
        setUserReactions(prev => {
            const alreadyReacted = prev[type];

            // If user has already reacted → remove reaction
            if (alreadyReacted) {
                setReactionCounts(rc => ({
                    ...rc,
                    [type]: Math.max((rc[type] || 1) - 1, 0)
                }));
                return { ...prev, [type]: false };
            }

            // Otherwise add reaction
            setReactionCounts(rc => ({
                ...rc,
                [type]: (rc[type] || 0) + 1
            }));
            return { ...prev, [type]: true };
        });
    }
    const handleLike = () => {
        if (userLikeStatus === "like") {
            // undo like
            setUserLikeStatus(null);
            setLikeCount((prev) => prev - 1);
        } else {
            // switching from dislike → like
            if (userLikeStatus === "dislike") {
                setDislikeCount((prev) => prev - 1);
            }
            setUserLikeStatus("like");
            setLikeCount((prev) => prev + 1);
        }
    };

    const handleDislike = () => {
        if (userLikeStatus === "dislike") {
            // undo dislike
            setUserLikeStatus(null);
            setDislikeCount((prev) => prev - 1);
        } else {
            // switching from like → dislike
            if (userLikeStatus === "like") {
                setLikeCount((prev) => prev - 1);
            }
            setUserLikeStatus("dislike");
            setDislikeCount((prev) => prev + 1);
        }
    };
    return (
        <div>
            <div className="flex items-center relative py-2">
                <div className="flex gap-5">
                    {/* Likes button */}
                    <button className="flex gap-2 items-center cursor-pointer rounded-full hover:bg-white/10 px-2 py-1 " onClick={() => handleLike()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={` ${userLikeStatus==='like'? 'fill-yellow-400':'fill-[#ffffffb3]' }`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M13.12 2.06L7.58 7.6c-.37.37-.58.88-.58 1.41V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61C23.94 10.2 22.49 8 20.34 8h-5.65l.95-4.58c.1-.5-.05-1.01-.41-1.37-.59-.58-1.53-.58-2.11.01zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z"></path></svg>
                        <p className={` font-bold ${userLikeStatus==='like'? 'text-yellow-400':'text-[#ffffffb3]' }`} >{formatNumber(movie?.likeCount || 0)}</p>
                    </button>

                    {/* Another button */}
                    <button className="flex gap-2 items-center cursor-pointer rounded-full hover:bg-white/10 px-2 py-1" onClick={() => handleDislike()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={` rotate-180 ${userLikeStatus==='dislike'? 'fill-yellow-400':'fill-[#ffffffb3]' }`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M13.12 2.06L7.58 7.6c-.37.37-.58.88-.58 1.41V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61C23.94 10.2 22.49 8 20.34 8h-5.65l.95-4.58c.1-.5-.05-1.01-.41-1.37-.59-.58-1.53-.58-2.11.01zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z"></path></svg>
                     </button>

                    {/* Mobile reaction count */}
                    <span className="md:hidden flex gap-1">
                        <span className="relative">
                            <FaHeart className="text-pink-800 absolute text-[1.45rem]" />
                            <FaFaceGrinStars className="text-[#F5C518] ml-4 mt-2" />
                        </span>
                        <p className="text-[#ffffffb3] font-bold">{movie?.reactions?.count}</p>
                    </span>

                    {/* Dropdown trigger */}
                    <button
                        className="hidden cursor-pointer md:flex gap-2"
                        ref={buttonRef}
                        onClick={handleOpen}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" className='fill-[#ffffffb3]' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 9.5C7 8.67 7.67 8 8.5 8s1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5zm5 8c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5zm3.5-6.5c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zM22 1h-2v2h-2v2h2v2h2V5h2V3h-2V1zm-2 11c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.46 0 2.82.4 4 1.08V2.84A9.929 9.929 0 0011.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12c0-1.05-.17-2.05-.47-3H19.4c.38.93.6 1.94.6 3z"></path></svg>
                    </button>
                </div>

                {/* Reactions dropdown */}
                {open && (
                    <div ref={wrapperRef} className="flex absolute top-12 left-32 z-2 bg-[#1F1F1F] p-3 rounded-md">
                        {reactionButtons.map((reaction) => (
                            <button
                                key={reaction.type}
                                onClick={() => handleReaction(reaction.type)}
                                className={`flex flex-col items-center gap-2 px-3 py-2 w-25 rounded-md cursor-pointer transition-all duration-200 ${userReactions[reaction.type]
                                        ? ' '
                                        : 'hover:bg-white/10'
                                    } backdrop-blur-sm`}
                                title={`${reaction.label} (${reactionCounts[reaction.type] || 0})`}
                            >
                                <img
                                    src={reaction.icon}
                                    alt={reaction.label}
                                    className={`w-12 h-12 transition-transform duration-200 ${userReactions[reaction.type] ? 'scale-110 opacity-20' : ''
                                        }`}
                                />
                                <span className="text-sm invert-80 font-medium">
                                    {reaction.name}
                                </span>
                                {userReactions[reaction.type] && <span className='absolute top-0 left-2/3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='fill-white ' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M13.89 8.7L12 10.59 10.11 8.7a.996.996 0 10-1.41 1.41L10.59 12 8.7 13.89a.996.996 0 101.41 1.41L12 13.41l1.89 1.89a.996.996 0 101.41-1.41L13.41 12l1.89-1.89a.996.996 0 000-1.41c-.39-.38-1.03-.38-1.41 0zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
                                </span>}
                            </button>
                        ))}
                    </div>
                )}

                <PiLineVerticalBold className="hidden md:block text-[#ffffffb3] text-4xl" />

                {/* Inline reaction buttons */}
                <div className="flex gap-3">
                    {reactionButtons.map((reaction) => (
                        <button
                            key={reaction.type}
                            onClick={() => handleReaction(reaction.type)}
                            className={`hidden md:flex items-center cursor-pointer gap-2 px-3 py-2 rounded-full border transition-all duration-700 ease-in-out ${userReactions[reaction.type]
                                    ? 'bg-white/20 border-yellow-400 scale-105'
                                    : 'hover:bg-white/10 border-white/20'
                                } backdrop-blur-sm`}
                            title={`${reaction.label} (${reactionCounts[reaction.type] || 0})`}
                        >
                            <img
                                src={reaction.icon}
                                alt={reaction.label}
                                className={`w-4 h-4 transition-transform duration-200 ${userReactions[reaction.type] ? 'scale-110' : ''
                                    }`}
                            />
                            <span className={`text-white text-sm font-medium ${userReactions[reaction.type] ? 'text-yellow-400' : ''
                                }`}>
                                {reactionCounts[reaction.type] || 0}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReactionBar;
