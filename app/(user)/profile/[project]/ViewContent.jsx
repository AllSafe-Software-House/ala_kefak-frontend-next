"use client";
import {
  MainBtn,
  SecondaryBtn,
  DangerBtn,
} from "@/app/components/generalComps/Btns";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import UserSkeleton from "@/app/components/sceletons/UserSkeleton";
import axiosInstance from "@/app/providers/axiosConfig";
import { useTranslation } from "@/app/providers/Transslations";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaEdit,
  FaEye,
  FaFileAudio,
  FaFilePdf,
  FaTrash,
} from "react-icons/fa";
import { useQuery, useMutation } from "react-query";

const ViewContent = ({ projectId }) => {
  const { translate, language } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");
  const translationType = type === "template" ? "templates" : "projects";
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(() => () => {});

  const {
    data: projectData,
    isLoading,
    error,
  } = useQuery([projectId, type], async () => {
    const endpoint =
      type === "template"
        ? `/auth/freelancer/templates/${projectId}`
        : `/auth/freelancer/projects/${projectId}`;

    const response = await axiosInstance.get(endpoint);
    return response.data;
  });

  const deleteMutation = useMutation(
    () => {
      const endpoint =
        type === "template"
          ? `/auth/freelancer/templates/${projectId}`
          : `/auth/freelancer/projects/${projectId}`;
      return axiosInstance.delete(endpoint);
    },
    {
      onSuccess: () => {
        router.push("/profile");
      },
    }
  );

  const handleDelete = () => {
    setModalMessage(translate("notify.confirm_delete"));
    setModalAction(() => () => {
      deleteMutation.mutate();
      setShowConfirmModal(false);
    });
    setShowConfirmModal(true);
  };

  useEffect(() => {
    console.log(projectData?.data);
  }, [projectData]);

  if (isLoading) return <UserSkeleton />;
  if (error) return <ErrorPage />;

  return (
    <div className="min-h-screen w-[90%] mx-auto p-6 px-3 md:px-8 lg:px-16 mt-12 flex flex-col gap-16 bg-gray-100 dark:bg-transparent">
      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] p-4">
          <div className="bg-white dark:bg-darknav rounded-lg p-6 max-w-md w-full border dark:border-gray-700 shadow-xl">
            <h3 className="text-lg font-medium mb-4 dark:text-white text-center">
              {modalMessage}
            </h3>
            <div
              className={`flex ${
                language === "ar" ? "flex-row-reverse" : "flex-row"
              } justify-center gap-4`}
            >
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {translate("btns.cancel")}
              </button>
              <button
                onClick={() => modalAction()}
                className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                {translate("btns.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full text-3xl flex justify-between items-center">
        <Link
          className="flex justify-start items-center gap-4 font-medium"
          href={"/profile"}
        >
          {language == "en" ? (
            <FaArrowLeft className="text-3xl" />
          ) : (
            <FaArrowLeft className="text-3xl rotate-180" />
          )}
          <span className="whitespace-nowrap">{projectData?.data?.name}</span>
        </Link>

        <div className="w-full flex justify-end items-center gap-4 text-xl">
          <MainBtn
            classNames="flex justify-center items-center gap-2"
            text={
              <>
                <span>{translate("btns.view")}</span>
                <FaEye />
              </>
            }
          />
          <Link
            href={
              type === "template"
                ? `/profile/edit-template?templateId=${projectData?.data?.id}&type=${type}`
                : `/profile/edit-project?projectId=${projectData?.data?.id}&type=${type}`
            }
          >
            <SecondaryBtn
              classNames="flex justify-center items-center gap-2"
              text={
                <>
                  <span>{translate("btns.edit")}</span>
                  <FaEdit />
                </>
              }
            />
          </Link>

          <DangerBtn
            classNames="flex justify-center items-center gap-2"
            onClick={handleDelete}
            isLoading={deleteMutation.isLoading}
            text={
              <>
                <span>{translate("btns.delete")}</span>
                <FaTrash />
              </>
            }
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-[70%_28%] justify-between gap-4 mb-8">
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <ProjectDetails title={translate(`${translationType}.${type}_about`)}>
            <p>{projectData?.data?.description}</p>
          </ProjectDetails>

          <ProjectDetails
            title={translate(`${translationType}.${type}_details`)}
          >
            {projectData?.data?.cover_image && (
              <img
                src={projectData?.data?.cover_image}
                alt="Cover"
                className="w-full h-full max-h-[500px] rounded-xl object-cover"
              />
            )}
          </ProjectDetails>
          {projectData?.data?.files?.length > 0 && (
            <ProjectDetails
              title={translate(`${translationType}.${type}_files`)}
            >
              <ProjectFiles files={projectData?.data?.files} />
            </ProjectDetails>
          )}
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          <ProjectDetails title={translate(`${translationType}.${type}_data`)}>
            <ProjectInfo
              label={translate(`${translationType}.${type}_category`)}
              value={projectData?.data?.category_name}
            />
            <ProjectInfo
              label={translate(`${translationType}.freelancer_name`)}
              value={projectData?.data?.user_name}
            />
            {projectData?.data?.date && (
              <ProjectInfo
                label={translate(`${translationType}.${type}_date`)}
                value={projectData?.data?.date}
              />
            )}

            {type === "template" && (
              <>
                <ProjectInfo
                  label={translate(`${translationType}.template_price`)}
                  value={`${projectData?.data?.start_price} $`}
                />
                <ProjectInfo
                  label={translate(`${translationType}.delivery_time`)}
                  value={`${projectData?.data?.delivery_time} ${translate(
                    "gen.days"
                  )}`}
                />
              </>
            )}
          </ProjectDetails>

          {projectData?.data?.skills?.length > 0 && (
            <ProjectDetails
              title={translate(`${translationType}.${type}_skills`)}
            >
              <Skills skills={projectData?.data?.skills} />
            </ProjectDetails>
          )}

          <ProjectDetails title={translate(`${translationType}.${type}_url`)}>
            {projectData?.data?.link ? (
              <Link
                dir="ltr"
                href={projectData?.data?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-600 hover:underline"
              >
                {projectData?.data?.link}
              </Link>
            ) : (
              translate("general.no_link")
            )}
          </ProjectDetails>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ProjectDetails = ({ title, children }) => {
  return (
    <div className="w-full bg-white dark:bg-darknav dark:border-darkinput dark:text-gray-300 border-2 rounded-2xl flex flex-col justify-start items-start p-2 md:p-6 gap-4">
      <h2 className="text-3xl font-medium">{title}</h2>
      {children}
    </div>
  );
};

const Skills = ({ skills }) => {
  return (
    <div className="w-full flex justify-start items-center flex-wrap gap-2 md:gap-3">
      {skills?.map((skill, i) => (
        <span
          key={i}
          className="text-gray-500 rounded-full text-sm md:text-base p-2 px-3 md:px-4 border-gray-800 bg-gray-100 dark:bg-darkinput dark:border-darkinput dark:text-gray-300"
        >
          {skill?.name}
        </span>
      ))}
    </div>
  );
};

const ProjectFiles = ({ files }) => {
  const { translate, language } = useTranslation();

  const getFileType = (file) => {
    // const extension = fileUrl?.split(".").pop()?.toLowerCase();
    if (file.type.startsWith("image/")) return "image";
    if (file.type === "application/pdf") return "pdf";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    return "other";
  };

  if (!files || files.length === 0) return null;

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {files?.map((file, i) => {
        const fileType = getFileType(file);
        const fileName = file?.url.split("/").pop();

        switch (fileType) {
          case "image":
            return (
              <div key={i} className="relative group">
                <img
                  src={file?.url}
                  alt={`Project Image ${i + 1}`}
                  className="w-full h-full max-h-[500px] rounded-xl object-cover object-top "
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                  {fileName}
                </div>
              </div>
            );

          case "pdf":
            return (
              <a
                key={i}
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all border-gray-800 bg-gray-100 dark:bg-darkinput dark:border-darkinput dark:text-gray-300 rounded-lg overflow-hidden"
              >
                <div className="p-4 flex items-center gap-3">
                  <FaFilePdf className="text-red-600 text-5xl" />
                  {fileName}
                </div>
              </a>
            );

          case "video":
            return (
              <div key={i} className="relative">
                <video
                  controls
                  className="w-full max-h-[500px] rounded-xl bg-black"
                >
                  <source src={file?.url} type={file.type} />
                  {translate("general.video_not_supported")}
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                  {fileName}
                </div>
              </div>
            );

          case "audio":
            return (
              <div
                key={i}
                className="border rounded-lg p-4 flex items-center gap-3"
              >
                <FaFileAudio className="text-blue-600 text-5xl" />
                <audio controls className="flex-1">
                  <source
                    src={file?.url}
                    type={`audio/${file?.url.split(".").pop()}`}
                  />
                  {translate("general.audio_not_supported")}
                </audio>
              </div>
            );

          default:
            return (
              <div
                key={i}
                className="border rounded-lg p-4 flex items-center gap-3"
              >
                <div className="bg-gray-100 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <a
                  href={file?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {fileName}
                </a>
              </div>
            );
        }
      })}
    </div>
  );
};

const ProjectInfo = ({ label, value }) => {
  return (
    <p className="w-full flex justify-between items-center">
      <span className="font-medium">{label}</span>
      <span className="text-right">{value || "-"}</span>
    </p>
  );
};

export default ViewContent;
