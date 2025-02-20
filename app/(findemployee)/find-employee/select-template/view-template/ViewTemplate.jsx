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
import { BsDownload } from "react-icons/bs";
import { GoDownload } from "react-icons/go";

const ViewTemplate = () => {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");

  const router = useRouter();
  if (!templateId) {
    return <div>Template ID is missing</div>;
  }

  const [templateData, settemplateData] = useState(null);

  const { data, isLoading, error } = useQuery(
    [templateId],
    () => getData(`templates/${templateId}`),
    { keepPreviousData: true }
  );

  const handlePublish = () => {
    router.push("/find-employee/forfreelancers/success?templateId=1");
  };

  useEffect(() => {
    if (data) {
      settemplateData(data?.template);
    }
  }, [data, templateId]);

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
          <span className="whitespace-nowrap">
            {templateData?.templateTitle}
          </span>
        </p>
        <div className="flex items-center gap-6">
          <SecondaryBtn
            text={"Request edit"}
            classNames="text-lg"
            // ask for edit form page
            onClick={()=>router.push("/find-employee/select-template/view-template/ask-edit?templateId=6")}
          />
          <MainBtn
            text={
              <div className="flex items-center gap-2">
                <span>Download</span>
                <GoDownload className="text-xl" />
              </div>
            }
            classNames="text-lg"
            // choose plan modal
            onClick={()=>router.push("/find-employee/select-template/view-template/choose-plan?templateId=6")}
          />
        </div>
      </div>

      <TwoColumnLayout
        leftContent={
          <>
            <ProjectDetails title="Description">
              <p>{templateData?.description}</p>
            </ProjectDetails>

            <ProjectDetails title="Project files">
              <ProjectImages files={templateData?.files} />
            </ProjectDetails>
          </>
        }
        rightContent={
          <>
            <ProjectDetails title="Project summary">
              <ProjectInfo
                label="Start Pricing"
                value={templateData?.startPrice}
              />
              <ProjectInfo
                label="Delivery Time"
                value={templateData?.deleveryTime}
              />
              <ProjectInfo
                label="Project Link"
                value={
                  <Link
                    target="_blank"
                    className="text-blue-500 font-medium"
                    href={templateData?.link || ""}
                  >
                    {templateData?.link}
                  </Link>
                }
              />
              <ProjectInfo label="Category" value={templateData?.category} />
            </ProjectDetails>

            <ProjectDetails title="About">
              <ProjectInfo
                label="Freelancer Name"
                value={templateData?.freelancerName}
              />
              <ProjectInfo label="Date" value={templateData?.date} />
              <ProjectInfo label="Location" value={templateData?.location} />
            </ProjectDetails>
          </>
        }
      />
    </div>
  );
};

export default ViewTemplate;

// Component for displaying project details
const ProjectDetails = ({ title, children }) => {
  return (
    <div className="w-full bg-white dark:bg-transparent dark:border-white border-2 rounded-2xl flex flex-col justify-start items-start p-2 md:p-6 gap-4">
      <h2 className="text-3xl font-medium">{title}</h2>
      {children}
    </div>
  );
};

// Component for displaying image files
const ProjectImages = ({ files }) => {
  return (
    <>
      {files?.map((file, i) => (
        <div key={i} className="w-full h-[500px] rounded-lg overflow-hidden">
          <img src={file} alt="" className="w-full h-full object-cover" />
        </div>
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
