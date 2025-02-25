import React from 'react'

const NavBarSkeleton = () => {
  return (
    <div
      role="status"
      className="w-full h-[70px] flex gap-4 justify-around items-start overflow-hidden animate-pulse bg-white rounded-2xl border-2 border-gray-300 p-5"
    >
      <div className="h-8 w-[10%] bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="h-8 w-[10%] bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="h-8 w-[10%] bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="h-8 w-[25%] bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="h-8 w-[10%] bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="h-10 w-10 bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="h-10 w-10 bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="h-10 w-10 bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>


    </div>
  );
}

export default NavBarSkeleton