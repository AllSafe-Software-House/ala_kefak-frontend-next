"use client";
import { MainBtn } from "@/app/components/generalComps/Btns";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaImage } from "react-icons/fa";

const FileInput = ({ label, onFileChange, fileNames }) => {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    onFileChange(selectedFiles);
  };

  return (
    <label
      className="w-full cursor-pointer flex justify-center items-center flex-col py-9 dark:text-white text-slate-900 dark:bg-darknav dark:border-darkinput 
    rounded-2xl border-blue-300 gap-3 border-dashed border-2 hover:border-blue-700 group animation dark:hover:bg-blue-500/20"
    >
      <input
        type="file"
        className="hidden"
        multiple
        onChange={handleFileChange}
      />
      <FaImage className="text-4xl text-blue-400 group-hover:text-blue-700 animation" />
      <h2 className="text-center text-gray-400 text-xs group-hover:text-gray-900 animation">
        {fileNames.length > 0 ? fileNames.join(", ") : label}
      </h2>
    </label>
  );
};

const AddTempContent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
  };

  const handleCoverImageChange = (file) => {
    setCoverImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("skills", skills);
    formData.append("projectLink", projectLink);
    formData.append("coverImage", coverImage);
    files.forEach((file) => formData.append("files", file));

    console.log("Form Submitted", formData);
  };

  return (
    <div className="h-screen w-[90%] mx-auto p-6 px-3 md:px-8 lg:px-16 flex flex-col gap-16 bg-gray-100 dark:bg-transparent ">
      <div className="head text-3xl">
        <Link
          className="flex justify-start items-center gap-4 font-medium"
          href={"/profile"}
        >
          <FaArrowLeft />
          <span>Add Template</span>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 lg:grid-cols-[70%_28%] justify-between gap-4 mb-8"
      >
        <div>
          {/* Project Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="font-medium mb-2">
              Template Title
            </label>
            <input
              id="title"
              type="text"
              className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          {/* Date of Project */}
          <div className="flex flex-col">
            <label htmlFor="date" className="font-medium mb-2">
              Date of Template
            </label>
            <input
              id="date"
              type="date"
              className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Add Files */}
          <div className="flex flex-col">
            <label htmlFor="files" className="font-medium mb-2">
              Add Files
            </label>
            <FileInput
              label="Upload Project Files"
              fileNames={files.map((file) => file.name)}
              onFileChange={handleFileChange}
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col">
            <label htmlFor="skills" className="font-medium mb-2">
              Skills
            </label>
            <input
              id="skills"
              type="text"
              className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          {/* Cover Photo */}
          <div className="flex flex-col">
            <label htmlFor="coverImage" className="font-medium mb-2">
              Cover Photo
            </label>
            <FileInput
              label="Upload Cover Photo"
              fileNames={coverImage ? [coverImage.name] : []}
              onFileChange={handleCoverImageChange}
            />
          </div>

          {/* Project Link */}
          <div className="flex flex-col">
            <label htmlFor="projectLink" className="font-medium mb-2">
              Project Link
            </label>
            <input
              id="projectLink"
              type="url"
              className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end w-full">
          <MainBtn text="Send Request" />
        </div>
      </form>
    </div>
  );
};

export default AddTempContent;
