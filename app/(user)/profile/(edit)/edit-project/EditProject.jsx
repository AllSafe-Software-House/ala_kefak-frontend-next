"use client";
import axiosInstance from "@/app/providers/axiosConfig";
import { useTranslation } from "@/app/providers/Transslations";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import * as Yup from "yup";
import { useState } from "react";
import { MainBtn } from "@/app/components/generalComps/Btns";
import { useRouter, useSearchParams } from "next/navigation";
import FilesSection from "./EditFilesSection";
import InputField from "./InputField";
import SkillsField from "./SkillsField";
import FileInput from "./FileInput";
import TextAreaField from "./TextAreaField";
import SelectInput from "./SelectInput";
import ConfirmModal from "./ConfirmModal";
import UserSkeleton from "@/app/components/sceletons/UserSkeleton";
import Spinner from "@/app/components/generalComps/Spinner";

const EditProjectContent = () => {
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [projectLink, setProjectLink] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const { translate, language } = useTranslation();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();
  // Fetch project data
  const { data: projectData, isLoading: isProjectLoading } = useQuery(
    ["project", projectId],
    () =>
      axiosInstance
        .get(`/auth/freelancer/projects/${projectId}`)
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        const project = data.data;
        setTitle(project.name);
        setDescription(project.description);
        setCategoryId(project.category_id);
        setProjectLink(project.link);
        setDate(project.date);
        setSkills(project.skills || []);
        setExistingFiles(project.files || []);
      },
    }
  );

  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    "categories",
    () => axiosInstance.get("/categories").then((res) => res.data)
  );

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
    setErrors((prev) => ({ ...prev, files: "" }));
  };

  const handleCoverImageChange = (file) => {
    setCoverImage(file[0]);
    setErrors((prev) => ({ ...prev, coverImage: "" }));
  };

  const projectSchema = Yup.object().shape({
    name: Yup.string().required(translate("validation.title_required")),
    description: Yup.string().required(
      translate("validation.description_required")
    ),
    category_id: Yup.string().required(
      translate("validation.category_required")
    ),
    link: Yup.string()
      .url(translate("validation.link_invalid"))
      .required(translate("validation.link_required")),
    date: Yup.string().required(translate("validation.date_required")),
    skills: Yup.array().min(1, translate("validation.skills_required")),
    files: Yup.array(),
    cover_image: Yup.mixed(),
  });

  const updateProjectMutation = useMutation(
    (data) =>
      axiosInstance.post(`/auth/freelancer/projects/${projectId}`, data),
    {
      onSuccess: () => {
        toast.success(translate("status.project_updated"));
        setErrors({});
        router.push(`/profile/${projectId}?type=project`);
      },
      onError: (error) => {
        toast.error(translate("status.error"));
        console.error("Failed to update project:", error);
      },
    }
  );

  const deleteFileMutation = useMutation(
    (fileId) => axiosInstance.delete(`/auth/image/delete/${fileId}`),
    {
      onSuccess: () => {
        setExistingFiles((prevFiles) =>
          prevFiles.filter((file) => file.id !== fileToDelete)
        );
        toast.success(translate("status.file_deleted"));
        setFileToDelete(null);
      },
      onError: (error) => {
        console.error("Failed to delete file:", error);
        toast.error(translate("status.delete_error"));
        setFileToDelete(null);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToValidate = {
      name: title,
      description,
      category_id: categoryId,
      link: projectLink,
      date,
      skills,
      files: files,
      // cover_image: coverImage,
    };

    try {
      await projectSchema.validate(dataToValidate, { abortEarly: false });
      setErrors({});

      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);
      formData.append("category_id", categoryId);
      formData.append("link", projectLink);
      formData.append("date", date);
      if (coverImage) {
        formData.append("cover_image", coverImage);
      }
      formData.append("_method", "put");

      skills.forEach((skill, index) => {
        formData.append(`skills[${index}]`, skill.id);
      });

      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      updateProjectMutation.mutate(formData);
    } catch (validationError) {
      const errorMap = {};
      validationError.inner.forEach((err) => {
        errorMap[err.path] = err.message;
        toast.error(err.message);
      });
      setErrors(errorMap);
    }
  };

  const handleRemoveExistingFile = async (fileId) => {
    try {
      const formData = new FormData();
      formData.append("image_id", fileId);

      await axiosInstance.post("/auth/image/delete", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setExistingFiles((prevFiles) =>
        prevFiles.filter((file) => file.id !== fileId)
      );
      toast.success(translate("status.file_deleted"));
    } catch (error) {
      console.error("Failed to delete file:", error);
      toast.error(translate("status.delete_error"));
    }
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      deleteFileMutation.mutate(fileToDelete);
    }
    setShowConfirmModal(false);
  };

  const cancelDelete = () => {
    setFileToDelete(null);
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen w-[90%] mx-auto p-6 px-3 md:px-8 lg:px-16 flex flex-col gap-16 bg-gray-100 dark:bg-transparent">
      <div className="head text-3xl mt-3">
        <Link
          className="flex justify-start items-center gap-4 font-medium"
          href={"/profile"}
        >
          {language === "en" ? <FaArrowLeft /> : <FaArrowRight />}
          <span>{translate("projects.edit_project")}</span>
        </Link>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          modalMessage={modalMessage}
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
          translate={translate}
          language={language}
        />
      )}

      {isProjectLoading ? (
        <UserSkeleton />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 lg:grid-cols-[70%_28%] justify-between gap-4 mb-8"
        >
          <div>
            <SelectInput
              label={translate("projects.project_category")}
              value={categoryId}
              options={categories?.data || []}
              onChange={(value) => {
                setCategoryId(value);
                setErrors((prev) => ({ ...prev, categoryId: "" }));
              }}
              error={errors.categoryId}
              placeholder={translate("projects.select_category")}
            />

            <InputField
              label={translate("projects.project_name")}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((prev) => ({ ...prev, title: "" }));
              }}
              error={errors.title}
            />

            <InputField
              label={translate("projects.project_date")}
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setErrors((prev) => ({ ...prev, date: "" }));
              }}
              error={errors.date}
            />

            <TextAreaField
              label={translate("projects.project_description")}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((prev) => ({ ...prev, description: "" }));
              }}
              error={errors.description}
            />

            <div className="flex flex-col">
              <label className="font-medium mb-2">
                {translate("projects.project_files")}
              </label>

              {existingFiles.length > 0 && (
                <FilesSection
                  files={existingFiles}
                  onRemove={handleRemoveExistingFile}
                />
              )}

              <FileInput
                label={translate("projects.upload_new_files")}
                fileNames={files.map((file) => file.name)}
                onFileChange={handleFileChange}
                errors={errors.files}
                multiple={true}
              />
            </div>

            <div className="flex flex-col">
              <SkillsField onSkillsChange={setSkills} initialSkills={skills} />
            </div>
          </div>

          <div>
            <div className="flex flex-col">
              <label className="font-medium mb-2">
                {translate("projects.project_cover")}
              </label>
              {projectData?.data?.cover_image && !coverImage && (
                <div className="mb-4">
                  <h4 className="text-sm mb-2">
                    {translate("projects.current_cover")}
                  </h4>
                  <img
                    src={projectData.data.cover_image}
                    alt="Current cover"
                    className="max-w-full h-auto rounded"
                  />
                </div>
              )}
              <FileInput
                label={translate("projects.change_cover")}
                fileNames={coverImage ? [coverImage.name] : []}
                onFileChange={handleCoverImageChange}
                errors={errors.coverImage}
                multiple={false}
              />
              {errors.coverImage && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.coverImage}
                </span>
              )}
            </div>

            <InputField
              label={translate("projects.project_url")}
              type="url"
              value={projectLink}
              onChange={(e) => {
                setProjectLink(e.target.value);
                setErrors((prev) => ({ ...prev, projectLink: "" }));
              }}
              error={errors.projectLink}
            />
          </div>
          <div className="mt-6 flex justify-end w-full">
            <MainBtn
              text={
                updateProjectMutation.isLoading ? (
                  <Spinner />
                ) : (
                  translate("btns.update")
                )
              }
              loading={updateProjectMutation.isLoading}
              disabled={updateProjectMutation.isLoading}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProjectContent;
