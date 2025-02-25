import React from "react";

const ProjectSkeleton = () => {
  return (
    <div
      role="status"
      className="w-full flex flex-col justify-start items-start overflow-hidden animate-pulse  rounded-2xl border-2 border-gray-300 dark:border-darkinput p-5"
    >
      <div className="h-2 w-[10%] bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="w-full flex justify-between items-center ">
        <div className="h-4 w-[25%] bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
        <div className="h-10 w-10  bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      </div>
      <div className="h-2 w-[45%] bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="h-2 w-full bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="h-2 w-full bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="h-2 w-full bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="h-2 w-full bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      <div className="w-full flex justify-start items-center gap-4 ">
        <div className="h-3 w-[10%] bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
        <div className="h-3 w-[10%] bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
        <div className="h-3 w-[10%] bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5"></div>
      </div>
      <div className="h-10 w-[15%] bg-gray-300 dark:bg-darkinput rounded-full  mb-2.5 float-right self-end"></div>
    </div>
  );
};

export default ProjectSkeleton;
