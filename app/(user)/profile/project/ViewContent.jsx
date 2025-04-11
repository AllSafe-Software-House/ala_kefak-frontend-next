"use client";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useAuth } from "@/app/providers/AuthContext";
import { getData } from "@/app/providers/TheQueryProvider";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaEdit, FaEye } from "react-icons/fa";
import { useQuery } from "react-query";

const ViewContent = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const { user } = useAuth();
  const [projectData, setProjectData] = useState(null);
  const type = searchParams.get("type");
  const { data, isLoading, error } = useQuery(
    ["userData", user?.user?.id],
    () => getData(`user?id=${user?.user?.id}`),
    {
      enabled: !!user?.user?.id,
    }
  );

  useEffect(() => {
    if (data) {
      let filteredProject;
      if (type === "template") {
        filteredProject = data.user.templates.find(
          (project) => project.id === projectId
        );
      } else {
        filteredProject = data.user.projects.find(
          (project) => project.id === projectId
        );
      }
      if (filteredProject) {
        setProjectData(filteredProject);
      }
    }
  }, [data, type, projectId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project data!</div>;

  return (
    <div className="min-h-screen w-[90%] mx-auto p-6 px-3 md:px-8 lg:px-16 flex flex-col gap-16 bg-gray-100 dark:bg-transparent">
      <div className="w-full text-3xl flex justify-between items-center">
        <Link
          className="flex justify-start items-center gap-4 font-medium"
          href={"/profile"}
        >
          <FaArrowLeft />
          <span className="whitespace-nowrap">{projectData?.title}</span>
        </Link>

        <div className="w-full flex justify-end items-center gap-4 text-xl">
          <Link
            href={`/profile/edit-project?projectId=${projectData?.id}&type=${type}`}
          >
            <SecondaryBtn
              classNames="flex justify-center items-center gap-2 "
              text={
                <>
                  <span>Edit</span>
                  <FaEdit />
                </>
              }
            />
          </Link>
          <MainBtn
            classNames="flex justify-center items-center gap-2 "
            text={
              <>
                <span>Preview</span>
                <FaEye />
              </>
            }
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-[70%_28%] justify-between gap-4 mb-8">
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <ProjectDetails title="About Project">
            <p>{projectData?.description}</p>
          </ProjectDetails>
          <ProjectDetails title="Project Details">
            <img
              src={projectData?.image}
              alt="Cover"
              className="w-full h-full max-h-[500px] rounded-xl"
            />
            <ProjectImages images={projectData?.files} />
          </ProjectDetails>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          <ProjectDetails title="Project Date">
            <ProjectInfo label="Freelancer Name" value={data?.user?.name} />
            <ProjectInfo label="Location" value={data?.user?.location} />
            <ProjectInfo label="Date" value={projectData?.date} />
          </ProjectDetails>

          <ProjectDetails title="Project Skills">
            <Skills skills={projectData?.skills} />
          </ProjectDetails>

          <ProjectDetails title="Project Link">
            <Link
              href={projectData?.link || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              {projectData?.link}
            </Link>
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
    <div className="w-full bg-white dark:bg-darknav dark:border-darkinput dark:text-gray-300  border-2 rounded-2xl flex flex-col justify-start items-start p-2 md:p-6 gap-4 ">
      <h2 className="text-3xl font-medium">{title}</h2>
      {children}
    </div>
  );
};

// Component for displaying skills
const Skills = ({ skills }) => {
  return (
    <div className="w-full flex justify-start items-center flex-wrap gap-2 md:gap-3">
      {skills?.map((skill, i) => (
        <span
          key={i}
          className="text-gray-500 rounded-full text-sm md:text-base p-2 px-3 md:px-4 border-gray-800 bg-gray-100 dark:bg-darkinput dark:border-darkinput dark:text-gray-300"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

// Component for displaying image files
const ProjectImages = ({ images }) => {
  return images?.map((file, i) => (
    <img
      key={i}
      src={file}
      alt="Project Image"
      className="w-full h-full max-h-[500px] rounded-xl"
    />
  ));
};

// Component for displaying text with labels
const ProjectInfo = ({ label, value }) => {
  return (
    <p className="w-full flex justify-between items-center">
      <span>{label}</span> {value}
    </p>
  );
};
