import { useState, useRef, useEffect, useContext } from "react";
import Filter from './Filter'
import Loader from "../Loader";
import { dataCntxt } from "../../../context/DataContext";
import { Link } from 'react-router-dom'

const Search = () => {
    const { movieData, swiperData } = useContext(dataCntxt)
    const combinedData = [...(movieData || []), ...(swiperData || [])]
    const data = combinedData.filter((item, index, self) =>
        index === self.findIndex(movie => movie.id === item.id)
    )
    const [currentFilter, setCurrentFilter] = useState('All')
    const [searchResults, setSearchResults] = useState([])
    const [currentSearchTerm, setCurrentSearchTerm] = useState('')

    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null)
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const [Open, setOpen] = useState(false)
    const inpRef = useRef(null)

    const performSearch = (searchTerm, filter) => {
        if (searchTerm === '') {
            setSearchResults([])
            setOpen(false)
            return
        }

        setLoading(true)
        setOpen(true)

        setTimeout(() => {
            const lowerSearchTerm = searchTerm.toLowerCase()
            let filteredData = []

            if (filter === 'All') {
                filteredData = data.filter(item => {
                    const titleMatch = item.title?.toLowerCase().includes(lowerSearchTerm)
                    const directorMatch = item.director?.toLowerCase().includes(lowerSearchTerm)
                    const genreMatch = item.genre?.some(g => g.toLowerCase().includes(lowerSearchTerm))
                    const writersMatch = item.writers?.some(writer => writer.toLowerCase().includes(lowerSearchTerm))
                    const actorsMatch = item.actors?.some(actor => actor.toLowerCase().includes(lowerSearchTerm))
                    const starsMatch = item.stars?.some(star => star.toLowerCase().includes(lowerSearchTerm))
                    const descriptionMatch = item.description?.toLowerCase().includes(lowerSearchTerm)

                    return titleMatch || directorMatch || genreMatch || writersMatch || descriptionMatch || starsMatch || actorsMatch
                })
            }
            else if (filter === 'Titles') {
                filteredData = data.filter(item =>
                    item.title?.toLowerCase().includes(lowerSearchTerm)
                )
            }
            else if (filter === 'Tv episodes') {
                filteredData = data.filter(item =>
                    item.type === 'tv' && item.title?.toLowerCase().includes(lowerSearchTerm)
                )
            }
            else if (filter === 'Celebs') {
                filteredData = data.filter(item => {
                    const directorMatch = item.director?.toLowerCase().includes(lowerSearchTerm)
                    const writersMatch = item.writers?.some(writer => writer.toLowerCase().includes(lowerSearchTerm))
                    const actorsMatch = item.actors?.some(actor => actor.toLowerCase().includes(lowerSearchTerm))
                    const starsMatch = item.stars?.some(star => star.toLowerCase().includes(lowerSearchTerm))
                    return directorMatch || writersMatch || starsMatch || actorsMatch
                })
            }
            else if (filter === 'Keywords') {
                filteredData = data.filter(item => {
                    const genreMatch = item.genre?.some(g => g.toLowerCase().includes(lowerSearchTerm))
                    return genreMatch
                })
            }

            setSearchResults(filteredData)
            setLoading(false)
        }, 500)
    }

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter)
        performSearch(currentSearchTerm, filter)
    }

    const handleOverlayClick = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setIsOpen(false);
        }
        setOpen(false)
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    function handleInp(e) {
        const value = e.target.value.trim()
        setCurrentSearchTerm(value)
        performSearch(value, currentFilter)
    }

    function handleSearch() {
        setOpen(false)

        setCurrentSearchTerm('')
        if (inpRef.current) {
            inpRef.current.value = ''
        }
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    // Fixed scroll function
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fixed function to handle both actions
    const handleSeeAllResults = () => {
        
        handleSearch();
        scrollTop();
    };
    const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentSearchTerm.trim()) {
        handleSeeAllResults();
        // Navigate to search results page
        window.location.href = `/find/${currentSearchTerm}/${currentFilter}/popular`;
    }
};

    return (
        <div className="w-[calc(40%-5rem)] sm:w-[calc(60%-5rem)] lg:w-[calc(56%-5rem)] xl:w-[calc(60%-3rem)]">
            {/* Mobile Search */}
            <div className="sm:hidden flex items-end justify-end">
                <button onClick={() => setIsOpen(true)} className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ipc-icon ipc-icon--magnify" viewBox="0 0 24 24" fill="white" role="presentation">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                </button>

                {isOpen && (
                    <div className="relative" >
                        <div className="fixed top-0 left-0 w-screen h-screen flex items-center z-[1]" onClick={handleOverlayClick}>
                            <div ref={searchRef} className="bg-[#1f1f1f] h-[60px] fixed top-0 left-0 flex w-screen z-[2] items-center">
                                <Filter onFilterChange={handleFilterChange} />
                                <div className="flex items-center justify-between flex-1">
                                    <input
                                        ref={inputRef}
                                        onKeyDown={handleKeyPress}
                                        onChange={(e) => handleInp(e)}
                                        type="text"
                                        placeholder="Search IMDb"
                                        className="w-full p-2 rounded-lg caret-white text-white bg-transparent border-none focus:outline-none focus:border-none"
                                    />
                                    <span
                                        onClick={() => setIsOpen(false)}
                                        className="cursor-pointer p-2 m-5 absolute right-0 hover:bg-[#313131] w-fit rounded-4xl float-right text-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill="none" d="M0 0h24v24H0V0z" />
                                            <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89a.996.996 0 0 0 0-1.4z" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            {isOpen && (
                                <div className='sm:hidden block bg-[#1f1f1f] rounded-sm min-h-[20vh] top-[60px] w-full absolute z-30'>
                                    {loading ? (
                                        <div className="flex justify-center items-center h-32">
                                            <Loader />
                                        </div>
                                    ) : (
                                        <div className="h-[calc(100vh-60px)] overflow-y-auto">
                                            {searchResults.length > 0 ? (
                                                <>
                                                    <div>
                                                        {searchResults.slice(0, 10).map((item, index) => (
                                                            <Link onClick={() => handleSearch()} to={`/title/${item.id}`} key={item.id || index} className="text-white p-2 gap-2 flex hover:bg-white/10 cursor-pointer border-b border-white/10">
                                                                <img src={item.posterUrl} className="rounded-xl w-15" />
                                                                <div >
                                                                    <h3 className="mb-1">{item.title}</h3>
                                                                    <div className="text-sm text-gray-400 flex flex-col">
                                                                        {item.year && <span>{item.year}</span>}
                                                                        <span className="flex">
                                                                            {item.actors && item.actors.slice(0, 3).map((actor, idx) => (
                                                                                <span key={idx}>
                                                                                    {actor}{idx < 2 && idx < item.actors.length - 1 ? ', ' : ''}
                                                                                </span>
                                                                            ))}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                currentSearchTerm && (
                                                    <div className="text-center text-white py-8">
                                                        <p className="text-lg">No results found</p>
                                                        <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms or filter</p>
                                                    </div>
                                                )
                                            )}
                                            {currentSearchTerm && (
                                                <div className="px-1 py-2">
                                                    <Link
                                                        onClick={handleSeeAllResults}
                                                        className='text-white text-sm'
                                                        to={`/find/${currentSearchTerm}/${currentFilter}/popular`}
                                                    >
                                                        See all results for "{currentSearchTerm}"
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop Search */}
            <div className="relative">
                <div className="hidden sm:flex items-center rounded-md border-2 border-white bg-white focus-within:border-[#F5C518]">
                    <div className="w-full flex">
                        <Filter onFilterChange={handleFilterChange} />
                        <input
                        onKeyDown={handleKeyPress}
                            ref={inpRef}
                            onChange={(e) => handleInp(e)}
                            type="text"
                            className="bg-white pl-2 group border-transparent outline-none flex-1"
                        />
                    </div>
                    <Link onClick={handleSeeAllResults}

                        to={`/find/${currentSearchTerm}/${currentFilter}/popular`} className="px-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='fill-black/40' viewBox="0 0 24 24" fill="currentColor" role="presentation">
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                        </svg>
                    </Link>
                </div>

                {/* Search Results */}
                {Open && (
                    <div className='sm:block hidden bg-[#1f1f1f] my-2 rounded-sm min-h-[20vh] w-full absolute z-30'>
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <Loader />
                            </div>
                        ) : (
                            <div>
                                <div>
                                    {searchResults.length > 0 ? (
                                        <>
                                            <div>
                                                {searchResults.slice(0, 10).map((item, index) => (
                                                    <Link onClick={() => handleSearch()} to={`/title/${item.id}`} key={item.id || index} className="text-white p-2 gap-2 flex hover:bg-white/10 cursor-pointer border-b border-white/10">
                                                        <img src={item.posterUrl} className="rounded-xl w-15" />
                                                        <div >
                                                            <h3 className="mb-1">{item.title}</h3>
                                                            <div className="text-sm text-gray-400 flex flex-col">
                                                                {item.year && <span>{item.year}</span>}
                                                                <span className="flex">
                                                                    {item.actors && item.actors.slice(0, 3).map((actor, idx) => (
                                                                        <span key={idx}>
                                                                            {actor}{idx < 2 && idx < item.actors.length - 1 ? ', ' : ''}
                                                                        </span>
                                                                    ))}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        currentSearchTerm && (
                                            <div className="text-center text-white py-8">
                                                <p className="text-lg">No results found</p>
                                                <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms or filter</p>
                                            </div>
                                        )
                                    )}
                                    {currentSearchTerm && (
                                        <div className="px-1 py-2">
                                            <Link
                                                onClick={handleSeeAllResults}
                                                className='text-white text-sm'
                                                to={`/find/${currentSearchTerm}/${currentFilter}/popular`}
                                            >
                                                See all results for "{currentSearchTerm}"
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;