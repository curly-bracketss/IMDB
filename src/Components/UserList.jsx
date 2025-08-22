import { dataCntxt } from "../../context/DataContext"
import { useContext, useState, useMemo } from "react"
import Film from "./Film"
import Detpos from "./Detpos"
import Loader from "./Loader"
import { useParams } from "react-router-dom"

const UserList = () => {
    const { currentUser } = useContext(dataCntxt);
    const { listType } = useParams();

    const { movieData, swiperData } = useContext(dataCntxt)
    const combinedData = [...(movieData || []), ...(swiperData || [])];

    // Remove duplicates from combinedData
    const fullData = combinedData.filter(
        (item, index, self) => index === self.findIndex(movie => movie.id === item.id)
    );

    let filteredData = [];

    if (listType === 'rateHistory') {
        const rateHistory = currentUser?.rateHistory || [];

        filteredData = rateHistory
            .map(({ movieId, rating }) => {
                const movie = fullData.find(item => item.id === movieId);
                if (movie) return { ...movie, rating }; // attach rating to the movie
                return null;
            })
            .filter(Boolean); // remove nulls if movie not found
    }

    console.log(filteredData);
    const baseData = listType === 'rateHistory' ? filteredData : currentUser?.[listType] || [];

    const [activeStructure, setActiveStructure] = useState("detailed");
    const [activeOrder, setActiveOrder] = useState("ascending");
    const [activeSort, setActiveSort] = useState("Ranking");
    const [border, setBorder] = useState(false);
    const [loading, setLoading] = useState(false);

    function durationToMinutes(duration) {
        if (!duration) return 0;
        const hoursMatch = duration.match(/(\d+)h/);
        const minsMatch = duration.match(/(\d+)m/);

        const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
        const mins = minsMatch ? parseInt(minsMatch[1], 10) : 0;

        return hours * 60 + mins;
    }

    // Centralized sorting function
    function sortData(data, sortType, order) {
        const sortedData = [...data]; // Create a copy to avoid mutating original

        switch (sortType) {
            case 'Date added':
            case 'List order':
                // For these, we maintain the original order or reverse it
                if (order === 'descending') {
                    return sortedData.reverse();
                }
                return sortedData;

            case 'Your rating':
                return sortedData.sort((a, b) => {
                    // For rateHistory, the rating is already attached to the movie object
                    let ratingA, ratingB;
                    
                    if (listType === 'rateHistory') {
                        ratingA = a.rating || -1;
                        ratingB = b.rating || -1;
                    } else {
                        // For other lists, look up the rating from rateHistory
                        const ratingMap = new Map(currentUser?.rateHistory?.map(r => [r.movieId, r.rating]) || []);
                        ratingA = ratingMap.get(a.id) ?? -1;
                        ratingB = ratingMap.get(b.id) ?? -1;
                    }

                    return order === 'ascending' ? ratingA - ratingB : ratingB - ratingA;
                });

            case 'Release date':
                return sortedData.sort((a, b) => {
                    const yearA = parseInt(a.year, 10) || 0;
                    const yearB = parseInt(b.year, 10) || 0;
                    return order === "ascending" ? yearA - yearB : yearB - yearA;
                });

            case 'Ranking':
            case 'IMDb rating':
                return sortedData.sort((a, b) => {
                    const ratingA = parseFloat(a.rating) || 0;
                    const ratingB = parseFloat(b.rating) || 0;
                    return order === "ascending" ? ratingA - ratingB : ratingB - ratingA;
                });

            case 'Alphabetical':
                return sortedData.sort((a, b) => {
                    const titleA = a.title || '';
                    const titleB = b.title || '';
                    return order === "ascending" 
                        ? titleA.localeCompare(titleB) 
                        : titleB.localeCompare(titleA);
                });

            case 'Runtime':
                return sortedData.sort((a, b) => {
                    const durationA = durationToMinutes(a.duration);
                    const durationB = durationToMinutes(b.duration);
                    return order === "ascending" 
                        ? durationA - durationB 
                        : durationB - durationA;
                });

            case 'Popularity':
                // Assuming higher popularity number means more popular
                return sortedData.sort((a, b) => {
                    const popA = parseFloat(a.popularity) || 0;
                    const popB = parseFloat(b.popularity) || 0;
                    return order === "ascending" ? popA - popB : popB - popA;
                });

            case 'Number of ratings':
                // Assuming there's a field for number of ratings
                return sortedData.sort((a, b) => {
                    const numA = parseFloat(a.numRatings || a.vote_count) || 0;
                    const numB = parseFloat(b.numRatings || b.vote_count) || 0;
                    return order === "ascending" ? numA - numB : numB - numA;
                });

            default:
                return sortedData;
        }
    }

    // Get sorted data using useMemo for performance
    const data = useMemo(() => {
        return sortData(baseData, activeSort, activeOrder);
    }, [baseData, activeSort, activeOrder, currentUser?.rateHistory, listType]);

    function toggleOrdering() {
        const newOrder = activeOrder === "ascending" ? "descending" : "ascending";
        setActiveOrder(newOrder);
    }

    function handleSort(e) {
        const sortType = e.target.value;
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
        
        setActiveSort(sortType);
    }

    return (
        <div className='w-full lg:w-[calc(67.6%-1rem)] relative '>
            <div className=" flex flex-col gap-10">

                <div className="flex flex-col gap-2">

                    <div className="flex justify-between w-full items-center">
                        <p>{data?.length} titles</p>

                        <div className=" flex ">
                            <div className="flex items-center justify-end ">
                                <p className="pr-2">Sort by  </p>
                                <span className={`rounded-lg relative overflow-hidden p-2 items-center flex cursor-pointer text-[#0e63be]  h-[2.25rem] border-dashed  border-1  hover:bg-[#0e63be]/10 outline-none ${border ? 'border-[#0e63be]' : 'border-transparent'} `}>
                                    <label className="cursor-pointer">{activeSort}</label>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"></path></svg>
                                    <select onChange={(e) => handleSort(e)}
                                        value={activeSort}
                                        onFocus={() => setBorder(true)}
                                        onBlur={() => setBorder(false)}
                                        className=" absolute left-2 cursor-pointer h-full opacity-0 w-full">

                                        <option value="List order" className="bg-[#eee] text-black ">List order</option>
                                        <option value="Ranking" className="bg-[#eee] text-black ">Ranking</option>
                                        <option value="IMDb rating" className="bg-[#eee] text-black ">IMDb rating</option>
                                        <option value="Release date" className="bg-[#eee] text-black ">Release date</option>
                                        <option value="Number of ratings" className="bg-[#eee] text-black ">Number of ratings</option>
                                        <option value="Alphabetical" className="bg-[#eee] text-black ">Alphabetical</option>
                                        <option value="Popularity" className="bg-[#eee] text-black ">Popularity</option>
                                        <option value="Runtime" className="bg-[#eee] text-black ">Runtime</option>
                                        <option value="Date added" className="bg-[#eee] text-black ">Date added</option>
                                        <option value="Your rating" className="bg-[#eee] text-black ">Your rating</option>

                                    </select>
                                </span>
                                <button onClick={toggleOrdering} className='rounded-full flex items-center justify-center h-12 w-12 cursor-pointer  hover:bg-[#0e63be]/10'>
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className={`${activeOrder === 'ascending' ? '' : 'rotate-180'}  fill-[#0e63be]`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 22a.968.968 0 01-.713-.288A.967.967 0 0111 21V5.825L7.1 9.7a.977.977 0 01-.688.288A.93.93 0 015.7 9.7a.948.948 0 01-.275-.7c0-.283.092-.517.275-.7l5.6-5.6c.1-.1.208-.17.325-.212.117-.042.242-.063.375-.063s.258.02.375.063a.877.877 0 01.325.212l5.6 5.6a.933.933 0 01.275.688c0 .275-.092.512-.275.712-.2.2-.438.3-.713.3a.973.973 0 01-.712-.3L13 5.825V21c0 .283-.096.52-.287.712A.968.968 0 0112 22z"></path></svg>
                                </button>
                            </div>
                            <div className=" flex ">

                                <button onClick={() => setActiveStructure("detailed")} className={` rounded-full flex items-center justify-center h-12 w-12 cursor-pointer ${activeStructure === "detailed" ? ' hover:bg-[#0e63be]/10  border-[#0e63be]  border-1 ' : 'hover:bg-[#0000008a]/10'}`}>
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className={`${activeStructure === 'detailed' ? 'fill-[#0e63be]' : 'fill-[#0000008a]'}`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M1.5 13.5c.825 0 1.5-.675 1.5-1.5s-.675-1.5-1.5-1.5S0 11.175 0 12s.675 1.5 1.5 1.5zm0 5c.825 0 1.5-.675 1.5-1.5s-.675-1.5-1.5-1.5S0 16.175 0 17s.675 1.5 1.5 1.5zm0-10C2.325 8.5 3 7.825 3 7s-.675-1.5-1.5-1.5S0 6.175 0 7s.675 1.5 1.5 1.5zm4.857 5h16.286c.746 0 1.357-.675 1.357-1.5s-.61-1.5-1.357-1.5H6.357C5.611 10.5 5 11.175 5 12s.61 1.5 1.357 1.5zm0 5h16.286c.746 0 1.357-.675 1.357-1.5s-.61-1.5-1.357-1.5H6.357C5.611 15.5 5 16.175 5 17s.61 1.5 1.357 1.5zM5 7c0 .825.61 1.5 1.357 1.5h16.286C23.389 8.5 24 7.825 24 7s-.61-1.5-1.357-1.5H6.357C5.611 5.5 5 6.175 5 7zm-3.5 6.5c.825 0 1.5-.675 1.5-1.5s-.675-1.5-1.5-1.5S0 11.175 0 12s.675 1.5 1.5 1.5zm0 5c.825 0 1.5-.675 1.5-1.5s-.675-1.5-1.5-1.5S0 16.175 0 17s.675 1.5 1.5 1.5zm0-10C2.325 8.5 3 7.825 3 7s-.675-1.5-1.5-1.5S0 6.175 0 7s.675 1.5 1.5 1.5zm4.857 5h16.286c.746 0 1.357-.675 1.357-1.5s-.61-1.5-1.357-1.5H6.357C5.611 10.5 5 11.175 5 12s.61 1.5 1.357 1.5zm0 5h16.286c.746 0 1.357-.675 1.357-1.5s-.61-1.5-1.357-1.5H6.357C5.611 15.5 5 16.175 5 17s.61 1.5 1.357 1.5zM5 7c0 .825.61 1.5 1.357 1.5h16.286C23.389 8.5 24 7.825 24 7s-.61-1.5-1.357-1.5H6.357C5.611 5.5 5 6.175 5 7z"></path></svg>
                                </button>
                                <button onClick={() => setActiveStructure("grid")} className={` rounded-full flex items-center justify-center h-12 w-12 cursor-pointer ${activeStructure === "grid" ? ' hover:bg-[#0e63be]/10  border-[#0e63be]  border-1 ' : 'hover:bg-[#0000008a]/10'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${activeStructure === 'grid' ? 'fill-[#0e63be]' : 'fill-[#0000008a]'}`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M4.8 14h2.4c.44 0 .8-.3.8-.667v-2.666C8 10.3 7.64 10 7.2 10H4.8c-.44 0-.8.3-.8.667v2.666c0 .367.36.667.8.667zm0-6h2.4c.44 0 .8-.3.8-.667V4.667C8 4.3 7.64 4 7.2 4H4.8c-.44 0-.8.3-.8.667v2.666C4 7.7 4.36 8 4.8 8zm0 12h2.4c.44 0 .8-.3.8-.667v-2.666C8 16.3 7.64 16 7.2 16H4.8c-.44 0-.8.3-.8.667v2.666c0 .367.36.667.8.667zm6 0h2.4c.44 0 .8-.3.8-.667v-2.666c0-.367-.36-.667-.8-.667h-2.4c-.44 0-.8.3-.8.667v2.666c0 .367.36.667.8.667zm6 0h2.4c.44 0 .8-.3.8-.667v-2.666c0-.367-.36-.667-.8-.667h-2.4c-.44 0-.8.3-.8.667v2.666c0 .367.36.667.8.667zm-6-6h2.4c.44 0 .8-.3.8-.667v-2.666c0-.367-.36-.667-.8-.667h-2.4c-.44 0-.8.3-.8.667v2.666c0 .367.36.667.8.667zm0-6h2.4c.44 0 .8-.3.8-.667V4.667C14 4.3 13.64 4 13.2 4h-2.4c-.44 0-.8.3-.8.667v2.666c0 .367.36.667.8.667zm5.2 2.667v2.666c0 .367.36.667.8.667h2.4c.44 0 .8-.3.8-.667v-2.666c0-.367-.36-.667-.8-.667h-2.4c-.44 0-.8.3-.8.667zm0-6v2.666c0 .367.36.667.8.667h2.4c.44 0 .8-.3.8-.667V4.667C20 4.3 19.64 4 19.2 4h-2.4c-.44 0-.8.3-.8.667z"></path></svg>
                                </button>
                                <button onClick={() => setActiveStructure("compact")} className={` rounded-full flex items-center justify-center h-12 w-12 cursor-pointer ${activeStructure === "compact" ? ' hover:bg-[#0e63be]/10  border-[#0e63be]  border-1 ' : 'hover:bg-[#0000008a]/10'}`}>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${activeStructure === 'compact' ? 'fill-[#0e63be]' : 'fill-[#0000008a]'}`} viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path></svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>


                {loading ? (
                    <Loader />
                ) : (
                    <div
                        className={`flex ${activeStructure === "grid"
                            ? "flex-row flex-wrap gap-5  border-0"
                            : "flex-col border-1 p-2"
                            } w-full rounded-sm border-black/10`}
                    >
                        {data?.map((movie, index) =>
                            activeStructure === "compact" ? (
                                <Film key={movie.id || index} movie={movie} view={activeStructure} />
                            ) : activeStructure === "grid" ? (
                                <Detpos key={movie.id || index} movie={movie} />
                            ) : (
                                <Film key={movie.id || index} movie={movie} view={activeStructure} />
                            )
                        )}
                    </div>
                )}

            </div>
        </div>

    )
}

export default UserList