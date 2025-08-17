import { X } from 'lucide-react';
import React from 'react';
import { useEffect } from 'react';
import { GrFormNext } from 'react-icons/gr';
import { LuDot } from 'react-icons/lu';
import { TiStarOutline, TiStarFullOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom';
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
                    <div className='flex gap-2 '>
                        <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="max-w-18 rounded-lg rounded-tl-none hover:brightness-90"
                        />
                        <div className='flex flex-col gap-1'>
                            <Link to={`/title/${movie.id}`} className="text-white text-2xl font-bold flex group">{movie.title}
                                <GrFormNext className='group-hover:text-[#F5C518] text-3xl font-bold' />

                            </Link>
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
                                </span>)}

                            {movie?.genre &&
                                <div className='flex text-sm'>{
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
                                <span className='flex items-center text-[#ffffffb3]'>
                                    <TiStarFullOutline className='text-[#F5C518] text-2xl pr-1' />
                                    <p >{movie?.rating}</p>
                                    <p > /10</p>
                                </span>
                                <span className='flex items-center hover:bg-black/5 rounded-sm  cursor-pointer px-4 py-2 group'>
                                    <TiStarOutline className='text-[#5799ef] group-hover:text-black font-bold ' />
                                    <p className='text-[#5799ef] group-hover:text-black '>Rate</p>
                                </span>
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
                    <div className='flex w-full gap-2'>

                        <Link className="flex items-center justify-center  rounded-4xl bg-[#ffffffb3]/10     py-2 my-2 w-1/2" to={`/video/${movie.id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-[#5799EF]' fill="white" role="presentation"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"></path></svg>
                            <p className="text-sm  font-bold text-[#5799EF]">Trailer</p>
                        </Link>
                        <button className="rounded-4xl bg-[#ffffffb3]/10     py-2 my-2 w-1/2 flex gap-1 justify-center items-center text-[#5799EF]"> <svg
                            className="fill-[#5799EF] "
                            width="20"

                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                        </svg>
                            <span className="text-sm font-bold">Watchlist</span></button>


                    </div>
                </div>


            </div>
        </div>
    );
};

export default DetailPopUp;
