import { useRef, useState, useContext } from "react";
import { dataCntxt } from "../../../context/DataContext";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from "react-router-dom";
import { RiArrowDownSFill } from "react-icons/ri";
import LanguageSelector from "./LanguageSelector";

const Sidebar = () => {
    const sideRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const { menuData } = useContext(dataCntxt);
    const [expandedSections, setExpandedSections] = useState({});


    const goToAbout = () => {
        window.location.href = 'https://pro.imdb.com/signup/index.html?rf=cons_nb_hm&u=http%3A%2F%2Fpro.imdb.com%2F%3Fref_%3Dcons_nb_hm%26rf%3Dcons_nb_hm';

    };


    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            [sectionId]: !prev[sectionId]
        }));
    };
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("en-US");
    const [selectedLabel, setSelectedLabel] = useState("English (United States)");

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const handleLanguageSelect = (lang) => {
        setSelectedLanguage(lang.code);
        setSelectedLabel(lang.label);
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="text-white hover:bg-[#313131] px-4 py-3 cursor-pointer rounded-4xl tracking-[1.25rem] min-h-[3rem] min-w-[3rem]"
            >

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="fixed top-0 left-0 w-screen h-screen  z-100"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        ref={sideRef}
                        className="bg-[#1f1f1f] h-screen overflow-y-auto relative w-[280px] flex flex-col "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            onClick={() => setIsOpen(false)}
                            className="cursor-pointer p-2 my-4 mx-2 hover:bg-[#313131] w-fit rounded-4xl  text-white absolute right-0 "
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill="none" d="M0 0h24v24H0V0z" />
                                <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89a.996.996 0 0 0 0-1.4z" />
                            </svg>
                        </div>

                        <div className="text-white pt-4 mt-10 clear-both cursor-pointer ">
                            {menuData && menuData.map((section) => {
                                const isExpanded = expandedSections[section.id];

                                return (
                                    <div key={section.id}>
                                        <button
                                            onClick={() => toggleSection(section.id)}
                                            className="w-full flex items-center justify-between pr-4  group transition cursor-pointer duration-200 hover:bg-[#313131]"
                                        >

                                            <img
                                                src={section.icon}
                                                alt={`${section.name} icon`}
                                                className={`w-6 h-6 transition duration-200 m-3 ${isExpanded
                                                    ? "white-to-yellow" 
                                                    :  "invert opacity-50 group-hover:opacity-100 transition-colors"
                                                    }`}

                                            />


                                            <span
                                                className={`flex-1 text-left text-md transition-colors ${isExpanded ? "text-amber-400" : "group-hover:text-white text-white"
                                                    }`}
                                            >
                                                {section.name}
                                            </span>


                                            {section.items && section.items.length > 0 && (
                                                <>
                                                    {isExpanded ? (
                                                        <ChevronUp size={18} className="text-white" />
                                                    ) : (
                                                        <ChevronDown size={18}  className='opacity-50 group-hover:opacity-100 transition-colors' />
                                                    )}
                                                </>
                                            )}
                                        </button>


                                        {isExpanded && section.items && section.items.length > 0 && (
                                            <div className="border-b border-gray-700">
                                                {section.items.map((item, index) => (
                                                    <Link
                                                    onClick={()=>setIsOpen(false)}
                                                        key={index}
                                                        to={item.url}
                                                        className="block pl-12 pr-4 py-2 text-md  hover:text-white hover:bg-[#313131] transition-colors"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <button onClick={goToAbout} className=" flex justify-between items-center w-full px-4 group mt-10">
                                <span>
                                    <svg  className='opacity-50 group-hover:opacity-100 transition-colors' width="52" height="14" viewBox="0 0 1448.72 347.5" xmlns="http://www.w3.org/2000/svg" version="1.1"><g fill="currentColor"><rect x="0" y="1" width="88.5" height="341.55"></rect><path d="M256.88,159.61l-12.57-86.76c-3.8-27.8-7.28-52.15-10.75-72.85h-114.8v341.55h77.58l.33-225.48,32.59,225.48h55.24l31.1-230.45.17,230.45h77.39V0h-115.77l-20.51,159.6Z"></path><path d="M606.54,25.36c-7.77-8.96-19.35-15.41-34.41-19.37-15.05-3.97-39.86-5.98-82.7-5.98h-66v341.55h107.35c21.17,0,37.05-1.16,47.65-3.47,10.4-2.32,19.35-6.29,26.46-12.26,7.11-5.8,12.24-13.9,15.05-24.17,2.97-10.26,4.62-30.78,4.62-61.42v-119.86c0-32.29-1.32-53.96-3.13-65.06-1.99-10.93-6.94-21.03-14.89-29.95M539.89,233.1c0,22.86-1.49,36.77-4.47,41.9-2.97,5.13-10.74,7.6-23.49,7.6V58.47c9.6,0,16.2.98,19.69,3.13,3.45,1.99,5.78,5.14,6.78,9.6.99,4.3,1.49,14.23,1.49,29.64v132.26Z"></path><path d="M845.89 107.61c-4.64-6.62-11.09-11.74-19.69-15.39-8.77-3.64-18.86-5.47-30.61-5.47-10.09 0-23.15 2.01-31.92 6.15-8.59 3.96-16.53 10.08-23.65 18.2V0h-85.35v341.55h79.73l5.62-21.7c7.11 8.78 15.06 15.23 23.82 19.7 8.78 4.31 21.67 6.45 31.76 6.45 13.91 0 26.13-3.63 36.23-11.09 10.26-7.27 16.72-16.06 19.37-26 2.81-10.09 4.13-25.32 4.13-45.69v-95.84c0-20.69-.34-34.11-1.32-40.4-.84-6.29-3.65-12.76-8.11-19.38m-75.93 151.17c0 16.39-.84 26.98-2.49 31.28-1.65 4.31-8.77 6.45-14.23 6.45s-8.77-1.97-10.58-6.27c-1.65-4.14-2.65-13.74-2.65-28.81v-90.23c0-15.57.82-25.17 2.33-29.15 1.64-3.8 5.12-5.79 10.24-5.79 5.46 0 12.73 2.33 14.57 6.62 1.81 4.46 2.81 13.9 2.81 28.31v87.58Z"></path><path d="M1078.36 48.48c-2.35-10.18-6.85-18.85-13.49-26.01-6.64-7.16-16.56-12.64-29.76-16.43-13.21-3.79-32.08-5.69-56.63-5.69h-90.79V341.3h87.83V194.65h24.2c19.7 0 35.59-1.58 47.8-6.91 12.2-5.33 20.65-14.07 25.22-24.04 4.57-9.97 9.16-26.34 9.16-48.1V95.76c0-21.34-1.18-37.1-3.53-47.28m-73.3 61.28c0 14.54-2.96 20.36-5.45 22.68-3.38 3.16-9.82 4.16-19.32 4.16-1.39 0-3.06.05-4.77 0V57.74c14.74.33 20.91 2.48 23.48 4.3 2.77 1.96 6.06 7.06 6.06 20.21v27.52Z"></path><path d="M1205.93 95.15c-13.25 5.13-18.8 10.02-25.52 16.01V86.67h-85.03v254.81h84.73V239.83c0-23.71.76-38.99 2.26-45.42 1.36-5.86 4.9-10.71 10.76-14.24 2.56-1.54 5.86-3.72 14.18-6.58 5.17-1.78 14.27-4.41 20.27-5.51l30.68-81.46c-12.41 0-35.95 2.19-52.31 8.53"></path><path d="M1444.43 137.8c-2.86-8.81-8.18-17.36-15.94-25.66-7.78-8.3-18.81-15.03-33.1-20.2-14.3-5.17-31.41-7.76-51.35-7.76-23.75 0-43.25 4.02-58.5 12.06-15.25 8.04-25.81 18.71-31.67 31.98-5.86 13.28-8.8 31.73-8.8 55.35v65.11c0 21.58 1.61 37.76 4.84 48.55 3.23 10.79 8.61 19.98 16.17 27.57 7.55 7.6 18.14 13.28 31.78 17.04 13.63 3.76 30.27 5.65 49.92 5.65 17.59 0 33.17-2.2 46.74-6.61 13.56-4.41 24.66-11.23 33.32-20.49 8.65-9.25 14.3-19.21 16.94-29.87 2.64-10.66 3.96-27.41 3.96-50.27v-62.24c0-18-1.43-31.41-4.29-40.22m-82.58 122.16c0 16.48-.84 27.13-2.49 31.46-1.65 4.34-8.77 6.49-14.23 6.49s-8.77-1.98-10.58-6.31c-1.65-4.16-2.65-13.81-2.65-28.97v-90.74c0-15.65.83-25.31 2.33-29.31 1.64-3.82 5.12-5.82 10.24-5.82 5.46 0 12.73 2.34 14.57 6.66 1.81 4.49 2.81 13.98 2.81 28.47v88.07Z"></path></g></svg>
                                    <span className="text-sm">For Industry Professionals</span>
                                </span>

                                <svg className='opacity-50 group-hover:opacity-100 transition-colors' xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="ipc-icon ipc-icon--launch" viewBox="0 0 24 24" fill="currentcolor" role="presentation"><path d="M16 16.667H8A.669.669 0 0 1 7.333 16V8c0-.367.3-.667.667-.667h3.333c.367 0 .667-.3.667-.666C12 6.3 11.7 6 11.333 6h-4C6.593 6 6 6.6 6 7.333v9.334C6 17.4 6.6 18 7.333 18h9.334C17.4 18 18 17.4 18 16.667v-4c0-.367-.3-.667-.667-.667-.366 0-.666.3-.666.667V16c0 .367-.3.667-.667.667zm-2.667-10c0 .366.3.666.667.666h1.727L9.64 13.42a.664.664 0 1 0 .94.94l6.087-6.087V10c0 .367.3.667.666.667.367 0 .667-.3.667-.667V6h-4c-.367 0-.667.3-.667.667z"></path></svg>
                            </button>
                            <button className="px-4 flex justify-between items-center w-full  group cursor-pointer my-5" onClick={toggleSidebar}>
                                <span className="flex flex-col items-start ">
                                    <span  className="opacity-50 group-hover:opacity-100 transition-colors tracking-wider text-xs font-bold ">LANGUAGE</span>
                                    <span className="text-sm">{selectedLabel}</span>
                                </span>
                                <RiArrowDownSFill c className='opacity-50 group-hover:opacity-100 transition-colors' />
                            </button>
                            <LanguageSelector
                                isOpen={isSidebarOpen}
                                onClose={() => setSidebarOpen(false)}
                                selectedLang={selectedLanguage}
                                onSelect={handleLanguageSelect}
                            />
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;