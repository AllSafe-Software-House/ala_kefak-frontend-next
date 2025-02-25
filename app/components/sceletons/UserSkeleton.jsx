import React from "react";
import TwoColumnLayout from "../generalComps/TwoColumnLayout";
import ProjectSkeleton from "./ProjectSkeleton";
import CardSkeleton from "./CardSkeleton";
import ParagraphSkeleton from "./ParagraphSkeleton";

const UserSkeleton = () => {
  return (
    <div className="p-4 w-full min-h-screen mx-auto pt-12">
      <div className="flex flex-col items-center space-x-4 mb-12">
        <div className="w-52 h-52 bg-gray-300 dark:bg-darkinput rounded-full animate-pulse"></div>
      </div>
      <div className="w-[90%] mx-auto flex flex-col justify-start items-start">
      {Array(4)
        .fill()
        .map((_, index) => (
          <TwoColumnLayout
          key={index}
          className="bg-red-50"
            leftContent={<ProjectSkeleton />}
            rightContent={<ParagraphSkeleton />}
          />
        ))}
      
      </div>
    </div>
  );
};

export default UserSkeleton;
