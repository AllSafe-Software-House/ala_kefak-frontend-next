"use client";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import UserSkeleton from "@/app/components/sceletons/UserSkeleton";
import axiosInstance from "@/app/providers/axiosConfig";
import { useTranslation } from "@/app/providers/Transslations";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  FaArrowLeft,
  FaEdit,
  FaEye,
  FaFileAudio,
  FaFilePdf,
} from "react-icons/fa";
import { useQuery } from "react-query";

const ViewContent = ({ projectId }) => {
  const { translate, language } = useTranslation();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const translationType = type === "template" ? "templates" : "projects";
  const {
    data: projectData,
    isLoading,
    error,
  } = useQuery([projectId, type], async () => {
    const endpoint =
      type === "template"
        ? `/auth/freelancer/templates/${projectId}`
        : `/auth/freelancer/projects/${projectId}`;

    const response = await axiosInstance.get(endpoint);
    return response.data;
  });

  useEffect(() => {
    console.log(projectData?.data);
  }, [projectData]);

  if (isLoading) return <UserSkeleton />;
  if (error) return <ErrorPage />;

  return (
    <div className="min-h-screen w-[90%] mx-auto p-6 px-3 md:px-8 lg:px-16 mt-12 flex flex-col gap-16 bg-gray-100 dark:bg-transparent">
      <div className="w-full text-3xl flex justify-between items-center">
        <Link
          className="flex justify-start items-center gap-4 font-medium"
          href={"/profile"}
        >
          {language == "en" ? (
            <FaArrowLeft className="text-3xl" />
          ) : (
            <FaArrowLeft className="text-3xl rotate-180" />
          )}
          <span className="whitespace-nowrap">{projectData?.data?.name}</span>
        </Link>

        <div className="w-full flex justify-end items-center gap-4 text-xl">
          <Link
            href={`/profile/edit-project?projectId=${projectData?.data?.id}&type=${type}`}
          >
            <SecondaryBtn
              classNames="flex justify-center items-center gap-2 "
              text={
                <>
                  <span>{translate("btns.edit")}</span>
                  <FaEdit />
                </>
              }
            />
          </Link>
          <MainBtn
            classNames="flex justify-center items-center gap-2 "
            text={
              <>
                <span>{translate("btns.view")}</span>
                <FaEye />
              </>
            }
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-[70%_28%] justify-between gap-4 mb-8">
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <ProjectDetails title={translate(`${translationType}.${type}_about`)}>
            <p>{projectData?.data?.description}</p>
          </ProjectDetails>

          <ProjectDetails title={translate(`${translationType}.${type}_details`)}>
            {projectData?.data?.cover_image && (
              <img
                src={projectData?.data?.cover_image}
                alt="Cover"
                className="w-full h-full max-h-[500px] rounded-xl"
              />
            )}
          </ProjectDetails>
          {projectData?.data?.files?.length > 0 && (
            <ProjectDetails title={translate(`${translationType}.${type}_files`)}>
              <ProjectFiles files={projectData?.data?.files} />
            </ProjectDetails>
          )}
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          <ProjectDetails title={translate(`${translationType}.${type}_data`)}>
            <ProjectInfo
              label={translate(`${translationType}.${type}_category`)}
              value={projectData?.data?.category_name}
            />
            <ProjectInfo
              label={translate(`${translationType}.freelancer_name`)}
              value={projectData?.data?.user_name}
            />
            {projectData?.data?.date && <ProjectInfo
              label={translate(`${translationType}.${type}_date`)}
              value={projectData?.data?.date}
            />}
          </ProjectDetails>

          {projectData?.data?.skills?.length > 0 && (
            <ProjectDetails title={translate(`${translationType}.${type}_skills`)}>
              <Skills skills={projectData?.data?.skills} />
            </ProjectDetails>
          )}

          <ProjectDetails title={translate(`${translationType}.${type}_url`)}>
            {projectData?.data?.link ? (
              <Link
                dir="ltr"
                href={projectData?.data?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all"
              >
                {projectData?.data?.link}
              </Link>
            ) : (
              "No link provided"
            )}
          </ProjectDetails>
        </div>
      </div>
    </div>
  );
};

export default ViewContent;

// Component for displaying project details
const ProjectDetails = ({ title, children }) => {
  return (
    <div className="w-full bg-white dark:bg-darknav dark:border-darkinput dark:text-gray-300 border-2 rounded-2xl flex flex-col justify-start items-start p-2 md:p-6 gap-4">
      <h2 className="text-3xl font-medium">{title}</h2>
      {children}
    </div>
  );
};

const Skills = ({ skills }) => {
  useEffect(() => {
    console.log(skills);
  }, [skills]);

  return (
    <div className="w-full flex justify-start items-center flex-wrap gap-2 md:gap-3">
      {skills?.map((skill, i) => (
        <span
          key={i}
          className="text-gray-500 rounded-full text-sm md:text-base p-2 px-3 md:px-4 border-gray-800 bg-gray-100 dark:bg-darkinput dark:border-darkinput dark:text-gray-300"
        >
          {skill?.name}
        </span>
      ))}
    </div>
  );
};

const ProjectFiles = ({ files }) => {
  const getFileType = (fileUrl) => {
    const extension = fileUrl?.split(".").pop()?.toLowerCase();

    if (["jpeg", "jpg", "gif", "png", "webp", "svg"].includes(extension)) {
      return "image";
    } else if (extension === "pdf") {
      return "pdf";
    } else if (["mp4", "webm", "ogg"].includes(extension)) {
      return "video";
    } else if (["mp3", "wav", "ogg"].includes(extension)) {
      return "audio";
    } else {
      return "other";
    }
  };

  if (!files || files.length === 0) return null;

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {files?.map((file, i) => {
        const fileType = getFileType(file);
        const fileName = file.split("/").pop();

        switch (fileType) {
          case "image":
            return (
              <div key={i} className="relative group">
                <img
                  src={file}
                  alt={`Project Image ${i + 1}`}
                  className="w-full h-full max-h-[500px] rounded-xl object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                  {fileName}
                </div>
              </div>
            );

          case "pdf":
            return (
              <a
                key={i}
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all border-gray-800 bg-gray-100 dark:bg-darkinput dark:border-darkinput dark:text-gray-300 rounded-lg overflow-hidden"
              >
                <div className="  p-4 flex items-center gap-3 ">
                  <FaFilePdf className="text-red-600 text-5xl" />

                  {fileName}
                </div>
              </a>
            );

          case "video":
            return (
              <div key={i} className="relative">
                <video
                  controls
                  className="w-full max-h-[500px] rounded-xl bg-black"
                >
                  <source src={file} type={`video/${file.split(".").pop()}`} />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                  {fileName}
                </div>
              </div>
            );

          case "audio":
            return (
              <div
                key={i}
                className="border rounded-lg p-4 flex items-center gap-3 "
              >
                <FaFileAudio className="text-blue-600 text-5xl" />
                <audio controls className="flex-1">
                  <source src={file} type={`audio/${file.split(".").pop()}`} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            );

          default:
            return (
              <div
                key={i}
                className="border rounded-lg p-4 flex items-center gap-3 "
              >
                <div className="bg-gray-100 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {fileName}
                </a>
              </div>
            );
        }
      })}
    </div>
  );
};

// Component for displaying text with labels
const ProjectInfo = ({ label, value }) => {
  return (
    <p className="w-full flex justify-between items-center">
      <span className="font-medium">{label}</span>
      <span className="text-right">{value || "Not specified"}</span>
    </p>
  );
};
