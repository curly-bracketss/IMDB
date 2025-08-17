import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { TiStarOutline } from 'react-icons/ti'
import DetailPopUp from './DetailPopUp'
const Detpos = ({ movie }) => {
    const [isOpen, setOpen] = useState(false)
    function handleDetail() {
        setOpen((prev) => !prev)
    }
    return (
        <div className="flex flex-col bg-white shadow my-2 w-[calc(50%-1rem)] sm:w-[calc(25%-1rem)] rounded-b-xl rounded-tr-2xl">
            <div className="relative   overflow-hidden   border-white/10 ">
                <Link to={`/title/${movie.id}`}>
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-tr-2xl"
                    />
                </Link>
                <Link to='/registration/sign-in'>
                    <div className="absolute top-0 left-0 ">
                        <svg
                            className="fill-[#1f1f1fb6] stroke-[#444343] stroke-[0.8] absolute top-0 left-0 "
                            width="48px" height="68px" viewBox="0 0 32 45.3"
                        >
                            <polygon points="24 0 0 0 0 32 12.24 26.29 24 31.77" />
                        </svg>
                        <svg
                            className="fill-white absolute left-1 z-60 top-1"
                            width="24"
                            height="28"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                        </svg>
                    </div>
                </Link>
            </div>
            <div className="p-2 flex flex-col items-start">
                <div className='flex gap-2'>
                    <span className="flex gap-1  text-[#0000008a] text-md items-center">
                        <svg className='fill-[#F5C518]' width="14" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                        <p>{movie.rating}</p>

                    </span>
                    <span className='flex items-center hover:bg-black/5 rounded-sm  cursor-pointer px-4 py-2 group'>
                        <TiStarOutline className='text-[#0e63be] group-hover:text-black font-bold ' />
                        <p className='text-[#0e63be] group-hover:text-black '>Rate</p>
                    </span>
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
            {isOpen && <DetailPopUp isOpen={isOpen} setOpen={setOpen} movie={movie}/>}
        </div>
    )
}

export default Detpos