"use client";
import { getData } from "@/app/providers/TheQueryProvider";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaImage, FaStar } from "react-icons/fa";

import { useQuery } from "react-query";
import moment from "moment";
import LoadingProjects from "@/app/components/sceletons/LoadingProjects";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import FileComp from "@/app/components/generalComps/FileComp";
import TwoColumnLayout from "@/app/components/generalComps/TwoColumnLayout";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";

const ViewProject = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  const router = useRouter();
  if (!projectId) {
    return <div>Project ID is missing</div>;
  }

  const [projectData, setProjectData] = useState(null);

  const { data, isLoading, error } = useQuery(
    [projectId],
    () => getData(`projects/${projectId}`),
    { keepPreviousData: true }
  );

  const handlePublish =()=>{
    router.push("/find-employee/forfreelancers/success?projectId=1")
  }




  useEffect(() => {
    if (data) {
      console.log(data?.project);
      setProjectData(data?.project);
    }
  }, [data, projectId]);

  if (isLoading) {
    return <LoadingProjects />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-screen w-[90%] mx-auto p-6 pt-10 px-3 md:px-8 lg:px-8 flex flex-col gap-16 bg-gray-100 dark:bg-transparent ">
      <div className="w-full text-3xl flex justify-between items-center">
        <p className=" flex justify-start items-center gap-4 font-medium">
          <FaArrowLeft
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <span className="whitespace-nowrap">{projectData?.projectTitle}</span>
        </p>
        <MainBtn text={"Publish"} classNames="text-lg" onClick={handlePublish} />
      </div>

      <TwoColumnLayout
        leftContent={
          <>
            <ProjectDetails title="About Project">
              <div className="w-full flex justify-between items-center gap-2">
                <h2 className="text-lg font-semibold">Project field</h2>
                <p>{projectData?.projectField}</p>
              </div>
              <p>{projectData?.description}</p>
            </ProjectDetails>
            <ProjectDetails title="Skills Nedded">
              <Skills skills={projectData?.skillsNeeded} />
            </ProjectDetails>
            <ProjectDetails title="Requirements">
              <Requirements requirements={projectData?.requirements} />
            </ProjectDetails>
            <ProjectDetails title="Project files">
              <ProjectImages files={projectData?.files} />
            </ProjectDetails>
      
          </>
        }
        rightContent={
          <>
            <ProjectDetails title="Project summary">
              <ProjectInfo label="status" value={projectData?.status} />
              <ProjectInfo label="budget" value={projectData?.budget} />
              <ProjectInfo
                label="Date"
                value={moment(new Date(projectData?.createdAt)).fromNow()}
              />
              <ProjectInfo
                label="budgetOptions"
                value={projectData?.budgetOptions}
              />
              <ProjectInfo label="timeline" value={projectData?.timeline} />
              <ProjectInfo
                label="proposals"
                value={projectData?.proposals.length}
              />
              <ProjectInfo label="location" value={projectData?.location} />
              <ProjectInfo
                label="requiredLevel"
                value={projectData?.requiredLevel}
              />
            </ProjectDetails>
            <ProjectDetails>
              <Link
                href={"/client-overview?clientId=2"}
                className="flex justify-center items-center gap-2"
              >
                <img
                  src="/images/user.jpg"
                  alt=""
                  className="size-[70px] rounded-full object-cover"
                />
                <h2 className="text-2xl font-medium">Client Info</h2>
              </Link>
              <div className="w-full text-gray-800 space-y-4">
                <ProjectInfo label="joining date" value={"2022 September"} />
                <ProjectInfo
                  label="Rate"
                  value={
                    <span className="flex items-center">
                      {[...Array(3)].map((_, index) => (
                        <FaStar key={index} className="text-yellow-500" />
                      ))}
                    </span>
                  }
                />
                <ProjectInfo label="jobs posted" value={"12"} />
                <ProjectInfo label="Total spent" value={"$1000"} />
                <ProjectInfo label="Location" value={"Egypt"} />
              </div>
            </ProjectDetails>
          </>
        }
      />
    </div>
  );
};

export default ViewProject;

// Component for displaying project details
const ProjectDetails = ({ title, children }) => {
  return (
    <div className="w-full bg-white dark:bg-transparent dark:border-white border-2 rounded-2xl flex flex-col justify-start items-start p-2 md:p-6 gap-4">
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
          className="text-gray-500 rounded-full text-sm md:text-base p-2 px-3 md:px-4 border-gray-800 bg-gray-100"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

// Component for displaying image files
const ProjectImages = ({ files }) => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <FileComp key={i} />
      ))}
    </>
  );
};

// Component for displaying text with labels
const ProjectInfo = ({ label, value }) => {
  return (
    <p className="w-full flex justify-between items-center">
      <span>{label}</span> {value}
    </p>
  );
};

// Component for displaying skills
const Requirements = ({ requirements }) => {
  return (
    <div className="w-full flex justify-start items-center flex-wrap gap-2 md:gap-3">
      {requirements?.map((skill, i) => (
        <span
          key={i}
          className="text-gray-500 rounded-full text-sm md:text-base p-2 px-3 md:px-4 border-gray-800 bg-gray-100"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

