"use client";

import moment from "moment";
import { FaRegUser } from "react-icons/fa";
import { CiBookmark, CiLocationOn } from "react-icons/ci";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { TbMessage2Check } from "react-icons/tb";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthContext";

const ProjectCard = ({ project }) => {
    const { user } = useAuth();
  
  return (
    <Link
      href={`/project-details?projectId=${project.id}`}
      className="w-full p-2 md:p-4 border rounded-xl shadow hover:shadow-md transition bg-white dark:bg-transparent flex flex-col justify-start items-start gap-2 md:gap-3 "
    >
      <p className="text-xs md:text-sm text-gray-600">
        {moment(new Date(project.createdAt)).fromNow()}
      </p>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold line-clamp-1 whitespace-nowrap">
          {project.projectTitle}
        </h2>
        <button className="size-8 md:size-10 rounded-full bg-gray-100 border text-gray-800 text-2xl flex justify-center items-center ">
          <CiBookmark />
        </button>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-4 md:gap-6 text-xs md:text-sm text-gray-600">
          <div className="flex justify-center items-center gap-1 ">
            <FaRegUser />
            <span>User Name</span>
          </div>
          <div className="flex justify-center items-center gap-1 ">
            <CiLocationOn />
            <span>{project.location}</span>
          </div>
          <div className="flex justify-center items-center gap-1 ">
            <TbMessage2Check />
            <span>Proposals</span>
          </div>
        </div>
      </div>
      <p className=" line-clamp-3 text-xs md:text-sm text-gray-600 ">
        {project.description}
      </p>
      <div className="flex justify-start items-center gap-6 text-sm md:text-base">
        <div className="flex justify-center items-center gap-1 text-primary bg-primary/30 rounded-full p-1 px-3  ">
          <RiMoneyDollarCircleLine />
          <span>{project.budget}</span>
        </div>
        <div className="flex justify-center items-center gap-1 text-primary bg-primary/30 rounded-full p-1 px-3  ">
          <IoMdTime />
          <span>{project.duration}</span>
        </div>
      </div>
      <div className="w-full flex justify-end px-2 items-center text-base md:text-xl">
        {user && <button className="flex justify-end items-center rounded-lg bg-primaryhover text-white gap- md:gap-2 p-1 px-2 md:px-3 ">
          <span className="text-sm md:text-xl">Add Proposal</span>
          <IoAdd />
        </button>}
      </div>
    </Link>
  );
};

export default ProjectCard;
