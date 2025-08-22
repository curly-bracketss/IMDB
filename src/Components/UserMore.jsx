import { PiLineVerticalBold } from "react-icons/pi"
import { dataCntxt } from "../../context/DataContext"
import { useContext } from "react"
import { Link } from "react-router-dom"
import NoImg from '../assets/icons/NoImg.svg'
const UserMore = () => {
    const { currentUser } = useContext(dataCntxt)
    const { movieData, swiperData } = useContext(dataCntxt)
    const combinedData = [...(movieData || []), ...(swiperData || [])]
    const data = combinedData.filter((item, index, self) =>
        index === self.findIndex(movie => movie.id === item.id)
    )
    const lastRatedId = currentUser?.rateHistory?.[currentUser?.rateHistory.length - 1]?.movieId;
    const lastRateImg = data?.find(item => item.id === lastRatedId)?.posterUrl;
     const lastWatchHistoryImg = currentUser?.watchHistory?.[currentUser?.watchHistory.length - 1]?.posterUrl;
     const lastWatchListImg = currentUser?.watchList?.[currentUser?.watchList.length - 1]?.posterUrl
    return (

        <div className='flex flex-col gap-5  w-full  lg:bg-transparent py-5 lg:py-5 lg:w-[calc(33.3%-3rem)]'>
            <div className="relative">
                <PiLineVerticalBold className='text-[#F5C518] text-3xl font-extrabold absolute -left-5 bottom-0' />
                <h2 className="pl-1 font-semibold text-3xl">More to explore</h2>
            </div>
            <div className="flex flex-col gap-2">
                <Link to={`/user/ur${currentUser?.id}/rateHistory`}className="rounded-2xl flex justify-between border-1 border-[#00000027] p-1 ">
                    <div className="p-3 flex flex-col justify-between">
                        <p className="group-hover:underline">Your ratings</p>
                        <p className="text-[0.8rem] text-[#000000b3]">{currentUser?.rateHistory?.length} titles</p>
                    </div>
                    <img src={lastRateImg || NoImg} className="w-16 rounded-2xl  group-hover:opacity-80" />
                </Link>
                <Link to={`/user/ur${currentUser?.id}/watchList`}  className="rounded-2xl flex justify-between border-1 border-[#00000027] p-1 ">
                    <div className="p-3 flex flex-col justify-between">
                        <p className="group-hover:underline">Your Watchlist</p>
                        <p className="text-[0.8rem] text-[#000000b3]">{currentUser?.watchList?.length} titles</p>
                    </div>
                    <img src={lastWatchListImg || NoImg} className="w-16 rounded-2xl  group-hover:opacity-80" />
                </Link>
                <Link to={`/user/ur${currentUser?.id}/watchHistory`} className="rounded-2xl flex justify-between border-1 border-[#00000027] p-1 ">
                    <div className="p-3 flex flex-col justify-between">
                        <p className="group-hover:underline">Your watch history</p>
                        <p className="text-[0.8rem] text-[#000000b3]">{currentUser?.watchHistory?.length} titles</p>
                    </div>
                    <img src={lastWatchHistoryImg || NoImg} className="w-16 rounded-2xl group-hover:opacity-80" />
                </Link>
            </div>
        </div>

    )
}

export default UserMore