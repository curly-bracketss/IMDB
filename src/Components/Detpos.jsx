import React from 'react'
import { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { dataCntxt } from "../../context/DataContext"
import RatePopUp from './RatePopUp';

import { TiStarOutline } from 'react-icons/ti'
import DetailPopUp from './DetailPopUp'
import Post from './Post'
import Rate from './Rate'

const Detpos = ({ movie }) => {
    const [isOpen, setOpen] = useState(false)
    function handleDetail() {
        setOpen((prev) => !prev)
    }
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
        <div className="flex flex-col bg-white shadow my-2 w-[calc(50%-1rem)] sm:w-[calc(25%-1rem)] rounded-b-xl rounded-tr-2xl">
            <div className="relative   overflow-hidden   border-white/10 ">
                <Post movie={movie} />
            </div>
            <div className="p-2 flex flex-col items-start">
                <div className='flex gap-2'>
                    <span className="flex gap-1  text-[#0000008a] text-md items-center">
                        <svg className='fill-[#F5C518]' width="14" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                        <p>{movie.rating}</p>

                    </span>
                    <div className='flex items-center  text-[#0e63be] fill-[#0e63be]'>
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
                    </div>
                </div>

                <h2 className="text-[16px] hover:underline  text-black text-left line-clamp-2 cursor-pointer h-12">{movie.title}</h2>
                <div className='flex gap-2'>
                    {movie?.year && <p className="text-sm text-[#0000008a]">{movie.year}</p>}
                    {movie?.duration && <p className="text-sm text-[#0000008a]">{movie.duration}</p>}
                </div>
                <button onClick={handleDetail} className="rounded-4xl cursor-pointer hover:bg-[#0e63be]/10 bg-[#0000008a]/20 py-2 my-2 w-full  flex gap-1 justify-center items-center text-[#0e63be]">
                    <span className="text-sm font-bold">Details</span>
                </button>

            </div>
            {isOpen && <DetailPopUp isOpen={isOpen} setOpen={setOpen} movie={movie} />}
        </div>
    )
}

export default Detpos