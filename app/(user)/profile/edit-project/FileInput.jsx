"use client";

const { FaImage } = require("react-icons/fa");

const FileInput = ({
  label,
  onFileChange,
  fileNames,
  errors,
  multiple = false,
}) => {
  const handleFileChange = (e) => {
    if (multiple) {
      const files = Array.from(e.target.files);
      onFileChange(files);
    } else {
      const file = e.target.files[0];
      onFileChange([file]);
    }
  };

  return (
    <>
      <label
        className={`w-full cursor-pointer flex justify-center items-center flex-col py-9 dark:text-white text-slate-900 dark:bg-darknav dark:border-darkinput
    rounded-2xl border-blue-300 gap-3 border-dashed border-2 hover:border-blue-700 group animation dark:hover:bg-blue-500/20 ${
      errors ? "!border-red-500" : "border-gray-300 dark:border-gray-600"
    }`}
      >
        <input
          type="file"
          className="hidden"
          multiple={multiple}
          onChange={handleFileChange}
        />
        <FaImage className="text-4xl text-blue-400 group-hover:text-blue-700 animation" />
        <h2 className="text-center text-gray-400 text-xs group-hover:text-gray-900 animation">
          {fileNames.length > 0 ? fileNames.join(", ") : label}
        </h2>
      </label>
      {errors && <span className="text-red-500 text-sm mt-1">{errors}</span>}
    </>
  );
};

export default FileInput;
