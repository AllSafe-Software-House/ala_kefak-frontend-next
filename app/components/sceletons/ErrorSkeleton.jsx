"use client";

import React from "react";

const ErrorSkeleton = ({
  message = "Error Fetching Data",
  func,
  funcText = "Try Again!",
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div className=" text-center flex flex-col justify-center items-center gap-1 ">
        <div className="size-[40%] mx-auto min-w-[250px] min-h-[250px]  overflow-hidden">
          <img
            src="/images/err.png"
            alt="error"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-xl md:text-2xl font-medium text-red-600 mb-2">
            SomThing went wrong
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl font-medium">
            {message}
          </p>
        </div>
        <button
          className="mt-4 px-6 py-2 text-lg bg-danger text-white rounded-md hover:bg-dangerhover animation "
          onClick={() => func}
        >
          {funcText}
        </button>
      </div>
    </div>
  );
};

export default ErrorSkeleton;
