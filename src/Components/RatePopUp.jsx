import { useState, useContext, useEffect } from "react";
import { dataCntxt } from "../../context/DataContext";
import { updateRateHistory } from "../../service/AuthService";
import { X } from "lucide-react";

const RatePopUp = ({ movie, onClose }) => {
    const { currentUser, setCurrentUser } = useContext(dataCntxt);

    const [ratingExist, setRatingExist] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [loading, setLoading] = useState(false);

    const stars = Array.from({ length: 10 }, (_, i) => i + 1); // 10-star rating

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

    useEffect(() => {
        const existingRating = currentUser?.rateHistory?.find(
            (r) => r.movieId === movie.id
        )?.rating || 0;

        setRating(existingRating);
        setRatingExist(existingRating > 0);
    }, [currentUser, movie]);

    function handleRateStar(value) {
        setRating(value);
    }

    async function handleRate(ratingValue) {
        if (!currentUser) {
            alert("Please sign in to rate.");
            return;
        }

        if (ratingValue === 0) {
            alert("Please select a rating.");
            return;
        }

        setLoading(true);

        // Update local rateHistory array
        const newRateHistory =
            currentUser.rateHistory?.filter((r) => r.movieId !== movie?.id) || [];

        newRateHistory.push({ movieId: movie?.id, rating: ratingValue });

        try {
            const updatedUser = await updateRateHistory(currentUser.id, newRateHistory);

            setCurrentUser((prev) => ({
                ...prev,
                rateHistory: updatedUser.rateHistory,
            }));

            setRating(ratingValue);
            setRatingExist(true);
            setLoading(false);
            onClose(); // Close the popup after rating
        } catch (err) {
            console.error("Failed to update rate history:", err);
            setLoading(false);
        }
    }

    async function handleRemoveRate() {
        if (!currentUser) {
            alert("Please sign in to remove rating.");
            return;
        }
        setLoading(true);

        const newRateHistory =
            currentUser.rateHistory?.filter((r) => r.movieId !== movie?.id) || [];

        try {
            const updatedUser = await updateRateHistory(currentUser.id, newRateHistory);

            setCurrentUser((prev) => ({
                ...prev,
                rateHistory: updatedUser.rateHistory,
            }));

            setRating(0);
            setRatingExist(false);
            setLoading(false);
            onClose(); // Close the popup after removing rating
        } catch (err) {
            console.error("Failed to remove rate:", err);
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50  flex justify-center items-center z-50">
            <div className="flex flex-col justify-end items-end">
                <button
                    onClick={onClose}
                    className="cursor-pointer outline-none text-white hover:bg-white/10 p-3 rounded-full transition-colors"
                >
                    <X size={22} />
                </button>
                <div className="bg-[#1f1f1f] flex flex-col items-center justify-center rounded-sm p-6 h-[300px] relative w-160">
                    <p className="absolute text-white font-medium -top-1/18 z-40">
                        {hoverRating || rating || '?'}
                    </p>

                    <div className={`absolute -top-1/7 ${loading ? 'scale-110' : ''}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="85"
                            height="81"
                            viewBox="0 0 85 81"
                            fill="currentColor"
                            role="presentation"
                            className="fill-[#5799ef] "
                        >
                            <path d="M29.4278383,26.4913549 L2.77970363,28.6432143 L2.63541119,28.6580541 C0.066865676,28.979767 -0.941953299,32.2222005 1.05754936,33.9345403 L21.3502824,51.3123553 L15.1650027,77.2797478 L15.1355051,77.4163845 C14.6437005,79.9569202 
                                  17.4230421,81.9201545 19.6736611,80.5499671 L42.5,66.6529451 L65.3263389,80.5499671 L65.447392,80.6201968
                                  C67.7156822,81.8722123 70.4448402,79.8400226 69.8349973,77.2797478 L63.6489629,51.3123553 L83.9424506,33.9345403 L84.0504483,33.8378644 C85.9390285,32.0703808 84.8461128,28.855226
                                   82.2202964,28.6432143 L55.571407,26.4913549 L45.2865041,1.85440279 C44.2543406,-0.618134262 40.7456594,-0.618134262 39.7134959,1.85440279 L29.4278383,26.4913549 Z"></path>
                        </svg>
                    </div>

                    <h2 className="text-yellow-500 text-sm mb-4 text-center">RATE THIS</h2>
                    <h3 className="text-white text-center text-lg font-medium mb-4">{movie?.title}</h3>

                    <div className="flex justify-center items-center gap-1 mb-4">
                        {stars.map((star) => (
                            <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-8 h-8 cursor-pointer ${star <= (hoverRating || rating) ? "fill-[#5799ef]" : "fill-gray-600"}`}
                                viewBox="0 0 20 20"
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => handleRateStar(star)}
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.957z" />
                            </svg>
                        ))}
                    </div>


                    {!ratingExist ? (
                        <button
                            onClick={() => handleRate(rating)}
                            disabled={loading || rating === 0}
                            className=" rounded-full w-1/2 disabled:bg-white/10 bg-yellow-500 cursor-pointer text-white font-bold py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Rate
                        </button>
                    ) : (
                        <div className="flex flex-col gap-3 w-1/2">
                            <button
                                onClick={() => handleRate(rating)}
                                disabled={loading || rating === 0}
                                className="flex-1 rounded-full disabled:bg-white/10 bg-yellow-500 cursor-pointer text-white font-bold py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Rate
                            </button>
                            <button
                                onClick={handleRemoveRate}
                                disabled={loading}
                                className="flex-1 rounded-full text-[#5799ef] cursor-pointer hover:bg-[#5799ef]/10 font-bold py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Remove rating
                            </button>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default RatePopUp;
