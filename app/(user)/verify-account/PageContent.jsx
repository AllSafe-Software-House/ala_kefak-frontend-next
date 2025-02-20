"use client";

import Link from "next/link";
import { FaArrowLeft, FaImage } from "react-icons/fa";
import { useState } from "react";

const FileInput = ({ label, onFileChange }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    }
  };

  return (
    <label
      className="w-full cursor-pointer flex justify-center items-center flex-col 
        py-9 bg-white dark:bg-darkinput rounded-2xl border-blue-300 gap-3 border-dashed border-2
        hover:border-blue-700 group animation"
    >
      <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <FaImage className="text-4xl text-blue-400 group-hover:text-blue-700 animation" />
      <h2 className="text-center text-gray-400 text-xs group-hover:text-gray-900 animation">
        {fileName || label}
      </h2>
    </label>
  );
};

const PageContent = () => {
  const handleFileChange1 = (file) => {
    console.log("File for ID:", file);
  };

  const handleFileChange2 = (file) => {
    console.log("File for Passport:", file);
  };

  return (
    <div className="w-[60%] h-screen mx-auto flex justify-center items-center">
      <div className="w-full">
        <Link
          href={"/profile"}
          className="w-full flex justify-start items-center gap-4 text-3xl"
        >
          <FaArrowLeft />
          <span>Verify your Account</span>
        </Link>
        <form className="mt-8 flex flex-col gap-6">
          <div>
            <p >upload a government-issued ID (Front)</p>
            <FileInput label="Upload a government-issued ID" onFileChange={handleFileChange1} />
          </div>
          <div>
            <p >upload a government-issued ID (Back)</p>
            <FileInput label="Upload your Passport" onFileChange={handleFileChange2} />
          </div>
          <button
            type="submit"
            className="w-fit self-end bg-primary text-white py-3 px-6 rounded-lg hover:bg-primaryhover animation"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PageContent;
