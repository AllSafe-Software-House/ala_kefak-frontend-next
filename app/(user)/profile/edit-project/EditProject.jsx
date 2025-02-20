// "use client";
// import React, { useState, useEffect } from "react";
// import { FaArrowLeft, FaImage } from "react-icons/fa";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "@/app/providers/AuthContext";
// import { useQuery } from "react-query";
// import { getData } from "@/app/providers/TheQueryProvider";
// import Link from "next/link";

// const EditProject = () => {
//   const { user } = useAuth();
//   const searchParams = useSearchParams();
//   const projectId = searchParams.get("projectId");

//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [description, setDescription] = useState("");
//   const [skills, setSkills] = useState("");
//   const [projectLink, setProjectLink] = useState("");
//   const [coverImage, setCoverImage] = useState(null);
//   const [files, setFiles] = useState([]);

//   const { data, isLoading, error } = useQuery(
//     ["userData", user?.user?.id],
//     () => getData(`user?id=${user?.user?.id}`),
//     {
//       enabled: !!user?.user?.id,
//     }
//   );

//   useEffect(() => {
//     if (data) {
//       const filteredProject = data.user.projects.find(
//         (project) => project.id === projectId
//       );

//       if (filteredProject) {
//         setTitle(filteredProject.title);
//         setDate(filteredProject.date);
//         setDescription(filteredProject.description);
//         setSkills(filteredProject.skills.join(", "));
//         setProjectLink(filteredProject.projectLink);
//         setCoverImage(filteredProject.coverImage);
//         setFiles(filteredProject.files);
//       }
//     }
//   }, [data, projectId]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading project data!</div>;

//   const handleFileChange = (newFiles) => {
//     setFiles(newFiles);
//   };

//   const handleCoverImageChange = (file) => {
//     setCoverImage(file);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedData = {
//       title,
//       date,
//       description,
//       skills,
//       projectLink,
//       coverImage,
//       files,
//     };
//   };

//   return (
//     <div className="h-screen w-[90%] mx-auto p-6 px-3 md:px-8 lg:px-16 flex flex-col gap-16 bg-gray-100">
//       <div className="w-full text-3xl flex justify-between items-center">
//         <Link
//           className="flex justify-start items-center gap-4 font-medium"
//           href={`/profile/${projectId}`}
//         >
//           <FaArrowLeft />
//           <span className="whitespace-nowrap">Edit Project</span>
//         </Link>

//         <div className="w-full flex justify-end items-center gap-4 text-xl">
//           <Link
//             href={`/profile/${projectId}`}
//             className="flex justify-center items-center gap-2 border-primary border-2 bg-white text-primary py-2 px-4 rounded-xl hover:bg-primary hover:text-white animation"
//           >
//             <span>Discard</span>
//           </Link>
//           <button className="flex justify-center items-center gap-2 bg-primary text-white py-2 px-4 rounded-xl hover:bg-primaryhover animation">
//             <span>Save</span>
//           </button>
//         </div>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="w-full grid grid-cols-1 lg:grid-cols-[70%_28%] justify-between gap-4 mb-8"
//       >
//         <div className="w-full flex flex-col justify-start items-start gap-6">
//           {/* Project Title */}
//           <div className="flex flex-col gap-2 w-full">
//             <label htmlFor="title" className="text-2xl font-medium">
//               Project Title
//             </label>
//             <input
//               id="title"
//               type="text"
//               className="border p-3 rounded-lg"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           {/* Date of Project */}
//           <div className="flex flex-col gap-2 w-full">
//             <label htmlFor="date" className="text-2xl font-medium">
//               Date of Project
//             </label>
//             <input
//               id="date"
//               type="date"
//               className="border p-3 rounded-lg"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//             />
//           </div>

//           {/* Description */}
//           <div className="flex flex-col gap-2 w-full">
//             <label htmlFor="description" className="text-2xl font-medium">
//               Description
//             </label>
//             <textarea
//               id="description"
//               className="border p-3 rounded-lg"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={4}
//               required
//             />
//           </div>

//           {/* Add Files */}
//           <div className="flex flex-col gap-2 w-full">
//             <label htmlFor="files" className="text-2xl font-medium">
//               Add Files
//             </label>
//             <FileInput
//               label="Upload Project Files"
//               fileNames={files.map((file) => file.name)}
//               onFileChange={handleFileChange}
//             />
//           </div>

//           {/* Skills */}
//           <div className="flex flex-col gap-2 w-full">
//             <label htmlFor="skills" className="text-2xl font-medium">
//               Skills
//             </label>
//             <input
//               id="skills"
//               type="text"
//               className="border p-3 rounded-lg"
//               value={skills}
//               onChange={(e) => setSkills(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         <div className="w-full flex flex-col justify-start items-start gap-6">
//           {/* Cover Photo */}
//           <div className="flex flex-col gap-2 w-full">
//             <label htmlFor="coverImage" className="text-2xl font-medium">
//               Cover Photo
//             </label>
//             <FileInput
//               label="Upload Cover Photo"
//               fileNames={coverImage ? [coverImage.name] : []}
//               onFileChange={handleCoverImageChange}
//             />
//           </div>

