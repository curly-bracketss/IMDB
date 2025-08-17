import React from 'react'
import List from '../src/Components/List'
import MoreExplore from '../src/Components/MoreExplore'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { PiLineVerticalBold } from "react-icons/pi";
import { dataCntxt } from '../context/DataContext';
const AllLists = () => {
    const { moreExploreData } = useContext(dataCntxt)
    const { species } = useParams()
    function getMenuItem(moreExploreData, species) {
        for (const obj of moreExploreData) {
            if (obj.url === `/chart/${species}`) {
                return obj;
            }
        }
        return null;
    }
    const item = getMenuItem(moreExploreData, species)
    return (
        <div className='flex flex-col gap-10 py-15 max-w-[1280px] px-[1.5rem] mx-auto bg-white'>
            <div className="flex flex-col items-start gap-2">
                <h3 className="font-bold text-xl">IMDb Charts</h3>
                <div className="text-4xl relative ">
                    <PiLineVerticalBold className='text-[#F5C518] font-extrabold absolute -left-5 bottom-0' />
                    <h2 className="pl-1"> {item?.name}</h2>
                </div>
                <p className="text-[#0000008a]">{item?.description}</p>
            </div>
            <div className='justify-between  flex flex-col lg:flex-row'>
                <List />
                <MoreExplore />
            </div>
        </div>
    )
}

export default AllLists