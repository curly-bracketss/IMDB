import React from 'react'
import { FaFaceGrinStars } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom'
import Post from './Post';
const Poster = ({ movie }) => {
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
        <div className="flex flex-col bg-[#1a1a1a] my-2 w-[calc(50%-1rem)] sm:w-[calc(25%-1rem)] lg:w-[calc(16.67%-1.083rem)] lg:w-[calc(16.67% - 1.083rem)] rounded-b-xl rounded-tr-2xl">
            <div className="relative   overflow-hidden   border-white/10 group">
                <Post movie={movie} />
                <span className='absolute bottom-4 left-4 flex items-end justify-between w-full text-white'>
                    <span className='flex items-center gap-2'>
                        <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" className='group-hover:fill-[#F5C518]' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M10.56 16.68l5.604-4.2a.596.596 0 0 0 0-.96l-5.604-4.2a.6.6 0 0 0-.96.48v8.4a.6.6 0 0 0 .96.48zM12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 21.6c-5.292 0-9.6-4.308-9.6-9.6S6.708 2.4 12 2.4s9.6 4.308 9.6 9.6-4.308 9.6-9.6 9.6z"></path></svg>

                        {movie?.trailerDuration}
                    </span>
                </span>
            </div>
            <div className="p-2 flex flex-col items-start gap-1 pb-2">
                <h5 className='text-[#ffffffb3] text-sm'>Trailer</h5>
                <Link to={`/title/${movie.id}`} className="text-[16px] hover:underline  text-white text-left line-clamp-2 my-2 h-12">{movie.title}</Link>
                <h5 className='text-[#ffffffb3] text-sm italic'>{movie.year}</h5>

                <span className="flex items-center text-[#FFFFFFB3] gap-3 text-sm font-light ">
                    <span className=" flex text-sm items-center gap-1" onClick={() => handleLike()} >

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M13.12 2.06c.58-.59 1.52-.59 2.11-.01.36.36.51.87.41 1.37L14.69 8h5.65c2.15 0 3.6 2.2 2.76 4.18l-3.26 7.61C19.52 20.52 18.8 21 18 21H9c-1.1 0-2-.9-2-2V9.01c0-.53.21-1.04.58-1.41l5.54-5.54zM9.293 8.707A1 1 0 0 0 9 9.414V18a1 1 0 0 0 1 1h7.332a1 1 0 0 0 .924-.617c1.663-4.014 2.527-6.142 2.594-6.383.07-.253.12-.587.15-1v-.002A1 1 0 0 0 20 10h-8l1.34-5.34-4.047 4.047zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z"></path></svg>

                        {formatNumber(movie.likeCount)}

                    </span>
                    <span className="flex items-center gap-1" >
                        <span className="relative">
                            <FaHeart className="text-pink-800  absolute text-[1.25rem] " />
                            <FaFaceGrinStars className="text-yellow-400 ml-3 mt-2 text-[0.85rem]" />
                        </span>
                        {movie.reactions.count}
                    </span>
                </span>
            </div>
        </div>


    )
}

export default Poster