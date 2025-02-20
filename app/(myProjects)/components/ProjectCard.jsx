"use client";

import moment from "moment";
import { FaRegUser } from "react-icons/fa";
import { CiBookmark, CiLocationOn } from "react-icons/ci";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { TbMessage2Check } from "react-icons/tb";
import Link from "next/link";

const ProjectCard = ({ project }) => {
  return (
    <Link href={`/project-details?projectId=${project.id}`} className="w-full p-2 md:p-4 border rounded-xl shadow hover:shadow-md transition bg-white dark:bg-transparent  flex flex-col justify-start items-start gap-2 md:gap-3 ">
      <p className="text-xs md:text-sm text-gray-600">
        {moment(new Date(project.createdAt)).fromNow()}
      </p>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold line-clamp-1 whitespace-nowrap">{project.projectTitle}</h2>
        <p className={`rounded-full p-2 px-4  border ${project.status == "Open"? "text-indigo-700 bg-indigo-100":"text-primary bg-primary/10"}  text-base flex justify-center items-center `}>
          {project.status}
        </p>
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
          <span >{project.budget}</span>
        </div>
        <div className="flex justify-center items-center gap-1 text-primary bg-primary/30 rounded-full p-1 px-3  ">
          <IoMdTime />
          <span >{project.duration}</span>
        </div>
      </div>

    </Link>
  );
}

export default ProjectCard