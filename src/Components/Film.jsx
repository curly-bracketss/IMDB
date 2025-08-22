import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { LuDot } from 'react-icons/lu';
import Rate from './Rate'
import { dataCntxt } from '../../context/DataContext';
import Post from './Post';
import Watched from './Watched';
import RatePopUp from './RatePopUp';

const Film = ({ movie, view }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const { currentUser } = useContext(dataCntxt)

    function handleRate() {
        if (currentUser) {
            setIsOpen(true)
        } else {
            navigate('/registration/signin')
        }
    }

    const ratedMovie = currentUser?.rateHistory?.find(item => item.movieId === movie?.id)

    return (
        <div className='py-2 px-[.25rem] border-b-1 border-black/10'>
            {movie && (
                <div className="relative flex flex-col overflow-hidden border-white/10">
                    <div className='flex items-center gap-2'>
                        <div className='max-w-18'>
                            <Post movie={movie} />
                        </div>

                        <div className='flex justify-between w-full items-center'>
                            <div>
                                {/* Title */}
                                <h2 className="text-md font-bold mb-2 line-clamp-2 hover:text-[#0000008a]">
                                    {movie.title}
                                </h2>

                                {/* Year & Duration */}
                                <div className='flex gap-2'>
                                    {movie?.year && (
                                        <p className="text-sm text-[#0000008a]">{movie.year}</p>
                                    )}
                                    {movie?.duration && (
                                        <p className="text-sm text-[#0000008a]">{movie.duration}</p>
                                    )}
                                </div>

                                {/* Rating + Rate + Watched */}
                                <div className='flex gap-2 items-center flex-wrap'>
                                    {movie?.rating && (
                                        <span className='flex items-center w-10'>
                                            <TiStarFullOutline className='text-[#F5C518] text-sm' />
                                            <p className='text-[#0000008a]'>{movie.rating}</p>
                                        </span>
                                    )}

                                    <div className='flex items-center text-sm text-[#0e63be] fill-[#0e63be]'>
                                        {ratedMovie ? (
                                            <button
                                                className="cursor-pointer hover:bg-black/10 p-1 px-2 items-center flex gap-1"
                                                onClick={handleRate}
                                            >
                                                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg" 
                                                    viewBox="0 0 24 24" fill="currentColor" role="presentation">
                                                    <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 
                                                        5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 
                                                        1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 
                                                        9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 
                                                        1.023 2.26 2.09 1.585L12 20.099z"></path>
                                                </svg>
                                                <p className="font-bold text-[#00000080]">
                                                    {ratedMovie.rating}
                                                </p>
                                            </button>
                                        ) : (
                                            <div className='p-2 hover:text-black hover:fill-black hover:bg-black/10'>
                                                <Rate movie={movie} />
                                            </div>
                                        )}

                                        {/* Rate Popup */}
                                        {isOpen && (
                                            <RatePopUp movie={movie} onClose={() => setIsOpen(false)} />
                                        )}

                                        {/* Watched Button */}
                                        <div className='rounded-full hover:bg-[#0e63be]/10'>
                                            <Watched movie={movie || {}} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info button */}
                            <button className='hover:bg-[#0e63be]/10 rounded-full cursor-pointer w-12 h-12 justify-center flex items-center p-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    className='fill-[#0e63be]' viewBox="0 0 24 24" fill="currentColor" role="presentation">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 
                                        2 2 6.48 2 12s4.48 10 10 10 10-4.48 
                                        10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 
                                        8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Detailed View */}
                    {view === 'detailed' && (
                        <div className='flex flex-col gap-2 py-2'>
                            <p className='text-sm text-black tracking-wider'>{movie?.description}</p>
                            <div className='flex gap-5'>
                                {movie?.director && (
                                    <div className='flex items-center text-sm gap-2'>
                                        <h3 className='font-bold'>Director</h3>
                                        <p className='text-[#0e63be] hover:underline'>{movie.director}</p>
                                    </div>
                                )}

                                {movie?.actors && (
                                    <div className='flex items-center text-sm gap-2'>
                                        <h3 className='font-bold'>Actors</h3>
                                        <div className='flex text-sm'>
                                            <p className="text-[#0e63be]">
                                                {Array.isArray(movie.actors)
                                                    ? movie.actors.map((star, i) => (
                                                        <span key={star} className='hover:underline'>
                                                            {star}
                                                            {i < movie.actors.length - 1 && (
                                                                <LuDot className="inline text-white" />
                                                            )}
                                                        </span>
                                                    ))
                                                    : movie.actors}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Film
