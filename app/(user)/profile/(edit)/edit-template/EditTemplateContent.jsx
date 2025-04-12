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
import FilesSection from "../edit-project/EditFilesSection";
import InputField from "../edit-project/InputField";
import SkillsField from "../edit-project/SkillsField";
import FileInput from "../edit-project/FileInput";
import TextAreaField from "../edit-project/TextAreaField";
import SelectInput from "../edit-project/SelectInput";
import UserSkeleton from "@/app/components/sceletons/UserSkeleton";
import Spinner from "@/app/components/generalComps/Spinner";
import ConfirmModal from "../edit-project/ConfirmModal";

const EditTemplateContent = () => {
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [link, setLink] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const { translate, language } = useTranslation();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  // Fetch template data
  const { data: templateData, isLoading: isTemplateLoading } = useQuery(
    ["template", templateId],
    () =>
      axiosInstance
        .get(`/auth/freelancer/templates/${templateId}`)
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        const template = data.data;
        setName(template.name);
        setDescription(template.description);
        setCategoryId(template.category_id);
        setLink(template.link);
        setDeliveryTime(template.delivery_time);
        setStartPrice(template.start_price);
        setSkills(template.skills || []);
        setExistingFiles(template.files || []);
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

  const templateSchema = Yup.object().shape({
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
    delivery_time: Yup.string().required(
      translate("validation.delivery_time_required")
    ),
    start_price: Yup.number()
      .required(translate("validation.price_required"))
      .positive(translate("validation.price_positive")),
    skills: Yup.array().min(1, translate("validation.skills_required")),
    files: Yup.array(),
    cover_image: Yup.mixed(),
  });

  const updateTemplateMutation = useMutation(
    (data) =>
      axiosInstance.post(`/auth/freelancer/templates/${templateId}`, data),
    {
      onSuccess: () => {
        toast.success(translate("status.template_updated"));
        setErrors({});
        router.push(`/profile/${templateId}?type=template`);
      },
      onError: (error) => {
        toast.error(translate("status.error"));
        console.error("Failed to update template:", error);
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
      name,
      description,
      category_id: categoryId,
      link,
      delivery_time: deliveryTime,
      start_price: startPrice,
      skills,
      files: files,
    };

    try {
      await templateSchema.validate(dataToValidate, { abortEarly: false });
      setErrors({});

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category_id", categoryId);
      formData.append("link", link);
      formData.append("delivery_time", deliveryTime);
      formData.append("start_price", startPrice);
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

      updateTemplateMutation.mutate(formData);
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
          <span>{translate("templates.edit_template")}</span>
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

      {isTemplateLoading ? (
        <UserSkeleton />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 lg:grid-cols-[70%_28%] justify-between gap-4 mb-8"
        >
          <div>
            <SelectInput
              label={translate("templates.template_category")}
              value={categoryId}
              options={categories?.data || []}
              onChange={(value) => {
                setCategoryId(value);
                setErrors((prev) => ({ ...prev, categoryId: "" }));
              }}
              error={errors.categoryId}
              placeholder={translate("templates.select_category")}
            />

            <InputField
              label={translate("templates.template_name")}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              error={errors.name}
            />

            <InputField
              label={translate("templates.delivery_time")}
              type="text"
              value={deliveryTime}
              onChange={(e) => {
                setDeliveryTime(e.target.value);
                setErrors((prev) => ({ ...prev, delivery_time: "" }));
              }}
              placeholder={translate("templates.delivery_time_placeholder")}
              error={errors.delivery_time}
            />

            <InputField
              label={translate("templates.start_price")}
              type="number"
              value={startPrice}
              onChange={(e) => {
                setStartPrice(e.target.value);
                setErrors((prev) => ({ ...prev, start_price: "" }));
              }}
              error={errors.start_price}
            />

            <TextAreaField
              label={translate("templates.template_description")}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((prev) => ({ ...prev, description: "" }));
              }}
              error={errors.description}
            />

            <div className="flex flex-col">
              <label className="font-medium mb-2">
                {translate("templates.template_files")}
              </label>

              {existingFiles.length > 0 && (
                <FilesSection
                  files={existingFiles}
                  onRemove={handleRemoveExistingFile}
                />
              )}

              <FileInput
                label={translate("templates.upload_new_files")}
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
                {translate("templates.template_cover")}
              </label>
              {templateData?.data?.cover_image && !coverImage && (
                <div className="mb-4">
                  <h4 className="text-sm mb-2">
                    {translate("templates.current_cover")}
                  </h4>
                  <img
                    src={templateData.data.cover_image}
                    alt="Current cover"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}
              <FileInput
                label={translate("templates.change_cover")}
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
              label={translate("templates.template_url")}
              type="url"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
                setErrors((prev) => ({ ...prev, link: "" }));
              }}
              error={errors.link}
            />
          </div>
          <div className="mt-6 flex justify-end w-full">
            <MainBtn
              text={
                updateTemplateMutation.isLoading ? (
                  <Spinner />
                ) : (
                  translate("btns.update")
                )
              }
              loading={updateTemplateMutation.isLoading}
              disabled={updateTemplateMutation.isLoading}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditTemplateContent;