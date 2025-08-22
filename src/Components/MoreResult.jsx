import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiLineVerticalBold } from "react-icons/pi";

const filters = [
    "All", "Titles", "Celebs", "TV",
    "TV Episodes", "Music Videos", "Podcasts",
    "Podcast Episodes", "Video Games", "Companies",
    "Keywords", "Quotes", "Plot Summaries", "Biographies", "Interests"
];

export default function MoreResults({ searchTerm, filter, matchType }) {
    const [activeFilter, setActiveFilter] = useState(filter);
    const navigate = useNavigate();

    // Move useEffect here - outside the function
    useEffect(() => {
        setActiveFilter(filter);
    }, [filter]); // Run when filter prop changes

    const handleFilterClick = (selectedFilter) => {
        setActiveFilter(selectedFilter);
        navigate(`/find/${searchTerm}/${selectedFilter}/${matchType}`);
    };

    return (
        <div className="lg:w-1/3 flex flex-col gap-5">
            <div className="group flex items-center relative">
                <PiLineVerticalBold className="text-[#F5C518] text-3xl font-extrabold absolute -left-3" />
                <h2 className="text-3xl font-bold flex items-center pl-3">More results</h2>
            </div>
            <div className="flex min-h-[10vh] flex-wrap gap-2 mb-5">
                {filters.map((filterOption) => (
                    <button
                        key={filterOption}
                        onClick={() => handleFilterClick(filterOption)}
                        className={`px-3 py-1 cursor-pointer rounded-full border ${
                            activeFilter === filterOption
                                ? "bg-[#F5C518] text-white border-[#F5C518]"
                                : "bg-white text-black border-black/20"
                        } hover:bg-[#F5C518] hover:text-white transition`}
                    >
                        {filterOption}
                    </button>
                ))}
            </div>
        </div>
    );
}