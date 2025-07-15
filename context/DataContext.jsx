import { createContext, useEffect, useState } from "react";
import { getMenuData,getSwiperData,getMovieData } from "../service/Data";

export const dataCntxt = createContext();
const DataContext = ({children}) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [menuData, setMenuData] = useState([]);
    const [swiperData, setSwiperData] = useState([]);
    const [movieData, setMovieData] = useState([]);
    useEffect(() => {
        getMenuData()
            .then(item => setMenuData(item))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);
    useEffect(() => {
        getSwiperData()
            .then(item => setSwiperData(item))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);
   useEffect(() => {
        getMovieData()
            .then(item => setMovieData(item))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);
    return (
        <dataCntxt.Provider value={{ menuData,swiperData,movieData}}>

            {children}

        </dataCntxt.Provider>
    )
}

export default DataContext