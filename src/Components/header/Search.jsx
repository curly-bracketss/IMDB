import { useState, useRef } from "react";

const Search = () => {
    const searchRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOverlayClick = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)} >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ipc-icon ipc-icon--magnify" viewBox="0 0 24 24" fill="white" role="presentation">
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
            </button>

            {isOpen && (
                <div
                    className="fixed top-0 left-0 w-screen h-screen flex  z-[1] items-center"
                    onClick={handleOverlayClick}
                >
                    <div
                        ref={searchRef}
                        className="bg-[#1f1f1f] h-[60px] fixed top-0 left-0 flex w-screen z-[2] items-center justify-between"
                    >


                        <div className="p-4 clear-both">
                            <input
                                type="text"
                                placeholder="Search IMDb"
                                className="w-full p-2 rounded-lg  text-white border-none focus:outline-none focus:border-none "
                            />
                        </div>
                        <span
                            onClick={() => setIsOpen(false)}
                            className="cursor-pointer p-2 m-2 hover:bg-[#313131] w-fit rounded-4xl float-right text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill="none" d="M0 0h24v24H0V0z" />
                                <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89a.996.996 0 0 0 0-1.4z" />
                            </svg>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;