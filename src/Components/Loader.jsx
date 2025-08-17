import React from 'react';

const Loader = () => {
  return (
    <div className="w-full gap-x-2 pt-20 flex justify-center items-center">
      <div className="w-3 bg-[#16151659] animate-pulse h-3 rounded-full animate-bounce" />
      <div className="w-3 animate-pulse h-3 bg-[#1f1f1f] rounded-full animate-bounce" />
      <div className="w-3 h-3 animate-pulse bg-[#000000] rounded-full animate-bounce" />
    </div>
  );
}

export default Loader;
