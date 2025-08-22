import { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { dataCntxt } from "../../context/DataContext"
import { updateWatchList } from "../../service/AuthService"
import RoundedLoader from "./CircularBubblesLoader"
const Post = ({ movie }) => {
    const [watchlist, setWatchList] = useState(false)
    const [url, setUrl] = useState('title')
    const [params, setParams] = useState('')
    const [userExist, setUserExist] = useState(false)
    const { currentUser ,setCurrentUser} = useContext(dataCntxt)
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate()
   useEffect(() => {
    if (!movie) return;
    if (localStorage.getItem('user') && currentUser) {
        setUserExist(true);
        setWatchList(currentUser.watchList.some(m => m.id === movie.id));
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
        // Update in backend
        const updatedUser = await updateWatchList(userId, newWatchList);
        console.log("Watchlist updated:", updatedUser.watchList);

        // Update context
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

    return (
        <div>
            <div className="relative   overflow-hidden   border-white/10 ">
                <Link to={`/${url}/${movie.id}/${params}`}>
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-lg rounded-tl-0 hover:brightness-90"
                    />
                </Link>

                <div onClick={() => handleWatchList(currentUser?.id, movie)} className="absolute top-0 left-0 cursor-pointer">
                    <svg
                        className={`${watchlist ? 'fill-[#F5C518]' : 'fill-[#1f1f1fb6] stroke-[#444343]'} stroke-[0.8] absolute top-0 left-0 `}
                        width="48px" height="68px" viewBox="0 0 32 45.3"
                    >
                        <polygon points="24 0 0 0 0 32 12.24 26.29 24 31.77" />
                    </svg>
                    {watchlist ?
                        (loading? <div className="absolute top-1 left-1"><RoundedLoader/></div>:<svg xmlns="http://www.w3.org/2000/svg" width="24" className="fill-black absolute left-1 z-10 top-1"
                            height="28"
                            viewBox="0 0 20 20" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9 16.2l-3.5-3.5a.984.984 0 0 0-1.4 0 .984.984 0 0 0 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 0 0 0-1.4.984.984 0 0 0-1.4 0L9 16.2z"></path></svg>)
                        : (loading ?<div className="absolute top-1 left-1"><RoundedLoader/></div>:<svg
                            className="fill-white absolute left-1 z-10 top-1"
                            width="24"
                            height="28"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                        </svg>)}
                </div>

            </div>
        </div>
    )
}

export default Post