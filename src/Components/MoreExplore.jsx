import { useParams, Link } from 'react-router-dom'
import { dataCntxt } from '../../context/DataContext'
import { useContext } from 'react'
import { PiLineVerticalBold } from "react-icons/pi";
import { GrFormNext } from 'react-icons/gr';

const MoreExplore = () => {
    const { moreExploreData } = useContext(dataCntxt)
    const { species } = useParams()
    const filtered = moreExploreData.filter(item => !item.url.slice(-3).includes(species));
    const { movieData } = useContext(dataCntxt)
   const genres = [...new Set(movieData.flatMap(movie => movie.genre))];


    return (
        <div className='flex flex-col gap-5  w-full  lg:bg-transparent py-5 lg:py-5 lg:w-[calc(33.3%-3rem)]'>
            <div className="relative">
                <PiLineVerticalBold className='text-[#F5C518] text-3xl font-extrabold absolute -left-5 bottom-0' />
                <h2 className="pl-1 font-semibold text-3xl">More to explore</h2>
            </div>

            <h3 className='font-bold text-2xl'>Charts</h3>

            <div className="flex flex-col gap-2">
                {filtered?.map((item, index) => (
                    <Link to={item.url} key={index} className="group flex items-center justify-between p-2 ">
                        <div>
                            <h4 className='font-bold text-xl flex '>{item?.name}
                                <GrFormNext className='group-hover:text-[#F5C518] text-3xl font-bold' />

                            </h4>

                            <p className='text-[.875rem] font-medium text-[#0000008a]'>{item?.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <h3 className='font-bold text-2xl'>Top rated movies by genre</h3>
            <div className='flex flex-wrap w-full gap-2'>
                {genres.map((genre, index) => (
                    <p className='rounded-4xl px-2 py-1 border-1 border-[#00000029] text-sm hover:bg-[#0000008a]/10 cursor-pointer' key={index}>{genre}</p>
                ))}
            </div>
        </div>
    )
}

export default MoreExplore
