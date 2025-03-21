"use client";
import { MainBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaImage } from "react-icons/fa";

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

const AddProContent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [files, setFiles] = useState([]);
const { translate,language } = useTranslation();
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
      <div className="head text-3xl mt-3">
        <Link
          className="flex justify-start items-center gap-4 font-medium"
          href={"/profile"}
        >
          {language === "en" ? <FaArrowLeft /> : <FaArrowRight />}
          <span>{language === "en" ? "Add Project" : "إضافة مشروع"}</span>
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
              {language === "en" ? "Project Title" : "عنوان المشروع"}
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

          {/* Date of Project */}
          <div className="flex flex-col">
            <label htmlFor="date" className="font-medium mb-2">
              {language === "en" ? "Date of Project" : "تاريخ المشروع"}
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

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium mb-2">
              {language === "en" ? "Description" : "وصف المشروع"}
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

          {/* Add Files */}
          <div className="flex flex-col">
            <label htmlFor="files" className="font-medium mb-2">
              {language === "en" ? "Project Files" : "ملفات المشروع"}
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
              {language === "en" ? "Skills" : "مهارات المشروع"}
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
              {language === "en" ? "Cover Photo" : "صورة الغلاف"}
            </label>
            <FileInput
              label={language === "en" ? "Upload Cover Photo" : "تحميل صورة الغلاف"}
              fileNames={coverImage ? [coverImage.name] : []}
              onFileChange={handleCoverImageChange}
            />
          </div>

          {/* Project Link */}
          <div className="flex flex-col">
            <label htmlFor="projectLink" className="font-medium mb-2">
              {language === "en" ? "Project Link" : "رابط المشروع"}
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
          <MainBtn text={translate("btns.add")}/>
        </div>
      </form>
    </div>
  );
};

export default AddProContent;
