import { HiLightBulb } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const UpNext = ({ slide }) => {
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
        <div className="flex gap-4 text-white py-3 xl:py-4 max-w-2xl">
            <div className="relative w-16 xl:w-20  flex-shrink-0 rounded overflow-hidden bg-black">

                <img
                    src={slide.posterUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>
            <Link to={`/video/${slide.id}`}>
                <div className="flex flex-col justify-between  cursor-pointer group">
                    <div className="w-16 gap-1 flex items-end">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className=" text-white group-hover:fill-[#F5C518]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            role="presentation"
                        >
                            <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                            <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                        </svg>
                        <div className="text-sm  text-[#FFFFFFB3]">
                            {slide.trailerDuration}
                        </div>

                    </div>
                    <div>

                        <h4 className="text-md leading-tight w-64 line-clamp-2">
                            {slide.title}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                            Watch the Trailer
                        </p>
                    </div>

                    <span className="flex items-center text-[#FFFFFFB3] gap-3 text-sm">
                        <span className=" flex  items-center gap-1" onClick={() => handleLike()} >

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M13.12 2.06c.58-.59 1.52-.59 2.11-.01.36.36.51.87.41 1.37L14.69 8h5.65c2.15 0 3.6 2.2 2.76 4.18l-3.26 7.61C19.52 20.52 18.8 21 18 21H9c-1.1 0-2-.9-2-2V9.01c0-.53.21-1.04.58-1.41l5.54-5.54zM9.293 8.707A1 1 0 0 0 9 9.414V18a1 1 0 0 0 1 1h7.332a1 1 0 0 0 .924-.617c1.663-4.014 2.527-6.142 2.594-6.383.07-.253.12-.587.15-1v-.002A1 1 0 0 0 20 10h-8l1.34-5.34-4.047 4.047zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z"></path></svg>

                            {formatNumber(slide.likeCount)}

                        </span>
                        <span className="flex items-center gap-1" >
                            <span className="relative">
                                <FaHeart className="text-pink-800  absolute bottom-0 " />
                                <HiLightBulb className="text-[#F5C518] ml-2 text-[18px]" />
                            </span>
                            {slide.reactions.count}
                        </span>

                    </span>
                </div>
            </Link>

        </div >
    );
};

export default UpNext;