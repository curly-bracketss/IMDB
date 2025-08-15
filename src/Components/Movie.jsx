import { Link } from "react-router-dom"

const Movie = ({ movie }) => {
    return (
        <div className="flex flex-col bg-[#000000de]  w-full rounded-b-xl rounded-tr-2xl">
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
            <div className="p-2 flex flex-col items-start gap-1">
                <span className="flex gap-1  text-[#FFFFFFB3] text-md items-center">
                    <svg className='fill-[#F5C518]' width="14" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                    <p>{movie.rating}</p>
                    <Link to='/registration/sign-in' className="pl-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" className="fill-[#5799EF]" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z"></path></svg>
                    </Link>
                </span>
                <h2 className="text-[16px] hover:underline  text-white text-left font-semibold line-clamp-2 my-2 h-12">{movie.title}</h2>
                <button className="rounded-4xl bg-[#30353C] py-2 my-2 w-full  flex gap-1 justify-center items-center text-[#5799EF]"> <svg
                    className="fill-[#5799EF] "
                    width="20"

                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                </svg>
                    <span className="text-sm font-bold">Watchlist</span></button>
                <Link className="flex items-center justify-center w-full py-2" to={`/video/${movie.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" role="presentation"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"></path></svg>
                    <p className="text-sm  font-bold text-white">Trailer</p>
                </Link>
            </div>
        </div>
    )
}

export default Movie