import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { dataCntxt } from "../context/DataContext";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AlbumSwiper() {
  const { movieData } = useContext(dataCntxt);
  const navigate = useNavigate();
  const { id, srcId } = useParams();
  const [swiper, setSwiper] = useState(null);

  const getInitialSlideIndex = () => {
    if (!movieData || !srcId) return 0;
    const index = movieData.findIndex(movie => movie.id === srcId);
    return index >= 0 ? index : 0;
  };

  const handleSlideChange = (swiperInstance) => {
    const currentIndex = swiperInstance.activeIndex;
    const currentMovie = movieData[currentIndex];

    if (currentMovie && currentMovie.id !== srcId) {
      navigate(`/title/${id}/albumswiper/${currentMovie.id}`, { replace: true });
    }
  };

  useEffect(() => {
    if (swiper && movieData) {
      const targetIndex = getInitialSlideIndex();
      if (swiper.activeIndex !== targetIndex) {
        swiper.slideTo(targetIndex, 0);
      }
    }
  }, [srcId, swiper, movieData]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="flex items-center justify-between pt-10">
        <button
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            fontStyle: 'bold',
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '20px'
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            navigate(-1);
          }}
        >
          ✕ Close
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        navigation
        pagination={{ type: "fraction" }}
        keyboard={{ enabled: true }}
        className="w-full h-full"
        initialSlide={getInitialSlideIndex()}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
      >
        {movieData?.map((src, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center justify-center">
            <img
              src={src?.posterUrl}
              alt={`Slide ${index}`}
              className="h-full w-full object-contain p-20"
            />
            <h2 className="text-white italic text-2xl mt-4">
              {src?.description}
            </h2>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}