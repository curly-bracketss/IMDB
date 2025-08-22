import React, { useState } from 'react';
import { TiStarOutline } from 'react-icons/ti';
import RatePopup from './RatePopUp';

const Rate = ({ movie }) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div>
            <span
                className='flex items-center gap-1   group cursor-pointer'
                onClick={() => setOpen(prev => !prev)}
            >
                <TiStarOutline className=' font-bold' />
                <p className=''>Rate</p>
            </span>

            {isOpen && (
                <RatePopup 
                    movie={movie} 
                    onClose={()=>setOpen(false)} // pass a function here
                />
            )}
        </div>
    );
};

export default Rate;
