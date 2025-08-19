import { dataCntxt } from "../context/DataContext";
import { useContext, useState, useRef, useEffect } from "react";
import Poster from "../src/Components/Poster";
import { GrFormNext } from "react-icons/gr";

const AllTrailers = () => {
  const { movieData } = useContext(dataCntxt);

  const categories = {
    trending: movieData?.filter(movie => movie.category === "trending") || [],
    anticipated: movieData?.filter(movie => movie.category === "anticipated") || [],
    popular: movieData?.filter(movie => movie.category === "popular") || [],
    recently: movieData?.filter(movie => movie.category === "recently") || []
  };

  const [activeCategory, setActiveCategory] = useState("trending");
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const boxRef = useRef(null);

  const checkScroll = () => {
    const el = boxRef.current;
    if (!el) return;

    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    setShowPrev(!atStart);
    setShowNext(!atEnd && el.scrollWidth > el.clientWidth);
  };

  const scrollByAmount = (amount) => {
    if (boxRef.current) {
      boxRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScroll();
    const el = boxRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [activeCategory, movieData]);

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-[1280px] mx-auto flex flex-col py-5">
        <h2 className="text-[#f5c518] font-bold text-xl md:text-3xl pl-4">
          Watch new movie & TV trailers
        </h2>

        {/* Category navigation */}
        <div className="flex items-center gap-2 relative  pt-10">
          {showPrev && (
            <button
              onClick={() => scrollByAmount(-150)}
              className="absolute left-0  z-10 font-bold text-3xl rotate-180 bg-black/70 px-2 cursor-pointer text-white hover:text-[#f5c518]"
            >
              <GrFormNext />
            </button>
          )}

          <div
            ref={boxRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide w-full "
          >
            {Object.keys(categories).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-white uppercase font-bold outline-none cursor-pointer text-sm border-b-4 px-4 py-2 whitespace-nowrap hover:bg-[#1a1a1a] 
                  ${activeCategory === cat ? "border-[#5799ef]" : "border-transparent"}`} 
              >
                {cat === "trending"
                  ? "Trending trailers"
                  : cat === "anticipated"
                  ? "Most anticipated"
                  : cat === "popular"
                  ? "Most popular"
                  : "Recently added"}
              </button>
            ))}
          </div>

          {showNext && (
            <button
              onClick={() => scrollByAmount(150)}
              className="absolute right-0 z-10 font-bold text-3xl bg-black/70 px-2 text-white cursor-pointer hover:text-[#5799ef]"
            >
              <GrFormNext />
            </button>
          )}
        </div>

        {/* Movie posters */}
        <div className="flex flex-wrap gap-[.75rem] bg-[#121212]  lg:bg-transparent py-10 lg:justify-between lg:gap-0 w-full">
          {categories[activeCategory].length > 0 ? (
            categories[activeCategory].map((movie) => (
              <Poster movie={movie} key={movie.id} />
            ))
          ) : (
            <p className="text-gray-400 text-center w-full">
              No trailers found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTrailers;
