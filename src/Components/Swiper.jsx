import React, { useState, useEffect, useContext } from 'react';
import { dataCntxt } from "../../context/DataContext";
import Slider from './Slider';
import UpNext from './UpNext';
import { Link } from 'react-router-dom';
import { MdOutlineNavigateNext } from "react-icons/md";
const Swiper = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const { swiperData } = useContext(dataCntxt);
    const slides = swiperData || [];
    const totalSlides = slides.length;
    const upNextSlides = slides.filter(slide => slide != slides[currentSlide])
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        console.log(currentSlide)
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        if (isPaused || totalSlides === 0) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, totalSlides]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            else if (e.key === 'ArrowRight') nextSlide();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [totalSlides]);

    if (totalSlides === 0) return null;

    return (
        <div className="flex flex-col lg:flex-row  py-10 gap-2 mx-auto max-w-[1400px] ">
            <div
                className="relative w-full max-w-4xl   rounded-2xl shadow-2xl "
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Slides Container */}
                <div className="overflow-hidden w-full h-full">
                    <div
                        className="flex w-full h-full transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className="w-full h-full flex-shrink-0"
                            >
                                <Slider slide={slide} />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={prevSlide}
                    className="md:flex hidden absolute top-1/3 transform -translate-y-1/2 w-12 h-16 border-1 rounded-md left-0.5 border-white shadow-lg bg-[#12121273] items-center justify-center transition-all duration-300 group z-10"
                    aria-label="Previous slide"
                >
                    <svg className="w-10 h-10 text-white group-hover:text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute md:flex hidden top-1/3 transform -translate-y-1/2 w-12 h-16 border-1 rounded-md right-0.5 border-white shadow-lg bg-[#12121273] items-center justify-center transition-all duration-300 group z-10"
                    aria-label="Next slide"
                >
                    <svg className="w-10 h-10 text-white group-hover:text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div className='h-full flex flex-col gap-3 xl:gap-4'>
                <h2 className='text-[#F5C518] font-bold text-xl hidden lg:block'>Up Next</h2>
                <div className='bg-gradient-to-b h-full  hidden lg:block p-2 from-[#111111] via-black/10 to-transparent'>{upNextSlides.slice(0, 3).map((slide, index) => (
                    <div
                        key={index}
                        className="w-full h-full flex-shrink-0"
                    >
                        <UpNext key={slide.id} slide={slide} />

                    </div>
                ))}
                </div>
                <Link to='/trailers'> <h2 className=' text-white hover:text-[#F5C518] font-bold text-xl flex items-center'>Browse Trailers <MdOutlineNavigateNext className='text-2xl'/></h2></Link>

            </div>

        </div>
    );
};

export default Swiper;
