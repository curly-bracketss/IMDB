import React from 'react'
import { Link } from 'react-router-dom'
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { LuDot } from 'react-icons/lu';
const Film = ({ movie, view }) => {
    return (
        <div className='py-2 px-[.25rem]  border-b-1 border-black/10'>
            {movie && <div className="relative flex flex-col  overflow-hidden   border-white/10  ">
                <Link to={`/title/${movie.id}`} className="flex gap-2  ">
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="max-w-18 rounded-lg rounded-tl-none hover:brightness-90"
                    />
                    <div className='flex justify-between w-full items-center'>
                        <div>
                            <h2 className="text-md font-bold mb-2 line-clamp-2 hover:text-[#0000008a]">{movie.title}</h2>

                            <div className='flex gap-2'>
                                {movie?.year && <p className="text-sm text-[#0000008a]">{movie.year}</p>}
                                {movie?.duration && <p className="text-sm text-[#0000008a]">{movie.duration}</p>}
                            </div>

                            <div className='flex gap-2 items-center flex-wrap'>
                                {movie?.rating &&
                                    <span className='flex items-center'>
                                        <TiStarFullOutline className='text-[#F5C518] text-sm' />
                                        <p className='text-[#0000008a] '>{movie?.rating}</p>
                                    </span>
                                }
                                <span className='flex items-center hover:bg-black/5 rounded-sm px-4 py-2 group'>
                                    <TiStarOutline className='text-[#0e63be] group-hover:text-black font-bold ' />
                                    <p className='text-[#0e63be] group-hover:text-black text-sm'>Rate</p>
                                </span>

                                <button className=' flex gap-1 text-[#0e63be] hover:bg-[#0e63be]/10  items-center p-2 rounded-4xl '>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='w-4 h-4' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M0 0h24v24H0V0z" fill="none"></path>
                                        <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"></path>
                                    </svg>
                                    <p className='text-sm'>Mark as watched</p>
                                </button>
                            </div>
                        </div>
                        <button className='hover:bg-[#0e63be]/10  rounded-full cursor-pointer w-12 h-12 justify-center flex items-center p-2 '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='fill-[#0e63be]' viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
                        </button>
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
                {
                    view === 'detailed' &&
                    <div className='flex flex-col gap-2 py-2'>
                        <p className='text-sm text-black tracking-wider'>{movie?.description}</p>
                        <div className='flex gap-5'> 
                             {movie?.director && <div className='flex items-center text-sm  gap-2 '>
                            <h3 className=' font-bold'>Director</h3>
                            <p className='text-[#0e63be] hover:underline'>{movie.director}</p>
                        </div>}

                            {movie?.actors &&
                                <div className='flex items-center text-sm  gap-2'>
                                    <h3 className=' font-bold'>Actors</h3>
                                    <div className='flex text-sm'>{
                                        <p className="text-[#0e63be] ">
                                            {Array.isArray(movie.actors)
                                                ? movie.actors.map((star, i) => (
                                                    <span key={star} className='hover:underline'>
                                                        {star}
                                                        {i < movie.actors.length - 1 && <LuDot className="inline text-white" />}
                                                    </span>
                                                ))
                                                : movie.actors}
                                        </p>

                                    }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>

            }

        </div>
    )
}

export default Film