import { X } from 'lucide-react';
import React from 'react';
import { GrFormNext } from 'react-icons/gr';
import { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { dataCntxt } from "../../context/DataContext"
import RatePopUp from './RatePopUp';

import { LuDot } from 'react-icons/lu';
import { TiStarOutline, TiStarFullOutline } from 'react-icons/ti'
import Rate from './Rate';
import Watched from './Watched';
const DetailPopUp = ({ isOpen, setOpen, movie }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Clean up when component unmounts
        return () => document.body.classList.remove('overflow-hidden');
    }, [isOpen]);

    if (!isOpen) return null;

    const navigate = useNavigate()
    const [Open, setIsOpen] = useState(false)
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
        <div className="fixed inset-0  bg-black/50 flex items-end  justify-end sm:items-center flex-col sm:justify-center z-100">
            <div className='flex flex-col items-end'>
                <button
                    onClick={() => setOpen(false)}
                    className="  cursor-pointer outline-none text-white hover:bg-white/10 p-3 rounded-full transition-colors"
                >
                    <X size={22} />
                </button>
                <div className=" pop-up transform transition-all w-full sm:max-w-[calc(600px+4rem)] duration-300 ease-out
                  bg-[#1a1a1a] p-5  sm:rounded-lg shadow-lg flex flex-col gap-5">
                    <div className='flex gap-2 w-full'>
                        <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="h-30  rounded-lg rounded-tl-none hover:brightness-90"
                        />
                        <div className='flex flex-col sm:gap-1  '>
                            <Link to={`/title/${movie.id}`} className="text-white text-lg md:text-2xl font-bold flex group">{movie.title}
                                <GrFormNext className='group-hover:text-[#F5C518] text-3xl font-bold' />

                            </Link>
                            {movie?.production ?
                                (<span className='flex invert-80 items-center text-[0.875rem] md:text-sm'>
                                    <p>{movie?.production}</p>

                                    {movie.duration &&
                                        <p className='flex items-center'> <LuDot />{movie?.duration}</p>}
                                </span>) :
                                (movie?.year && <span className='flex text-[0.875rem] md:text-sm invert-80 items-center'>
                                    <p>{movie?.year}</p>
                                    <LuDot />
                                    {movie.duration &&
                                        <p> {movie?.duration}</p>}
                                </span>)}

                            {movie?.genre &&
                                <div className='flex text-[0.875rem] md:text-sm'>{
                                    <p className="text-[#ffffffb3] ">
                                        {Array.isArray(movie.genre)
                                            ? movie.genre.map((star, i) => (
                                                <span key={star} className='hover:underline'>
                                                    {star}
                                                    {i < movie.genre.length - 1 && <LuDot className="inline text-white" />}
                                                </span>
                                            ))
                                            : movie.genre}
                                    </p>

                                }
                                </div>
                            }
                            <div className='flex gap-2'>
                                <span className='flex items-center text-[#ffffffb3] '>
                                    <TiStarFullOutline className='text-[#F5C518] text-2xl pr-1' />
                                    <p >{movie?.rating}</p>
                                    <p > /10</p>
                                </span>
                                <div className='flex items-center    text-[#0e63be] fill-[#0e63be]'>
                                    {ratedMovie ? (
                                        <button
                                            className="cursor-pointer hover:bg-white/10 p-1 px-2 items-center flex gap-1"
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
                                            <p className="font-bold text-[#ffffffb3]">
                                                {ratedMovie.rating}
                                            </p>
                                        </button>
                                    ) : (
                                        <div className='p-2   hover:text-white hover:fill-white hover:bg-white/10'>
                                            <Rate movie={movie} />
                                        </div>
                                    )}

                                    {/* Rate Popup */}
                                    {Open && (
                                        <RatePopUp movie={movie} onClose={() => setIsOpen(false)} />
                                    )}

                            </div>
                        </div>
                    </div>
                </div>
                <p className='text-sm text-white tracking-wider'>{movie?.description}</p>
                {movie?.director && <div className='flex items-center text-sm w-full gap-5 '>
                    <h3 className='text-[#ffffffb3] font-bold'>Director</h3>
                    <p className='text-[#5799ef] hover:underline'>{movie.director}</p>
                </div>}
                {movie?.stars &&
                    <div className='flex items-center text-sm w-full gap-5'>
                        <h3 className='text-[#ffffffb3] font-bold'>Stars</h3>
                        <div className='flex text-sm'>{
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
                    </div>
                }
                {movie?.actors &&
                    <div className='flex items-center text-sm w-full gap-5'>
                        <h3 className='text-[#ffffffb3] font-bold'>Actors</h3>
                        <div className='flex text-sm'>{
                            <p className="text-[#5799ef] ">
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
                <div className='flex w-full gap-2 items-center'>

                    <Link className="flex items-center justify-center  rounded-4xl bg-[#ffffffb3]/10     py-2 my-2 w-1/2" to={`/video/${movie.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-[#5799EF]' fill="white" role="presentation"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"></path></svg>
                        <p className="text-sm  font-bold text-[#5799EF]">Trailer</p>
                    </Link>
                    <div className='text-[#5799EF] flex items-center justify-center fill-[#5799ef] w-1/2 '> <Watched movie={movie} /></div>


                </div>
            </div>


        </div>
        </div >
    );
};

export default DetailPopUp;
