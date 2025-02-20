"use client";
import { getData } from "@/app/providers/TheQueryProvider";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";

import { useQuery } from "react-query";
import moment from "moment";
import LoadingProjects from "@/app/components/sceletons/LoadingProjects";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import FileComp from "@/app/components/generalComps/FileComp";
import TwoColumnLayout from "@/app/components/generalComps/TwoColumnLayout";
import { SecondaryBtn } from "@/app/components/generalComps/Btns";
import GenHeading from "@/app/components/generalComps/GenHeading";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoTimeOutline } from "react-icons/io5";

const ProposalDetailesPage = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("proposalId");

  const router = useRouter();
  if (!projectId) {
    return <div>Proposal ID is missing</div>;
  }

  const [projectData, setProjectData] = useState(null);

  const { data, isLoading, error } = useQuery(
    [projectId],
    () => getData(`projects/${projectId}`),
    { keepPreviousData: true }
  );

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
    <div className="min-h-screen w-full mx-auto p-6 pt-0 px-3 md:px-8 lg:px-8 flex flex-col gap-16 bg-gray-100 dark:bg-transparent ">
      <div className="w-full text-3xl flex justify-between items-center">
        <p className=" flex justify-start items-center gap-4 font-medium">
          <FaArrowLeft
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <span className="whitespace-nowrap">proposal Details</span>
        </p>
      </div>

      <TwoColumnLayout
        leftContent={
          <>
            <ProjectDetails title="Project title">
              <div className="w-full flex justify-between items-center gap-2">
                <h2 className="text-lg font-semibold">Project field</h2>
                <p>development</p>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </ProjectDetails>
            <ProjectDetails title="Skills Nedded">
              <Skills skills={projectData?.skillsNeeded} />
            </ProjectDetails>

            <ProjectDetails title="Project files">
              <ProjectImages files={projectData?.files} />
            </ProjectDetails>
            <ProjectDetails>
              <MyProposal />
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

export default ProposalDetailesPage;

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
      {[...Array(files)].map((_, i) => (
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

const MyProposal = () => {
  return (
    <div className="w-full bg-white dark:bg-transparent rounded-2xl flex flex-col justify-start items-start p-2 md:p-6 gap-6">
      <div className="w-full space-y-6">
        <GenHeading text={"My proposal"} />
        <div className="flex justify-start items-center gap-3">
          <div className="size-[120px] w-[140px] rounded-lg border-[1px] border-indigo-600 bg-indigo-100 text-indigo-700 flex flex-col justify-center items-center gap-2 ">
            <RiMoneyDollarCircleLine className="text-2xl" />
            <span>Price</span>
            <p className="text-slate-900 font-medium">$50</p>
          </div>
          <div className="size-[120px] w-[140px] rounded-lg border-[1px] border-indigo-600 bg-indigo-100 text-indigo-700 flex flex-col justify-center items-center gap-2 ">
            <IoTimeOutline className="text-2xl" />

            <span>TimeLine</span>
            <p className="text-slate-900 font-medium">7 Days</p>
          </div>
        </div>
      </div>
      <div>
        <GenHeading text={"Cover letter"} />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="w-full space-y-6">
        <GenHeading text={"My attachments"} />
        <div className="w-full space-y-3">
          {[...Array(3)].map((_, i) => (
            <FileComp key={i} />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-end">
        <SecondaryBtn text={"Delete Proposal"} onClick={()=>console.log("delete")} classNames="border-danger text-danger bg-danger/10 hover:bg-danger hover:text-white" />
      </div>
    </div>
  );
};
