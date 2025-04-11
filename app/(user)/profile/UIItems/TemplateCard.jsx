"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import EditBtn from "./EditBtn";

const TemplateCard = ({ project }) => {
  const router = useRouter();
  
  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault(); 
    router.push(`/profile/edit-template?templateId=${project.id}&type=template`);
  };

  return (
    <Link
      href={`/profile/${project.id}?type=template`}
      className="mt-4 grid grid-cols-1 gap-4 relative group"
    >
      <div className="h-48 bg-gray-200 rounded-lg overflow-hidden relative">
        <EditBtn
          onClick={handleEditClick}
          text={<MdEdit className="text-gray-600" size={20} />}
          classNames="absolute top-2 right-2 bg-primary text-white group-hover:opacity-100 opacity-0 z-[90] transition-opacity duration-200"
        />

        <img
          src={project.cover_image}
          alt="template"
          className="w-full h-full object-cover"
        />
      </div>
      <div>{project.name}</div>
    </Link>
  );
};

export default TemplateCard;