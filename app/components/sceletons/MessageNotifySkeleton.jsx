import React from "react";

const MessageNotifySkeleton = ({ num = 5 }) => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-3">
      {Array(num)
        .fill()
        .map((_, index) => (
          <SingleOne key={index} />
        ))}
    </div>
  );
};

export default MessageNotifySkeleton;

function SingleOne() {
  return (
    <div className="w-full flex justify-start items-center gap-2 overflow-hidden animate-pulse">
      <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-darkinput "/>
      <div className=" flex flex-grow  flex-col justify-center items-start gap-2">
        <div className="h-2 bg-gray-300 dark:bg-darkinput rounded-full w-[30%] "></div>
        <div className="h-3 bg-gray-300 dark:bg-darkinput rounded-full w-full "></div>
        <div className="h-3 bg-gray-300 dark:bg-darkinput rounded-full w-full "></div>
      </div>
    </div>
  );
}
