import { useLocation, useParams, Link } from "react-router-dom";
import { PiLineVerticalBold } from "react-icons/pi";
import { GrFormNext } from "react-icons/gr";
import { useMemo, useState } from "react";
import MoreResults from "../src/Components/MoreResult";

export default function Find() {
  const location = useLocation();
  const { results = [] } = location.state || {};
  const { query: searchTermFromURL = "", filter } = useParams();
  const searchTerm = location.state?.term || searchTermFromURL;
  const lowerSearchTerm = searchTerm.toLowerCase();

  // State for limits
  const [groupLimits, setGroupLimits] = useState({});
  const [mainLimit, setMainLimit] = useState(7);

  // Helpers for matching (contains searchTerm)
  const matchesTerm = (text) => text?.toLowerCase().includes(lowerSearchTerm);
  const matchesArray = (arr) => arr?.some(item => matchesTerm(item));

  // Filtered results based on filter
  const filteredResults = useMemo(() => {
    if (!results || !searchTerm) return [];

    return results.filter((item) => {
      if (filter === "All") {
        return (
          matchesTerm(item.title) ||
          matchesTerm(item.director) ||
          matchesArray(item.genre) ||
          matchesArray(item.writers) ||
          matchesArray(item.actors) ||
          matchesArray(item.stars)
        );
      } else if (filter === "Titles") {
        return matchesTerm(item.title);
      } else if (filter === "Tv episodes") {
        return item.type === "tv" && matchesTerm(item.title);
      } else if (filter === "Celebs") {
        return (
          matchesTerm(item.director) ||
          matchesArray(item.writers) ||
          matchesArray(item.actors) ||
          matchesArray(item.stars)
        );
      } else if (filter === "Keywords") {
        return matchesArray(item.genre);
      }
      return false;
    });
  }, [results, searchTerm, filter, lowerSearchTerm]);

  // Group results if filter === 'All'
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
  }, [filteredResults, filter, lowerSearchTerm]);

  const hasResults = filteredResults.length > 0;

  // Toggle functions
  const toggleGroupLimit = (groupName, itemsLength) => {
    setGroupLimits(prev => ({ ...prev, [groupName]: itemsLength }));
  };

  const toggleMainLimit = () => setMainLimit(filteredResults.length);

  return (
    <div className="bg-white min-h-screen py-5">
      <div className="max-w-[1280px] mx-auto px-[0.75rem]">
        <h1 className="text-5xl py-10">Search "{searchTerm}"</h1>

        <div className="flex flex-col lg:flex-row gap-10 justify-between">

          <div className="lg:w-[calc(66.7%-3rem)] flex flex-col gap-5 w-full">

            {/* Header */}
            <div className="flex justify-between items-center w-full">
              <div className="flex justify-between items-center">
              <div className="group flex items-center relative">
                <PiLineVerticalBold className="text-[#F5C518] text-[2rem] font-extrabold absolute -left-3" />
                <h2 className="text-2xl font-bold flex items-center pl-3">{filter}</h2>
              </div>
            </div>
            <Link to={`/find/${searchTerm}/${filter}/exact`} state={{ results, term: searchTerm }} className="flex items-center cursor-pointer hover:bg-[#00000012] px-2 py-1 rounded-full" > <p className="text-black/50">Exact matches</p> <GrFormNext className="text-black/50 text-3xl" /> </Link>
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
                                      {a}{idx !== Math.min((item.actors || []).length - 1, 2) ? ", " : ""}
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
                            More matches
                            <GrFormNext className="text-2xl rotate-90" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null
                )
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg">No matches found for "{searchTerm}"</p>
                  <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms</p>
                </div>
              )
            ) : hasResults ? (
              <div className="w-full">
                <div className="mb-2 text-sm text-gray-600">
                  {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
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
                                {a}{idx !== Math.min((item.actors || []).length - 1, 2) ? ", " : ""}
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
                      More matches
                      <GrFormNext className="text-2xl rotate-90" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg">No matches found for "{searchTerm}"</p>
                <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms</p>
              </div>
            )}

          </div>

          <MoreResults results={results} searchTerm={searchTerm} matchType="popular" />

        </div>
      </div>
    </div>
  );
}
