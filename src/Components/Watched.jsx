import { useState, useContext, useEffect } from "react";
import { dataCntxt } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { updateWatchHistory } from "../../service/AuthService";
import RoundedLoader from "./CircularBubblesLoader";
import { FaLessThanEqual } from "react-icons/fa6";

const Watched = ({ movie, compact = false }) => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(dataCntxt);
    const [padding, setPadding] = useState(false)
    const [watchHistory, setWatchHistory] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ Helper for consistent IDs
    const getMovieId = (m) => m?.id || m?.imdbID || m?.movieId || m?._id;
    const movieId = getMovieId(movie);
    useEffect(()=>{
        window.location.href.includes('chart')?setPadding(false):setPadding(true)
    },[])
    // 🔒 Guard if movie missing
    if (!movieId) {
        return (
            <button
                disabled
                className="rounded-full bg-gray-300 cursor-not-allowed w-full p-2 flex gap-1 items-center opacity-50"
            >
                <EyeIcon />
                <span>Invalid Movie</span>
            </button>
        );
    }

    // ✅ Detect if already watched
    useEffect(() => {
        if (currentUser?.watchHistory) {
            const isWatched = currentUser.watchHistory.some(
                (m) => getMovieId(m) === movieId
            );
            setWatchHistory(isWatched);
        } else {
            setWatchHistory(false);
        }
    }, [currentUser, movieId]);

    // ✅ Toggle watch history
    async function handleWatchHistory() {
        if (!currentUser) {
            navigate("/registration/signin");
            return;
        }

        setLoading(true);
        try {
            let newWatchHistory;
            if (watchHistory) {
                // Remove
                newWatchHistory = currentUser.watchHistory.filter(
                    (m) => getMovieId(m) !== movieId
                );
            } else {
                // Add
                newWatchHistory = [...(currentUser.watchHistory || []), movie];
            }

            const updatedUser = await updateWatchHistory(currentUser.id, newWatchHistory);

            setCurrentUser((prev) => ({
                ...prev,
                watchHistory: updatedUser.watchHistory,
            }));

            localStorage.setItem(
                "user",
                JSON.stringify({ ...currentUser, watchHistory: updatedUser.watchHistory })
            );

            setWatchHistory(!watchHistory);
        } catch (err) {
            console.error("Failed to update watchHistory:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleWatchHistory}
            className={`rounded-full bg-[#ffffffb3]/10 cursor-pointer w-full ${!padding ? "p-2" : "p-4"
                } flex gap-1 items-center ${!padding ?'justify-center' :''}`}
            disabled={loading}
        >
            {loading ? (
                <RoundedLoader />
            ) : watchHistory ? (
                <CheckedIcon />
            ) : (
                <EyeIcon />
            )}
            <span>{watchHistory ? "Watched" : "Mark as watched"}</span>
        </button>
    );
};

// ✅ Extracted Icons
const EyeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        role="presentation"
    >
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"></path>
    </svg>
);

const CheckedIcon = () => (
     <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            
            height="22"
            viewBox="0 0 20 20"
            fill="currentColor"
            role="presentation"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M9 16.2l-3.5-3.5a.984.984 0 0 0-1.4 0 .984.984 0 0 0 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 0 0 0-1.4.984.984 0 0 0-1.4 0L9 16.2z"></path>
          </svg>
);

export default Watched;
