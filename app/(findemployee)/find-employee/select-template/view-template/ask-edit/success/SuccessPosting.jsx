"use client";
import { MainBtn } from "@/app/components/generalComps/Btns";
import GenHeading from "@/app/components/generalComps/GenHeading";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const SuccessPosting = () => {
  const router = useRouter();

  const handleManageProjects = () => {
    router.push("/manage-projects");
  };
  return (
    <div className="p-8 w-full lg:w-[80%] mx-auto flex justify-center items-center flex-col gap-6 py-16">
      <div className="w-full flex justify-center items-center gap-5">
        <FaArrowLeft
          className="cursor-pointer text-2xl"
          onClick={handleManageProjects}
        />
        <GenHeading
          text={
            <>
              Your Request has been successfully submitted. <br /> we will
              review your requirements and talk to you shortly.
            </>
          }
        />
      </div>
      <div className="w-[60%] h-[50vh] overflow-hidden   ">
        <img
          src="/images/deal.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full flex justify-end ">
        <MainBtn
          text={"See Project"}
          onClick={() => router.push("/find-employee/select-template/view-template?templateId=6")}
        />
      </div>
    </div>
  );
};

export default SuccessPosting;