//           {/* Project Link */}
//           <div className="flex flex-col gap-2 w-full">
//             <label htmlFor="projectLink" className="text-2xl font-medium">
//               Project Link
//             </label>
//             <input
//               id="projectLink"
//               type="url"
//               className="border p-3 rounded-lg"
//               value={projectLink}
//               onChange={(e) => setProjectLink(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="mt-6 flex justify-end w-full">
//           <button
//             type="submit"
//             className="bg-primary text-white py-3 px-6 rounded-lg"
//           >
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProject;

// const FileInput = ({ label, onFileChange, fileNames }) => {
//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     onFileChange(selectedFiles);
//   };

//   return (
//     <label className="w-full cursor-pointer flex justify-center items-center flex-col py-9 bg-white rounded-2xl border-blue-300 gap-3 border-dashed border-2 hover:border-blue-700 group animation">
//       <input
//         type="file"
//         className="hidden"
//         multiple
//         onChange={handleFileChange}
//       />
//       <FaImage className="text-4xl text-blue-400 group-hover:text-blue-700 animation" />
//       <h2 className="text-center text-gray-400 text-xs group-hover:text-gray-900 animation">
//         {fileNames.length > 0 ? fileNames.join(", ") : label}
//       </h2>
//     </label>
//   );
// };

"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaImage } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/providers/AuthContext";
import { useQuery } from "react-query";
import { getData } from "@/app/providers/TheQueryProvider";
import Link from "next/link";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";

const EditProject = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const type = searchParams.get("type");

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    skills: "",
    projectLink: "",
    coverImage: null,
    files: [],
  });

  const { data, isLoading, error } = useQuery(
    ["userData", user?.user?.id],
    () => getData(`user?id=${user?.user?.id}`),
    { enabled: !!user?.user?.id }
  );

  useEffect(() => {
    if (data) {
      let project;

      if (type === "template") {
        project = data.user.templates.find((p) => p.id === projectId);
      } else {
        project = data.user.projects.find((p) => p.id === projectId);
      }

      if (project) {
        setFormData({
          title: project.title,
          date: project.date || "",
          description: project.description || "",
          skills: project.skills?.join(", ") || "",
          projectLink: project.link || "",
          coverImage: project.image || null,
          files: project.files || [],
        });
      }
    }
  }, [data, projectId, type]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project data!</div>;

  return (
    <div className="h-screen w-[90%] mx-auto p-6 px-3 md:px-8 lg:px-16 flex flex-col gap-16 bg-gray-100 dark:bg-transparent">
      <Header projectId={projectId} type={type} />

      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 lg:grid-cols-[70%_28%] gap-4 mb-8"
      >
        <div className="flex flex-col gap-6">
          <InputField
            id="title"
            label="Project Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
          <InputField
            id="date"
            label="Date of Project"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            required
          />
          <TextAreaField
            id="description"
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            required
          />
          <FileInput
            label="Upload Project Files"
            fileNames={formData.files.map((file) => file.name)}
            onFileChange={(files) => handleChange("files", files)}
          />
          <InputField
            id="skills"
            label="Skills"
            value={formData.skills}
            onChange={(e) => handleChange("skills", e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-6">
          <FileInput
            label="Upload Cover Photo"
            fileNames={formData.coverImage ? [formData.coverImage.name] : []}
            onFileChange={(file) => handleChange("coverImage", file[0])}
          />
          <InputField
            id="projectLink"
            label="Project Link"
            type="url"
            value={formData.projectLink}
            onChange={(e) => handleChange("projectLink", e.target.value)}
            required
          />
        </div>

        <div className="mt-6 flex justify-end w-full">
          <button
            type="submit"
            className="bg-primary text-white py-3 px-6 rounded-lg"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

const Header = ({ projectId, type }) => (
  <div className="w-full text-3xl flex justify-between items-center">
    <Link
      className="flex justify-start items-center gap-4 font-medium"
      href={`/profile/project?type=${type}&projectId=${projectId}`}
    >
      <FaArrowLeft />
      <span className="whitespace-nowrap">Edit Project</span>
    </Link>

    <div className="w-full flex justify-end items-center gap-4 text-xl">
      <Link
        href={`/profile/project?type=${type}&projectId=${projectId}`}
      >
        <SecondaryBtn text={"Discard"} />
      </Link>
      <MainBtn text={"Save"} />
    </div>
  </div>
);

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
}) => (
  <div className="flex flex-col gap-2 w-full">
    <label htmlFor={id} className="text-2xl font-medium">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const TextAreaField = ({ id, label, value, onChange, rows, required }) => (
  <div className="flex flex-col gap-2 w-full">
    <label htmlFor={id} className="text-2xl font-medium">
      {label}
    </label>
    <textarea
      id={id}
      className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
      value={value}
      onChange={onChange}
      rows={rows}
      required={required}
    />
  </div>
);

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

export default EditProject;
