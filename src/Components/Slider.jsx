import { FaFaceGrinStars } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom"
const Slider = ({ slide }) => {
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
        <Link to={`/video/${slide.id}`}>
            <div className="relative w-full rounded-2xl overflow-hidden bg-black ">

                <img
                    src={slide.trailerPosterUrl}
                    alt={slide.title}
                    className=" w-full h-full pb-24 "
                />
                <div className="w-full  left-0 h-16 transition-colors sm:h-24 bottom-20 absolute bg-gradient-to-t  from-black via-black/90 to-transparent z-10" />
                <div className="absolute bottom-4 left-4 right-4 z-20 text-white flex items-end justify-between group">
                    <div className="flex items-end gap-4">
                        <div className="relative  rounded-md overflow-hidden   border-white/10 ">
                            <Link to={`/title/${slide.id}`}>
                                <img
                                    src={slide.posterUrl}
                                    alt={slide.title}
                                    className="w-40 h-full object-cover"
                                />
                            </Link>
                            <Link to='/registration/sign-in'>
                                <div className="absolute top-0 left-0">
                                    <svg
                                        className="fill-[#12121275] stroke-white stroke-[0.08] absolute top-0 z-50"
                                        width="44"
                                        height="64"
                                        viewBox="0 0 24 34"
                                    >
                                        <polygon points="24 0 0 0 0 32 12.24 26.29 24 31.77" />
                                    </svg>
                                    <svg
                                        className="fill-white absolute top-2 left-0 z-60 translate-x-1.5"
                                        width="28"
                                        height="32"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                        <div className='flex flex-col md:flex-row gap-3 items-start md:items-center md:pb-5'>
                            <div className='w-12 md:w-24 '>
                                <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-[#F5C518]" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-end gap-10">
                                    <h2 className="text-base md:text-2xl lg:text-3xl drop-shadow-sm line-clamp-2">
                                        {slide.title}
                                    </h2>
                                    <p className='text-lg text-[#FFFFFFB3] drop-shadow-md flex items-end'>
                                        {slide.trailerDuration}
                                    </p>
                                </div>
                                <p className="text-[#FFFFFFB3] text-lg">Watch the Trailer</p>

                                <span className="flex items-center text-[#FFFFFFB3] gap-3 ">
                                    <span className=" flex text-sm items-center gap-1" onClick={() => handleLike()} >

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M13.12 2.06c.58-.59 1.52-.59 2.11-.01.36.36.51.87.41 1.37L14.69 8h5.65c2.15 0 3.6 2.2 2.76 4.18l-3.26 7.61C19.52 20.52 18.8 21 18 21H9c-1.1 0-2-.9-2-2V9.01c0-.53.21-1.04.58-1.41l5.54-5.54zM9.293 8.707A1 1 0 0 0 9 9.414V18a1 1 0 0 0 1 1h7.332a1 1 0 0 0 .924-.617c1.663-4.014 2.527-6.142 2.594-6.383.07-.253.12-.587.15-1v-.002A1 1 0 0 0 20 10h-8l1.34-5.34-4.047 4.047zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z"></path></svg>

                                        {formatNumber(slide.likeCount)}

                                    </span>
                                    <span className="flex items-center gap-1" >
                                        <span className="relative">
                                            <FaHeart className="text-pink-800  absolute " />
                                            <FaFaceGrinStars className="text-yellow-400 ml-3" />
                                        </span>
                                        {slide.reactions.count}
                                    </span>

                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </Link >
    );
};

export default Slider;
