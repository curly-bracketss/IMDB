import { useLocation, useParams, Link } from "react-router-dom";
import { PiLineVerticalBold } from "react-icons/pi";
import { GrFormNext } from "react-icons/gr";
import { useMemo, useState ,useContext} from "react";
import { dataCntxt } from "../context/DataContext";
import DataSorter  from "../src/Components/DataSorter";
export default function Exact() {
    const { movieData, swiperData } = useContext(dataCntxt)
    const combinedData = [...(movieData || []), ...(swiperData || [])]
    const data = combinedData.filter((item, index, self) =>
        index === self.findIndex(movie => movie.id === item.id)
    )

    const search = useParams()
    console.log(search?.filter)
    console.log(search?.query)
    console.log(search?.matchType)
    // const lowerSearchTerm = searchTerm.toLowerCase();

    // console.log('Search Term:', searchTerm);
    // console.log('Filter:', filter);

    // const [groupLimits, setGroupLimits] = useState({});
    // const [mainLimit, setMainLimit] = useState(7);

    // const hasResults = filteredResults.length > 0;
    // const toggleGroupLimit = (groupName, itemsLength) => {
    //     setGroupLimits(prev => ({
    //         ...prev,
    //         [groupName]: itemsLength
    //     }));
    // };
    // const toggleMainLimit = () => setMainLimit(filteredResults.length);
    //  useMemo(() => {
    //     setGroupLimits({});
    //     setMainLimit(7);
    // }, [filter, searchTerm]);

    return (
        <div className="bg-white py-5">
            <DataSorter results={data} searchTerm={search?.query} filter={search?.filter} matchType={search?.matchType}/>
        </div>
    );
}