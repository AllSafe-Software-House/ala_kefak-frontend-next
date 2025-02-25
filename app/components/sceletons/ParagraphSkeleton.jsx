import React from 'react'

const ParagraphSkeleton = () => {
  return (
    <div role='status' className='w-full flex flex-col justify-end overflow-hidden animate-pulse'>
    <div className='h-3 bg-gray-300 dark:bg-darkinput rounded-full  w-48 mb-4'></div>
    <div className='h-2 bg-gray-300 dark:bg-darkinput rounded-full w-[80%] mb-2.5'></div>
    <div className='h-2 bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5'></div>
    <div className='h-2 bg-gray-300 dark:bg-darkinput rounded-full w-[80%] mb-2.5'></div>
    <div className='h-2 bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5'></div>
    <div className='h-2 bg-gray-300 dark:bg-darkinput rounded-full w-[80%] mb-2.5'></div>
    <div className='h-2 bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5'></div>
    <div className='h-2 bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5'></div>
    <div className='h-2 bg-gray-300 dark:bg-darkinput rounded-full w-[80%] mb-2.5'></div>
    <div className='h-2 bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5'></div>
    <div className='h-2 bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5'></div>
    <div className='h-2 bg-gray-300 dark:bg-darkinput rounded-full w-[80%] mb-2.5'></div>
    <div className='h-2 bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5'></div>
    </div>
  )
}

export default ParagraphSkeleton