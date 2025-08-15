import React from "react";

const languages = {
    full: [
        { code: "en-US", label: "English (United States)" }
    ],
    partial: [
        { code: "fr-CA", label: "Français (Canada)" },
        { code: "fr-FR", label: "Français (France)" },
        { code: "de-DE", label: "Deutsch (Deutschland)" },
        { code: "hi-IN", label: "हिंदी (भारत)" },
        { code: "it-IT", label: "Italiano (Italia)" },
        { code: "pt-BR", label: "Português (Brasil)" },
        { code: "es-ES", label: "Español (España)" },
        { code: "es-MX", label: "Español (México)" },
    ]
};

const LanguageSelector = ({ isOpen, onClose, selectedLang, onSelect }) => {
    return (
        <div
            className={`bg-[#1f1f1f] h-screen overflow-y-auto fixed top-0 left-0 w-[280px] z-[20] transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <span
                onClick={onClose}
                className="cursor-pointer p-4 m-2 hover:bg-[#313131] w-fit rounded-4xl  float-right text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89a.996.996 0 0 0 0-1.4z" />
                </svg>
            </span>
            <div className="text-white px-4 py-2 clear-both cursor-pointer">
                <h2 className="text-xl font-semibold">Language</h2>
            </div>

            <div className=" flex flex-col gap-2">
                <h3 className="text-white py-3 border-b-[0.5px] px-4 border-t-[0.5px] border-[#5D5D5D] clear-both cursor-pointer uppercase font-medium text-[0.75rem] tracking-widest">Fully Supported</h3>
                {languages.full.map((lang) => (
                    <label key={lang.code} className={`items-center mb-2 px-4 py-1 cursor-pointer flex ${selectedLang === lang.code ? "font-bold" : ""}`}>
                        <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center mx-2
                            ${selectedLang === lang.code ? "border-2 border-yellow-400" : "border-2 border-white"} `}>
                            {selectedLang === lang.code && (
                                <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                            )}
                        </span>

                        <input
                            type="radio"
                            checked={selectedLang === lang.code}
                            onChange={() => {
                                onSelect(lang);
                                onClose();
                            }}
                            className="hidden"
                        />
                        {lang.label}
                    </label>
                ))}

                <h3 className="text-white border-b-[0.5px] px-4 border-t-[0.5px] border-[#5D5D5D] py-3 clear-both cursor-pointer uppercase font-medium tracking-widest text-[0.75rem]">Partially Supported</h3>
                {languages.partial.map((lang) => (
                    <label key={lang.code} className={`items-center mb-2 px-4 py-1 cursor-pointer flex ${selectedLang === lang.code ? "font-bold" : ""}`}>

                        <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center mx-2
                                  ${selectedLang === lang.code ? "border-2 border-yellow-400" : "border-2 border-white"}`} >
                            {selectedLang === lang.code && (
                                <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                            )}
                        </span>

                        <input
                            type="radio"
                            checked={selectedLang === lang.code}
                            onChange={() => {
                                onSelect(lang);
                                onClose();
                            }}
                            className="hidden"
                        />
                        {lang.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelector;
