"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import EditBtn from "./EditBtn";

const ProjectCard = ({ project }) => {
  const router = useRouter();
  
  const handleEditClick = (e) => {
    e.stopPropagation(); 
    e.preventDefault(); 
    router.push(`/profile/edit-project?projectId=${project.id}&type=project`);
  };

  return (
    <Link
      href={`/profile/${project.id}?type=project`}
      className="mt-4 grid grid-cols-1 gap-4 z-10"
    >
      <div className="h-48 bg-gray-200 rounded-lg overflow-hidden relative group">
        <EditBtn
          onClick={handleEditClick}
          text={<MdEdit className="text-gray-600" size={20} />}
          classNames="absolute top-2 right-2 bg-primary text-white group-hover:opacity-100 opacity-0 z-[90] animation"
        />

        <img
          src={project.cover_image}
          alt="project"
          className="w-full h-full object-cover"
        />
      </div>
      <div>{project.name}</div>
    </Link>
  );
};

export default ProjectCard;