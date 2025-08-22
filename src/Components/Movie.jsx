import { Link } from "react-router-dom"
import Post from "./Post"
import { useNavigate } from "react-router-dom"
import { updateWatchList } from "../../service/AuthService"
import { useState, useEffect, useContext } from "react"
import { dataCntxt } from "../../context/DataContext"
import RoundedLoader from './CircularBubblesLoader'

const Movie = ({ movie, onOpenRate }) => {
    const [watchlist, setWatchList] = useState(false)
    const [userExist, setUserExist] = useState(false)
    const { currentUser, setCurrentUser } = useContext(dataCntxt)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!movie) return;
        if (localStorage.getItem('user') && currentUser) {
            setUserExist(true);
            setWatchList(currentUser?.watchList?.some(m => m.id === movie.id));
        } else {
            setUserExist(false);
        }
    }, [movie, currentUser]);

    async function handleWatchList(userId, movie) {
        if (!userExist) {
            navigate('/registration/signin');
            return;
        }

        setLoading(true);

        let newWatchList;
        if (watchlist) {
            newWatchList = currentUser.watchList.filter(m => m.id !== movie.id);
        } else {
            newWatchList = [...currentUser.watchList, movie];
        }

        try {
            const updatedUser = await updateWatchList(userId, newWatchList);
            console.log("Watchlist updated:", updatedUser.watchList);

            setWatchList(prev => !prev);
            setCurrentUser(prev => ({
                ...prev,
                watchList: updatedUser.watchList
            }));

        } catch (err) {
            console.error("Failed to update watchlist:", err);
        } finally {
            setLoading(false);
        }
    }

    function handleRate() {
        if (currentUser) {
            onOpenRate(movie); // Pass movie to parent
        } else {
            navigate('/registration/signin');
        }
    }

    return (
        <div>
            <div className="flex flex-col bg-[#000000de] w-full rounded-b-xl rounded-tr-2xl">
                <Post movie={movie} />
                <div className="p-2 flex flex-col items-start gap-1 ">
                    <span className="flex gap-1 text-[#FFFFFFB3] text-md items-center">
                        <svg className='fill-[#F5C518]' width="14" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                        <p>{movie.rating}</p>
                        <button className="cursor-pointer mx-2 flex gap-1" onClick={() => handleRate()}>
                            {currentUser?.rateHistory?.find(item => item.movieId === movie?.id)?
                        <svg className='fill-[#5799ef]' width="14" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                           : <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" className="fill-[#5799EF]" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z"></path></svg>
                            }
                           <p className="font-bold"> {currentUser?.rateHistory?.find(item => item.movieId === movie?.id)?.rating || ''}</p>
                        </button>
                    </span>
                    <h2 className="text-[16px] hover:underline text-white text-left font-semibold line-clamp-2 my-2 h-12">{movie.title}</h2>
                    <button onClick={() => handleWatchList(currentUser?.id, movie)} className="rounded-4xl cursor-pointer bg-[#30353C] py-2 my-2 w-full flex gap-1 justify-center items-center text-[#5799EF]">
                        {watchlist ?
                            (loading ? <div><RoundedLoader /></div> : <svg xmlns="http://www.w3.org/2000/svg" width="20" className="fill-[#5799ef]" viewBox="0 0 20 20" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.2l-3.5-3.5a.984.984 0 0 0-1.4 0 .984.984 0 0 0 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 0 0 0-1.4.984.984 0 0 0-1.4 0L9 16.2z"></path></svg>)
                            : (loading ? <div><RoundedLoader /></div> : <svg className="fill-[#5799EF]" width="20" viewBox="0 0 20 20" fill="currentColor"><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" /></svg>)}
                        <span className="text-sm font-bold">Watchlist</span>
                    </button>
                    <Link className="flex items-center justify-center w-full py-2" to={`/video/${movie.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" role="presentation"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"></path></svg>
                        <p className="text-sm font-bold text-white">Trailer</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Movie