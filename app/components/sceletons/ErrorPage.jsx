"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ErrorPage = ({ message = "Error Fetching Data" }) => {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div className=" text-center flex flex-col justify-center items-center gap-1 ">
        <div className="size-[70%] mx-auto min-w-[350px] min-h-[350px] md:min-w-[500px] md:min-h-[500px] overflow-hidden">
          <img
            src="/images/err.png"
            alt="error"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl md:text-5xl font-medium text-red-600 mb-2">
            SomThing went wrong
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-xl md:text-3xl font-medium">
            {message}
          </p>
        </div>
        <button
          className="mt-4 px-6 py-2 bg-danger text-white rounded-md hover:bg-dangerhover animation "
          onClick={() => router.refresh()}
        >
          Refresh!
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
