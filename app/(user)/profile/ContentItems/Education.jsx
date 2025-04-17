"use client";
import { useState } from "react";
import Heading from "../UIItems/Heading";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";
import axiosInstance from "@/app/providers/axiosConfig";
import { toast } from "sonner";
import Spinner from "@/app/components/generalComps/Spinner";
import * as Yup from "yup";
import { useConfirmation } from "@/app/providers/SecondaryProvider";
import {
  DateInput,
  FileInput,
  TextAreaInput,
  TextInput,
} from "@/app/components/generalComps/inputs/GenInputs";
import Link from "next/link";

const Education = ({ user, openModal, closeModal }) => {
  const [education, setEducation] = useState(user.educations || []);
  const { translate } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (updatedEducation) => {
    setIsLoading(true);
    try {
      const newEducation = updatedEducation.filter(
        (edu) => !education.some((oldEdu) => oldEdu.id === edu.id)
      );
      const updatePromises = education
        .filter((oldEdu) =>
          updatedEducation.some((edu) => edu.id === oldEdu.id)
        )
        .map(async (oldEdu) => {
          const updatedEdu = updatedEducation.find(
            (edu) => edu.id === oldEdu.id
          );
          if (JSON.stringify(oldEdu) !== JSON.stringify(updatedEdu)) {
            const formData = new FormData();
            formData.append("_method", "put");
            Object.entries(updatedEdu).forEach(([key, value]) => {
              if (value !== null && value !== undefined) {
                if (key === "file" && typeof value === "object") {
                  formData.append(key, value);
                } else {
                  formData.append(key, value);
                }
              }
            });

            await axiosInstance.post(
              `/auth/freelancer/educations/${oldEdu.id}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }
        });

      const addPromises = newEducation.map(async (edu) => {
        const formData = new FormData();
        Object.entries(edu).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (key === "file" && typeof value === "object") {
              formData.append(key, value);
            } else {
              formData.append(key, value);
            }
          }
        });
        const response = await axiosInstance.post(
          "/auth/freelancer/educations",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data.data;
      });

      await Promise.all([...updatePromises, ...addPromises]);
      const response = await axiosInstance.get("/auth/freelancer/educations");
      setEducation(response.data.data);
      toast.success(translate("status.education_updated"));
    } catch (error) {
      console.error("Error saving education:", error);
      toast.error(translate("status.error"));
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const handleAdd = () => {
    openModal(
      <EducationForm
        education={education}
        onSave={handleSave}
        closeModal={closeModal}
        mode="add"
        isLoading={isLoading}
        translate={translate}
      />
    );
  };

  const handleEdit = () => {
    openModal(
      <EducationForm
        education={education}
        onSave={handleSave}
        closeModal={closeModal}
        mode="edit"
        isLoading={isLoading}
        translate={translate}
      />
    );
  };

  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading
        text={translate("profile.education")}
        actions={[
          <SecondaryBtn
            key="add"
            text={translate("btns.add")}
            onClick={handleAdd}
          />,
          education.length > 0 && (
            <SecondaryBtn
              key="edit"
              text={<MdOutlineEdit />}
              onClick={handleEdit}
              classNames="!rounded-full border text-lg md:text-2xl !p-3"
            />
          ),
        ]}
      />
      <div className="w-full grid grid-cols-1 gap-4">
        {education.length > 0 ? (
          education.map((item) => <EducationItem key={item.id} item={item} />)
        ) : (
          <p className="text-gray-500">{translate("profile.no_education")}</p>
        )}
      </div>
    </div>
  );
};

const EducationForm = ({
  education,
  onSave,
  closeModal,
  mode,
  isLoading,
  translate,
}) => {
  const [formData, setFormData] = useState({
    departement: "",
    university: "",
    from_date: "",
    to_date: "",
    description: "",
    file: null,
  });
  const [selectedId, setSelectedId] = useState(null);
  const [errors, setErrors] = useState({});
  const { showConfirmation } = useConfirmation();

  const educationSchema = Yup.object().shape({
    departement: Yup.string().required(
      translate("validation.departement_required")
    ),
    university: Yup.string().required(
      translate("validation.university_required")
    ),
    from_date: Yup.string().required(translate("validation.date_required")),
    to_date: Yup.string().required(translate("validation.date_required")),
    description: Yup.string().required(
      translate("validation.description_required")
    ),
    file: Yup.mixed()
      .required(translate("validation.file_required"))
      .test("fileType", translate("validation.invalid_file_type"), (value) => {
        if (!value) return true;
        if (typeof value === "string") return true;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      }),
  });

  const isEditing = mode === "edit";
  const isAdding = mode === "add";
  const showForm = isAdding || selectedId;

  const selectedEducation =
    education.find((edu) => edu.id === selectedId) || null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      if (errors.file) {
        setErrors((prev) => ({ ...prev, file: "" }));
      }
    }
  };

  const handleSaveEducation = async () => {
    try {
      await educationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const updatedEducation = isEditing
        ? education.map((edu) =>
            edu.id === selectedId ? { ...formData, id: selectedId } : edu
          )
        : [...education, { ...formData }];

      onSave(updatedEducation);
    } catch (validationError) {
      const errorMap = {};
      validationError.inner.forEach((err) => {
        errorMap[err.path] = err.message;
        toast.error(err.message);
      });
      setErrors(errorMap);
    }
  };

  const handleDeleteEducation = async (id) => {
    try {
      await showConfirmation({
        message: translate("status.confirm_delete"),
        onConfirm: async () => {
          await axiosInstance.delete(`/auth/freelancer/educations/${id}`);
          const updatedEducation = education.filter((edu) => edu.id !== id);
          onSave(updatedEducation);
          toast.success(translate("status.education_deleted"));
        },
      });
    } catch (error) {
      if (error !== "cancelled") {
        toast.error(translate("status.delete_error"));
        console.error("Delete error:", error);
      }
    }
  };

  const handleEditEducation = (edu) => {
    setSelectedId(edu.id);
    setFormData({
      departement: edu.departement || "",
      university: edu.university || "",
      from_date: edu.from_date || "",
      to_date: edu.to_date || "",
      description: edu.description || "",
      file: edu.file_path || null,
    });
    setErrors({});
  };

  const handleAddNew = () => {
    setSelectedId(null);
    setFormData({
      departement: "",
      university: "",
      from_date: "",
      to_date: "",
      description: "",
      file: null,
    });
  };

  return (
    <div className="flex flex-col gap-4" data-lenis-prevent="true">
      <h1 className="text-3xl">
        {isEditing
          ? translate("profile.edit_education")
          : translate("profile.add_education")}
      </h1>

      {isEditing && (
        <div className="flex flex-col gap-2 px-2 max-h-[200px] overflow-y-scroll">
          {education.map((edu) => (
            <div
              key={edu.id}
              className={`flex items-center justify-between p-2 border rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 ${
                selectedId === edu.id ? "border-primary" : ""
              }`}
            >
              <p className="line-clamp-1">{`${edu.departement} | ${edu.university}`}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditEducation(edu)}
                  className="text-primary"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteEducation(edu.id)}
                  className="text-redwarn"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <>
          <div className="flex flex-col gap-4">
            <TextInput
              label={`${translate("profile.degree")}`}
              name="departement"
              value={formData.departement}
              onChange={handleInputChange}
              error={errors.departement}
              required
            />

            <TextInput
              label={`${translate("profile.institution")}`}
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              error={errors.university}
              required
            />

            <div className="w-full flex justify-center items-center gap-4">
              <DateInput
                label={`${translate("profile.start_date")}`}
                name="from_date"
                value={formData.from_date}
                onChange={handleInputChange}
                error={errors.from_date}
                required
              />

              <DateInput
                label={translate("profile.end_date")}
                name="to_date"
                value={formData.to_date}
                onChange={handleInputChange}
                error={errors.to_date}
                required
              />
            </div>

            <TextAreaInput
              label={translate("profile.field_of_study")}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={8}
              error={errors.description}
              required
            />

            <FileInput
              label={translate("profile.certificate_file")}
              name="file"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
              multiple={false}
              error={errors.file}
              required
            />
          </div>

          <div className="w-full flex justify-end items-center gap-4 my-4">
            <SecondaryBtn
              text={translate("btns.cancel")}
              onClick={closeModal}
              classNames="text-lg"
              disabled={isLoading}
            />

            <MainBtn
              text={isLoading ? <Spinner /> : translate("btns.save")}
              onClick={handleSaveEducation}
              classNames="text-lg"
              disabled={isLoading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Education;



const EducationItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { translate } = useTranslation();
return (
  <div dir="ltr" className="mt-4 grid grid-cols-1 gap-2">
    <h1 className="text-base md:text-xl font-medium">{`${item.university} | ${item.departement}`}</h1>
    <p className="text-xs md:text-sm">{`${item.from_date} - ${item.to_date}`}</p>
    <div>
        <p
          className={`text-sm md:text-base ${isExpanded ? "" : "line-clamp-1"}`}
        >
          {item.description}
        </p>
        {item.description.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary text-base mt-1 hover:underline animation"
          >
            {isExpanded
              ? translate("profile.show_less")
              : translate("profile.show_more")}
          </button>
        )}
      </div>
      <Link href={item.file} target="_blank" className="text-primary text-sm hover:underline animation">
        {translate("btns.view")}
      </Link>
  </div>
);
};