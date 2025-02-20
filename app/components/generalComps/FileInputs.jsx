"use client";
import { FaFile, FaFileImage, FaFileVideo, FaImage } from "react-icons/fa";

export const FileInputSingle = ({
  label = "Upload a file",
  onFileChange,
  fileName = "",
  accept = "*",
}) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    onFileChange(selectedFile);
  };

  return (
    <label className="w-full cursor-pointer flex justify-center items-center flex-col py-9 bg-white rounded-2xl border-blue-300 gap-3 border-dashed border-2 hover:border-blue-700 group animation">
      <input
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />
      <FaImage className="text-4xl text-blue-400 group-hover:text-blue-700 animation" />
      <h2 className="text-center text-gray-400 text-xs group-hover:text-gray-900 animation">
        {fileName ? fileName.name : label}
      </h2>
    </label>
  );
};

export const FileInputMultiple = ({
  label = "Upload multiple files",
  onFileChange,
  fileNames = [],
  accept = "*",
}) => {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    onFileChange(selectedFiles);
  };

  return (
    <label className="w-full cursor-pointer flex justify-center items-center flex-col py-9 bg-white rounded-2xl border-blue-300 gap-3 border-dashed border-2 hover:border-blue-700 group animation">
      <input
        type="file"
        className="hidden"
        multiple
        accept={accept}
        onChange={handleFileChange}
      />
      <div className="w-full flex justify-center items-center gap-6 text-4xl text-blue-400 group-hover:text-blue-700 animation">
        <FaFileImage />
        <FaFileVideo className="" />
        <FaFile />
      </div>

      <h2 className="text-center text-base text-gray-400 group-hover:text-gray-900 animation">
        {fileNames.length > 0 ? fileNames.join(", ") : label}
      </h2>
    </label>
  );
};
