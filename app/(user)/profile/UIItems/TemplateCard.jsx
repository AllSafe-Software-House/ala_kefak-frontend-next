"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdEdit, MdDelete, MdMoreVert, MdClose } from "react-icons/md";
import { useState } from "react";
import { useConfirmation } from "@/app/providers/SecondaryProvider";
import { useTranslation } from "@/app/providers/Transslations";
import axiosInstance from "@/app/providers/axiosConfig";
import { toast } from "sonner";

const TemplateCard = ({ project, setuserTemplates }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showConfirmation } = useConfirmation();
  const { translate } = useTranslation();

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowMenu(false);
    router.push(`/profile/edit-template?templateId=${project.id}&type=template`);
  };

  const handleDeleteTemplate = async (templateId) => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/auth/freelancer/templates/${templateId}`);
      toast.success(translate("status.template_deleted"));
      setuserTemplates((prevTemplates) => prevTemplates.filter((tmpl) => tmpl.id !== templateId));
    } catch (error) {
      console.error("Error deleting template:", error);
      toast.error(error.response?.data?.message || translate("status.delete_error"));
    } finally {
      setIsDeleting(false);
      setShowMenu(false);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowMenu(false);

    showConfirmation({
      message: translate("confirmation.delete_template"),
      confirmText: isDeleting ? translate("btns.deleting") : translate("btns.delete"),
      onConfirm: () => handleDeleteTemplate(project.id),
      isLoading: isDeleting,
    });
  };

  return (
    <Link
      href={`/profile/${project.id}?type=template`}
      className="mt-4 grid grid-cols-1 gap-1 z-10 relative group"
      onClick={() => showMenu && setShowMenu(false)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <div className="h-48 bg-gray-200 rounded-lg overflow-hidden relative group">
        <button
          onClick={handleMenuToggle}
          className="absolute top-2 right-2 bg-white/80 text-gray-700 p-2 rounded-full hover:bg-white transition-all z-[90] shadow-md group-hover:opacity-100 opacity-0 animation"
          aria-label="Template actions"
        >
          {showMenu ? <MdClose size={20} className="rotate-90 text-danger " /> : <MdMoreVert size={20} className="rotate-90 text-primary " />}
        </button>

        {showMenu && (
          <div
            className="absolute top-12 right-2 bg-white rounded-md shadow-lg z-[100] py-1  w-fit border dark:bg-darknav dark:border-darkinput"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleEditClick}
              className="w-full text-left px-8 py-2 hover:text-primary animation flex items-center gap-2"
            >
              {translate("btns.edit")}
            </button>
            <button
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="w-full text-left px-8 py-2 hover:text-danger animation flex items-center gap-2  disabled:opacity-50"
            >
              {isDeleting ? translate("btns.deleting") : translate("btns.delete")}
            </button>
          </div>
        )}

        <img
          src={project.cover_image || "/default-template.jpg"}
          alt="template"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/default-template.jpg";
          }}
        />
      </div>
      <div className="font-medium dark:text-gray-300">{project.name}</div>
      <div className="text-sm font-medium dark:text-gray-200"> <span className="text-gray-400">{translate("templates.start_price")}</span> {project.start_price} $</div>
    </Link>
  );
};

export default TemplateCard;
