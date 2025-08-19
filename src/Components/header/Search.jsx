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

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter)

    }

    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null)
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const [Open, setOpen] = useState(false)
    const inpRef = useRef(null)

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
        if( inputRef.current.value.trim()===''){
            setOpen(false)
            setSearchResults([])
        }
    }, []);

    function handleInp(e) {
        const value = e.target.value.trim()
        value === '' ? setOpen(false) : setOpen(true)

        if (value === '') {
            setSearchResults([])
            return
        }

        setLoading(true)

        setTimeout(() => {
            const searchTerm = value.toLowerCase()
            let filteredData = []

            if (currentFilter === 'All') {
                filteredData = data.filter(item => {
                    const titleMatch = item.title?.toLowerCase().includes(searchTerm)
                    const directorMatch = item.director?.toLowerCase().includes(searchTerm)
                    const genreMatch = item.genre?.some(g => g.toLowerCase().includes(searchTerm))
                    const writersMatch = item.writers?.some(writer => writer.toLowerCase().includes(searchTerm))
                    const actorsMatch = item.actors?.some(actor => actor.toLowerCase().includes(searchTerm))
                    const starsMatch = item.stars?.some(star => star.toLowerCase().includes(searchTerm))
                    const descriptionMatch = item.description?.toLowerCase().includes(searchTerm)

                    return titleMatch || directorMatch || genreMatch || writersMatch || descriptionMatch || starsMatch || actorsMatch
                })
            }
            else if (currentFilter === 'Titles') {
                filteredData = data.filter(item =>
                    item.title?.toLowerCase().includes(searchTerm)
                )
            }
            else if (currentFilter === 'Tv episodes') {
                filteredData = data.filter(item =>
                    item.type === 'tv' && item.title?.toLowerCase().includes(searchTerm)
                )
            }
            else if (currentFilter === 'Celebs') {
                filteredData = data.filter(item => {
                    const directorMatch = item.director?.toLowerCase().includes(searchTerm)
                    const writersMatch = item.writers?.some(writer => writer.toLowerCase().includes(searchTerm))
                    const actorsMatch = item.actors?.some(actor => actor.toLowerCase().includes(searchTerm))
                    const starsMatch = item.stars?.some(star => star.toLowerCase().includes(searchTerm))
                    return directorMatch || writersMatch || starsMatch || actorsMatch
                })
            }
            else if (currentFilter === 'Keywords') {
                filteredData = data.filter(item => {
                    const genreMatch = item.genre?.some(g => g.toLowerCase().includes(searchTerm))
                    return genreMatch
                })
            }

            setSearchResults(filteredData)
            setLoading(false)
        }, 500)
        if (value === '') {
            setSearchResults([])
            return
        }
    }

    function handleSearch() {
        setOpen(false)
        setSearchResults([])
        if (inpRef.current) {
            inpRef.current.value = ''
        }
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <div className="w-[calc(40%-3rem)] sm:w-[calc(60%-3rem)] lg:w-[calc(56%-5rem)] xl:w-[calc(60%-3rem)]">
            {/* Mobile Search */}
            <div className="sm:hidden flex items-end justify-end">
                <button onClick={() => setIsOpen(true)} className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ipc-icon ipc-icon--magnify" viewBox="0 0 24 24" fill="white" role="presentation">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                </button>

                {isOpen && (
                    <div className="relative ">
                        <div className="fixed top-0 left-0 w-screen h-screen flex items-center z-[1]" onClick={handleOverlayClick}>
                            <div ref={searchRef} className="bg-[#1f1f1f] h-[60px] fixed top-0 left-0 flex w-screen z-[2] items-center">
                                <Filter onFilterChange={handleFilterChange} />
                                <div className="flex items-center justify-between flex-1">
                                    <input
                                        ref={inputRef}
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
                            {Open && (
                                <div className='sm:hidden block bg-[#1f1f1f]  rounded-sm min-h-[20vh] top-[60px]  w-full absolute z-30'>
                                    {loading ? (
                                        <div className="flex justify-center items-center h-32">
                                            <Loader />
                                        </div>
                                    ) : (
                                        <div className="h-[calc(100vh-60px)] overflow-y-auto">
                                            {searchResults.length > 0 ? (
                                                <>

                                                    <div className="overflow-y-auto">
                                                        {searchResults.map((item, index) => (
                                                            <Link to={`/title/${item.id}`} key={item.id || index} className="text-white p-2 gap-2 flex hover:bg-white/10 cursor-pointer border-b border-white/10">

                                                                <img src={item.posterUrl} className="rounded-xl w-15" />
                                                                <div >
                                                                    <h3 className="mb-1">{item.title}</h3>
                                                                    <div className="text-sm text-gray-400 flex flex-col">
                                                                        {item.year && <span>{item.year}  </span>}
                                                                        <span className="flex"> {item.actors &&
                                                                            (item.actors.map((item, index) =>
                                                                                (<span>{item}{index != 2 ? ',' : ''}</span>)))
                                                                        }</span>
                                                                    </div>

                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center text-white py-8">
                                                    <p className="text-lg">No results found</p>
                                                    <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms or filter</p>
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
                            ref={inpRef}
                            onChange={(e) => handleInp(e)}
                            type="text"

                            className="bg-white pl-2  group border-transparent outline-none flex-1"
                        />
                    </div>
                    <button onClick={() => handleSearch()} className="px-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='fill-black/40' viewBox="0 0 24 24" fill="currentColor" role="presentation">
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                        </svg>
                    </button>
                </div>

                {/* Search Results */}
                {Open && (
                    <div className='sm:block hidden bg-[#1f1f1f] my-2 rounded-sm min-h-[20vh] w-full absolute z-30'>
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <Loader />
                            </div>
                        ) : (
                            <div className="p-4">
                                <div>
                                    {searchResults.length > 0 ? (
                                        <>

                                            <div className="overflow-y-auto">
                                                {searchResults.map((item, index) => (
                                                    <Link to={`/title/${item.id}`} key={item.id || index} className="text-white p-2 gap-2 flex hover:bg-white/10 cursor-pointer border-b border-white/10">
                                                        <img src={item.posterUrl} className="rounded-xl w-15" />
                                                        <div >
                                                            <h3 className="mb-1">{item.title}</h3>
                                                            <div className="text-sm text-gray-400 flex flex-col">
                                                                {item.year && <span>{item.year}  </span>}
                                                                <span className="flex"> {item.actors &&
                                                                    (item.actors.map((item, index) =>
                                                                        (<span>{item}{index != 2 ? ',' : ''}</span>)))
                                                                }</span>
                                                            </div>

                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center text-white py-8">
                                            <p className="text-lg">No results found</p>
                                            <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms or filter</p>
                                        </div>
                                    )}
                                </div>
                            </div>)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;