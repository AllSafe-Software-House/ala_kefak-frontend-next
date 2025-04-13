"use client";
import { useState } from "react";
import EducationItem from "../UIItems/EducationItem";
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

const Education = ({ user, openModal, closeModal }) => {
  const [education, setEducation] = useState(user.educations || []);
  const { translate } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { showConfirmation } = useConfirmation();

  const handleSave = async (updatedEducation) => {
    setIsLoading(true);
    try {
      // Get the difference between initial and updated education
      const newEducation = updatedEducation.filter(
        (edu) => !education.some((oldEdu) => oldEdu.id === edu.id)
      );

      // Update existing education
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
                formData.append(key, value);
              }
            });

            await axiosInstance.post(
              `/auth/freelancer/educations/${oldEdu.id}`,
              formData
            );
          }
        });

      // Add new education
      const addPromises = newEducation.map(async (edu) => {
        const formData = new FormData();
        Object.entries(edu).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        });

        const response = await axiosInstance.post(
          "/auth/freelancer/educations",
          formData
        );
        return response.data.data;
      });

      await Promise.all([...updatePromises, ...addPromises]);

      // Fetch updated education
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
        initialEducation={education}
        onSave={handleSave}
        closeModal={closeModal}
        isEditing={false}
        isLoading={isLoading}
        translate={translate}
      />
    );
  };

  const handleEdit = () => {
    openModal(
      <EducationForm
        initialEducation={education}
        onSave={handleSave}
        closeModal={closeModal}
        isEditing={true}
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
          education.map((item) => (
            <EducationItem key={item.id} item={item} />
          ))
        ) : (
          <p className="text-gray-500">{translate("profile.no_education")}</p>
        )}
      </div>
    </div>
  );
};

export default Education;

const EducationForm = ({
  initialEducation,
  onSave,
  closeModal,
  isEditing,
  isLoading,
  translate,
}) => {
  const [education, setEducation] = useState(initialEducation);
  const [formData, setFormData] = useState({
    departement: "",
    university: "",
    from_date: "",
    to_date: "",
    description: "",
    link: "",
  });
  const [errors, setErrors] = useState({});
  const { showConfirmation } = useConfirmation();

  // Validation schema
  const educationSchema = Yup.object().shape({
    departement: Yup.string().required(translate("validation.departement_required")),
    university: Yup.string().required(translate("validation.university_required")),
    from_date: Yup.string().required(translate("validation.date_required")),
    to_date: Yup.string().required(translate("validation.date_required")),
    description: Yup.string().required(translate("validation.description_required")),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSaveEducation = async () => {
    try {
      await educationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const updatedEducation = isEditing
        ? education.map((edu) =>
            edu.id === formData.id ? { ...formData } : edu
          )
        : [...education, { ...formData, id: Date.now() }];

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
          setEducation((prev) => prev.filter((edu) => edu.id !== id));
          toast.success(translate("status.education_deleted"));
        }
      });
    } catch (error) {
      if (error !== 'cancelled') {
        toast.error(translate("status.delete_error"));
        console.error("Delete error:", error);
      }
    }
  };

  const handleEditEducation = (edu) => {
    setFormData({
      id: edu.id,
      departement: edu.departement || "",
      university: edu.university || "",
      from_date: edu.from_date || "",
      to_date: edu.to_date || "",
      description: edu.description || "",
      link: edu.link || "",
    });
    setErrors({});
  };

  return (
    <div className="flex flex-col gap-4" data-lenis-prevent="true">
      <h1 className="text-3xl">
        {isEditing
          ? translate("profile.edit_education")
          : translate("profile.add_education")}
      </h1>

      {isEditing && (
        <div
          className="flex flex-col gap-2 px-2 max-h-[200px] overflow-y-scroll"
          data-lenis-prevent="true"
        >
          {education.map((edu) => (
            <div
              key={edu.id}
              className="flex items-center justify-between p-2 border rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300"
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
                  className="text-red-500"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <TextInput
          label={`${translate("profile.degree")}`}
          name="departement"
          value={formData.departement}
          onChange={handleInputChange}
          error={errors.departement}
        />

        <TextInput
          label={`${translate("profile.institution")}`}
          name="university"
          value={formData.university}
          onChange={handleInputChange}
          error={errors.university}
        />

        <div className="w-full flex justify-center items-center gap-4">
          <DateInput
            label={`${translate("profile.start_date")}`}
            name="from_date"
            value={formData.from_date}
            onChange={handleInputChange}
            error={errors.from_date}
          />

          <DateInput
            label={translate("profile.end_date")}
            name="to_date"
            value={formData.to_date}
            onChange={handleInputChange}
            error={errors.to_date}
          />
        </div>

        <TextAreaInput
          label={translate("profile.field_of_study")}
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={8}
          error={errors.description}
        />

        <TextInput
          label={translate("profile.link")}
          name="link"
          value={formData.link}
          onChange={handleInputChange}
          placeholder="https://example.com"
          error={errors.link}
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
    </div>
  );
};



const TextInput = ({ label, name, value, onChange, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="font-medium" htmlFor={name}>
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 outline-none ${
        error ? "!border-red-500" : ""
      }`}
      {...props}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

const DateInput = ({ label, name, value, onChange, error, ...props }) => (
  <div className="w-full flex flex-col gap-1">
    <label className="font-medium" htmlFor={name}>
      {label}
    </label>
    <input
      type="date"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 outline-none ${
        error ? "!border-red-500" : ""
      }`}
      {...props}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

const TextAreaInput = ({
  label,
  name,
  value,
  onChange,
  error,
  rows = 4,
  ...props
}) => (
  <div className="flex flex-col gap-1">
    <label className="font-medium" htmlFor={name}>
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 resize-none outline-none ${
        error ? "!border-red-500" : ""
      }`}
      {...props}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);
