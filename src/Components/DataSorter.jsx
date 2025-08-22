import { PiLineVerticalBold } from "react-icons/pi";
import { GrFormNext } from "react-icons/gr";
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MoreResults from "./MoreResult";
import Loader from "./Loader";

export default function DataSorter({ results, searchTerm, filter, matchType }) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const [loading, setLoading] = useState(true);

    const matchesTerm = (text) => {
        return matchType === 'exact'
            ? text?.toLowerCase() === lowerSearchTerm
            : text?.toLowerCase().includes(lowerSearchTerm);
    };

    const matchesArray = (arr) => arr?.some(item => matchesTerm(item));

    const filteredResults = useMemo(() => {
        if (!searchTerm || !results.length) return [];

        return results.filter((item) => {
            switch (filter) {
                case 'Titles':
                    return matchesTerm(item.title);
                case 'Celebs':
                    return matchesTerm(item.director) ||
                        matchesArray(item.writers) ||
                        matchesArray(item.actors) ||
                        matchesArray(item.stars);
                case 'Keywords':
                    return matchesArray(item.genre);
                case 'All':
                    return matchesTerm(item.title) ||
                        matchesTerm(item.director) ||
                        matchesArray(item.writers) ||
                        matchesArray(item.actors) ||
                        matchesArray(item.stars) ||
                        matchesArray(item.genre);
                default:
                    return false;
            }
        });
    }, [results, filter, lowerSearchTerm, searchTerm, matchType]);

    const groupedResults = useMemo(() => {
        if (filter !== "All") return null;

        const groups = { Titles: [], Celebs: [], Keywords: [] };

        filteredResults.forEach((item) => {
            if (matchesTerm(item.title)) groups.Titles.push(item);
            if (
                matchesTerm(item.director) ||
                matchesArray(item.writers) ||
                matchesArray(item.actors) ||
                matchesArray(item.stars)
            ) groups.Celebs.push(item);
            if (matchesArray(item.genre)) groups.Keywords.push(item);
        });

        return groups;
    }, [filteredResults, lowerSearchTerm, matchType]);

    const [groupLimits, setGroupLimits] = useState({});
    const [mainLimit, setMainLimit] = useState(7);

    const hasResults = filteredResults.length > 0;

    const toggleGroupLimit = (groupName, itemsLength) => {
        setGroupLimits(prev => ({
            ...prev,
            [groupName]: itemsLength
        }));
    };

    const toggleMainLimit = () => setMainLimit(filteredResults.length);

    // Reset limits when filter, searchTerm, or matchType changes
    useMemo(() => {
        setGroupLimits({});
        setMainLimit(7);
    }, [filter, searchTerm, matchType]);

    // Fixed loading logic - reset loading when dependencies change, then set to false after filtering
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Reduced from 2000ms to 1000ms for better UX

        return () => clearTimeout(timer);
    }, [searchTerm, filter, matchType]); // Reset loading when search parameters change

    // Show loader while loading
    if (loading) {
        return (
            <div className="max-w-[1280px] mx-auto px-[0.75rem]">
                <h1 className="text-5xl py-10">Search "{searchTerm}"</h1>
                <div className="flex lg:flex-row flex-col justify-between">
                    <div className="flex flex-col gap-5 w-full lg:w-[calc(66.7%-3rem)]">
                        <div className="flex justify-between items-center w-full">
                            <div className="group flex items-center relative">
                                <PiLineVerticalBold className="text-[#F5C518] text-[2rem] font-extrabold absolute -left-3" />
                                <h2 className="text-2xl font-bold flex items-center pl-3">{filter}</h2>
                            </div>
                            <Link
                                to={`/find/${searchTerm}/${filter}/${matchType === 'popular' ? 'exact' : 'popular'}`}
                                className="flex items-center cursor-pointer hover:bg-[#00000012] px-2 py-1 rounded-full"
                            >
                                <p className="text-black/50">
                                    {matchType === 'popular' ? 'Exact matches' : 'Most popular matches'}
                                </p>
                                <GrFormNext className="text-black/50 text-3xl" />
                            </Link>
                        </div>
                        <div className="flex justify-center items-center py-20">
                            <Loader />
                        </div>
                    </div>
                    <MoreResults searchTerm={searchTerm} filter={filter} matchType={matchType} />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1280px] mx-auto px-[0.75rem]">
            <h1 className="text-5xl py-10">Search "{searchTerm}"</h1>
            <div className="flex lg:flex-row flex-col justify-between">
                <div className="flex flex-col gap-5 w-full lg:w-[calc(66.7%-3rem)]">
                    <div className="flex justify-between items-center w-full">
                        <div className="group flex items-center relative">
                            <PiLineVerticalBold className="text-[#F5C518] text-[2rem] font-extrabold absolute -left-3" />
                            <h2 className="text-2xl font-bold flex items-center pl-3">{filter}</h2>
                        </div>

                        <Link
                            to={`/find/${searchTerm}/${filter}/${matchType === 'popular' ? 'exact' : 'popular'}`}
                            className="flex items-center cursor-pointer hover:bg-[#00000012] px-2 py-1 rounded-full"
                        >
                            <p className="text-black/50">
                                {matchType === 'popular' ? 'Exact matches' : 'Most popular matches'}
                            </p>
                            <GrFormNext className="text-black/50 text-3xl" />
                        </Link>
                    </div>

                    {filter === "All" ? (
                        groupedResults && Object.values(groupedResults).some(g => g.length > 0) ? (
                            Object.entries(groupedResults).map(([groupName, items]) =>
                                items.length > 0 ? (
                                    <div key={groupName} className="w-full">
                                        <h3 className="text-xl font-semibold mb-3">
                                            {groupName} ({items.length})
                                        </h3>
                                        <div className="flex flex-col rounded-sm w-full border border-black/10 p-2">
                                            {items.slice(0, groupLimits[groupName] || 7).map((item, index) => (
                                                <Link
                                                    to={`/title/${item.id}`}
                                                    key={item.id || index}
                                                    className="p-2 gap-2 flex hover:bg-white/10 cursor-pointer border-b border-black/10"
                                                >
                                                    <img
                                                        src={item.posterUrl}
                                                        className="rounded-xl w-12"
                                                        alt={item.title || "Poster"}
                                                        loading="lazy"
                                                    />
                                                    <div>
                                                        <h4 className="mb-1 hover:text-[#0000008a] font-bold">{item.title}</h4>
                                                        <div className="text-sm text-[#0000008a] flex flex-col">
                                                            {item.year && <span>{item.year}</span>}
                                                            <span className="flex text-[#0000008a]">
                                                                {(item.actors || []).slice(0, 3).map((a, idx) => (
                                                                    <span key={idx}>
                                                                        {a}
                                                                        {idx !== Math.min((item.actors || []).length - 1, 2) ? ", " : ""}
                                                                    </span>
                                                                ))}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                            {items.length > 7 && (groupLimits[groupName] || 7) === 7 && (
                                                <button
                                                    onClick={() => toggleGroupLimit(groupName, items.length)}
                                                    className="cursor-pointer text-[#0e63be] w-55 justify-center my-5 hover:bg-[#0e63be]/10 rounded-full flex items-center font-bold p-2"
                                                >
                                                    {matchType === 'exact' ? 'More exact matches' : 'More popular matches'}
                                                    <GrFormNext className="text-2xl rotate-90" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : null
                            )
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-lg">
                                    No {matchType === 'exact' ? 'exact' : 'popular'} matches found for "{searchTerm}"
                                </p>
                                <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms</p>
                            </div>
                        )
                    ) : hasResults ? (
                        <div className="w-full">
                            <div className="mb-2 text-sm text-gray-600">
                                {filteredResults.length} {matchType === 'exact' ? 'exact' : 'popular'} result{filteredResults.length !== 1 ? "s" : ""} found
                            </div>
                            <div className="flex flex-col rounded-sm w-full border border-black/10 p-2">
                                {filteredResults.slice(0, mainLimit).map((item, index) => (
                                    <Link
                                        to={`/title/${item.id}`}
                                        key={item.id || index}
                                        className="p-2 gap-2 flex hover:bg-white/10 cursor-pointer border-b border-black/10"
                                    >
                                        <img
                                            src={item.posterUrl}
                                            className="rounded-xl w-12"
                                            alt={item.title || "Poster"}
                                            loading="lazy"
                                        />
                                        <div>
                                            <h3 className="mb-1 hover:text-[#0000008a] font-bold">{item.title}</h3>
                                            <div className="text-sm text-[#0000008a] flex flex-col">
                                                {item.year && <span>{item.year}</span>}
                                                <span className="flex text-[#0000008a]">
                                                    {(item.actors || []).slice(0, 3).map((a, idx) => (
                                                        <span key={idx}>
                                                            {a}
                                                            {idx !== Math.min((item.actors || []).length - 1, 2) ? ", " : ""}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                {filteredResults.length > 7 && mainLimit <= 7 && (
                                    <button
                                        onClick={toggleMainLimit}
                                        className="cursor-pointer w-55 my-5 justify-center text-[#0e63be] hover:bg-[#0e63be]/10 rounded-full flex items-center font-bold p-2"
                                    >
                                        {matchType === 'exact' ? 'More exact matches' : 'More popular matches'}
                                        <GrFormNext className="text-2xl rotate-90" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-lg">
                                No {matchType === 'exact' ? 'exact' : 'popular'} matches found for "{searchTerm}"
                            </p>
                            <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms</p>
                        </div>
                    )}
                </div>
                <MoreResults searchTerm={searchTerm} filter={filter} matchType={matchType} />
            </div>
        </div>
    );
}