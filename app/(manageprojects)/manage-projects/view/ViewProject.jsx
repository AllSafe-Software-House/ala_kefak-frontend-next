"use client";
import { getData } from "@/app/providers/TheQueryProvider";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaRegStar, FaStar } from "react-icons/fa";
import { useQuery } from "react-query";
import moment from "moment";
import LoadingProjects from "@/app/components/sceletons/LoadingProjects";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import FileComp from "@/app/components/generalComps/FileComp";
import TwoColumnLayout from "@/app/components/generalComps/TwoColumnLayout";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { MdEdit } from "react-icons/md";
import { CiChat2, CiDollar } from "react-icons/ci";
import { IoCheckmarkDoneOutline, IoTimeOutline } from "react-icons/io5";
import GenHeading from "@/app/components/generalComps/GenHeading";
import GetPaidModal from "@/app/(findemployee)/find-employee/select-template/view-template/choose-plan/GetPaidModal";
import Link from "next/link";

const ViewProject = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [projectData, setProjectData] = useState(null);
  const [viewedContent, setViewedContent] = useState(null);
  const activeTab = searchParams.get("activeTab");

  const router = useRouter();
  if (!projectId) {
    return <div>Project ID is missing</div>;
  }
  const { data, isLoading, error } = useQuery(
    [projectId],
    () => getData(`projects/${projectId}`),
    { keepPreviousData: true }
  );

  const handlePublish = () => {
    router.push("/find-employee/forfreelancers/success?projectId=1");
  };

  const handleChangeActiveTab = (tab) => {
    setViewedContent(tab);

    const params = new URLSearchParams(location.search);
    params.set("activeTab", tab);

    router.push(`${location.pathname}?${params.toString()}`, { replace: true });
  };
  const Links = [
    {
      text: "Project overview",
      key: "overview",
    },
    {
      text: "Proposals",
      key: "proposals",
    },
  ];

  useEffect(() => {
    if (activeTab) {
      setViewedContent(activeTab);
    }
    else{
      setViewedContent("overview")
    }
  }, [activeTab]);

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
        <MainBtn
          text={"Publish"}
          classNames="text-lg"
          onClick={handlePublish}
        />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex justify-start items-center gap-4">
          {Links.map((item, i) => (
            <button
              onClick={() => handleChangeActiveTab(item.key)}
              className={`text-lg font-semibold ${
                viewedContent == item.key ? "text-primary" : ""
              } `}
              key={i}
            >
              {item.text}
            </button>
          ))}
        </div>
        <div className="flex justify-end items-center gap-4">
          <MainBtn
            text={"Manage with the freelancer"}
            onClick={() => router.push("/messages")}
          />
          <SecondaryBtn
            text={<MdEdit />}
            classNames="!p-2 text-2xl !w-fit !rounded-full"
            onClick={() => router.push("/manage-projects/edit?projectId=1")}
          />
        </div>
      </div>
      <TwoColumnLayout
        leftContent={
          <>
            {viewedContent == "overview" ? (
              <OverViewContent projectData={projectData} />
            ) : (
              <ProposalsContent projectData={projectData} />
            )}
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
          </>
        }
      />
    </div>
  );
};

export default ViewProject;

function OverViewContent({ projectData }) {
  return (
    <div>
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
    </div>
  );
}

const ProposalsContent = ({ projectData }) => {
  if (!projectData?.proposals?.length) {
    return <p className="text-center text-gray-500">No proposals available.</p>;
  }
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="space-y-6">
      {projectData.proposals.map((proposal, index) => (
        <div key={index} className="border p-6 rounded-lg shadow-lg bg-white">
          <GenHeading text={`Proposal ${index + 1}`} />
          {/* Header Section */}
          <Link href={`/manage-projects/freelancer?userId=452c962e-8c87-4eb8-bad3-a30bcdd9e5f1`} className="flex justify-between items-start mt-4">
            <div className="flex gap-4 items-center text-slate-800 ">
              <img
                src={proposal.freelancer.image}
                alt={proposal.freelancer.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  {proposal.freelancer.name}

                  <Rating rate={proposal.freelancer.rate} />
                </h3>
                <p className="text-sm font-semibold text-gray-500">
                  Title:{" "}
                  <span className="text-slate-800 ">
                    {proposal.freelancer.title}
                  </span>
                </p>
                <p className="text-sm font-semibold text-gray-500">
                  Skills:{" "}
                  <span className="text-slate-800 ">
                    {proposal.freelancer.skills.join(", ")}
                  </span>
                </p>
                <p className="text-sm font-semibold text-gray-500">
                  Badges :{" "}
                  <span className="text-slate-800 ">
                    {proposal.freelancer.badges.join(", ")}
                  </span>
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-400">{proposal.timeAgo}</span>
          </Link>

          {/* Price & Timeline */}
          <div className="flex gap-6 mt-4">
            <div className="p-4  rounded-lg flex justify-center items-center gap-1 flex-col w-32 border-[1px] border-indigo-600 bg-indigo-100 text-indigo-500 ">
              <CiDollar />
              <p className="text-gray-500 text-sm">Price</p>
              <p className="text-sm ">${proposal.price}</p>
            </div>
            <div className="p-4  rounded-lg flex justify-center items-center gap-1 flex-col w-32 border-[1px] border-indigo-600 bg-indigo-100 text-indigo-500 ">
              <IoTimeOutline />
              <p className="text-gray-500 text-sm">Timeline</p>
              <p className="text-sm ">{proposal.timeline} Days</p>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="mt-4">
            <h4 className="font-semibold">Cover Letter</h4>
            <p className="text-gray-600 text-sm mt-2">{proposal.coverLetter}</p>
          </div>

          {/* Attachments */}
          {proposal.attachments?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">Attachments</h4>
              <div className="mt-2">
                {proposal.attachments.map((file, i) => (
                  <FileComp key={i} />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end items-center gap-4 my-4">
            <SecondaryBtn
              onClick={() => router.push("/messages")}
              text={
                <div className="flex items-center justify-center text-xl gap-2 ">
                  <span>Talk to Freelancer</span>
                  <CiChat2 />
                </div>
              }
            />
            <MainBtn
              onClick={() => setShowModal(true)}
              text={
                <div className="flex items-center justify-center text-xl gap-2 ">
                  <span>Accepted</span>
                  <IoCheckmarkDoneOutline />
                </div>
              }
            />
          </div>
        </div>
      ))}

      {showModal && (
        <GetPaidModal
          onClose={() => setShowModal(false)}
          headText="Pay for freelancer"
        />
      )}
    </div>
  );
};

const Rating = ({ rate = 0 }) => {
  const totalStars = 5;
  const filledStars = Math.min(rate, totalStars);

  return (
    <div className="flex items-center mt-2">
      {[...Array(filledStars)].map((_, index) => (
        <FaStar key={index} className="text-yellow-500" />
      ))}
      {[...Array(totalStars - filledStars)].map((_, index) => (
        <FaRegStar key={index} className="text-yellow-500" />
      ))}
    </div>
  );
};

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
