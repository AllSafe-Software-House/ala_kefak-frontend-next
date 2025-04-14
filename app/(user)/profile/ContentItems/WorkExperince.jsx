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
import { DateInput, TextAreaInput, TextInput } from "@/app/components/generalComps/inputs/GenInputs";

const WorkExperince = ({ user, openModal, closeModal }) => {
  const [workExperiences, setWorkExperiences] = useState(
    user.experiences || []
  );
  const { translate } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (updatedExperiences) => {
    setIsLoading(true);
    try {
      const newExperiences = updatedExperiences.filter(
        (exp) => !workExperiences.some((oldExp) => oldExp.id === exp.id)
      );

      const updatePromises = workExperiences
        .filter((oldExp) =>
          updatedExperiences.some((exp) => exp.id === oldExp.id)
        )
        .map(async (oldExp) => {
          const updatedExp = updatedExperiences.find(
            (exp) => exp.id === oldExp.id
          );
          if (JSON.stringify(oldExp) !== JSON.stringify(updatedExp)) {
            const formData = new FormData();
            formData.append("_method", "put");
            Object.entries(updatedExp).forEach(([key, value]) => {
              if (value !== null && value !== undefined) {
                formData.append(key, value);
              }
            });

            await axiosInstance.post(
              `/auth/freelancer/experiences/${oldExp.id}`,
              formData
            );
          }
        });

      const addPromises = newExperiences.map(async (exp) => {
        const formData = new FormData();
        Object.entries(exp).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        });
        const response = await axiosInstance.post(
          "/auth/freelancer/experiences",
          formData
        );
        return response.data.data;
      });

      await Promise.all([...updatePromises, ...addPromises]);
      const response = await axiosInstance.get("/auth/freelancer/experiences");
      setWorkExperiences(response.data.data);
      toast.success(translate("profile.experience_updated"));
    } catch (error) {
      console.error("Error saving experiences:", error);
      toast.error(translate("profile.error"));
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const handleAdd = () => {
    openModal(
      <ExperienceForm
        workExperiences={workExperiences}
        setWorkExperiences={setWorkExperiences}
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
      <ExperienceForm
        workExperiences={workExperiences}
        setWorkExperiences={setWorkExperiences}
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
        text={translate("profile.work_experience")}
        actions={[
          <SecondaryBtn
            key="add"
            text={translate("btns.add")}
            onClick={handleAdd}
          />,
          workExperiences.length > 0 && (
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
        {workExperiences.length > 0 ? (
          workExperiences.map((experience) => (
            <ExperienceItem key={experience.id} experience={experience} />
          ))
        ) : (
          <p className="text-gray-500">{translate("profile.no_experiences")}</p>
        )}
      </div>
    </div>
  );
};

const ExperienceItem = ({ experience }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { translate } = useTranslation();

  return (
    <div dir="ltr" className="mt-4 grid grid-cols-1 gap-2">
      <h1 className="text-base md:text-xl font-medium">{`${experience.name} | ${experience.company}`}</h1>
      <p className="text-xs md:text-sm">{`${experience.from_date} - ${experience.to_date}`}</p>
      <div>
        <p
          className={`text-sm md:text-base ${isExpanded ? "" : "line-clamp-1"}`}
        >
          {experience.description}
        </p>
        {experience.description.length > 100 && (
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
    </div>
  );
};

const ExperienceForm = ({
  workExperiences,
  setWorkExperiences,
  onSave,
  closeModal,
  isEditing,
  isLoading,
  translate,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    from_date: "",
    to_date: "",
    description: "",
  });
  const [experiences, setExperiences] = useState(workExperiences);
  const [errors, setErrors] = useState({});
  const [selected, setSelected] = useState(null);
  const { showConfirmation } = useConfirmation();

  const experienceSchema = Yup.object().shape({
    name: Yup.string().required(translate("validation.job_title_required")),
    company: Yup.string().required(translate("validation.company_required")),
    from_date: Yup.string().required(translate("validation.date_required")),
    to_date: Yup.string().required(translate("validation.date_required")),
    description: Yup.string().required(
      translate("validation.description_required")
    ),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSaveExperience = async () => {
    try {
      await experienceSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const updatedExperiences = isEditing
        ? experiences.map((exp) =>
            exp.id === formData.id ? { ...formData } : exp
          )
        : [...experiences, formData];

      onSave(updatedExperiences);
    } catch (validationError) {
      const errorMap = {};
      validationError.inner.forEach((err) => {
        errorMap[err.path] = err.message;
        toast.error(err.message);
      });
      setErrors(errorMap);
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      await showConfirmation({
        message: translate("notify.confirm_delete"),
        onConfirm: async () => {
          await axiosInstance.delete(`/auth/freelancer/experiences/${id}`);
          setWorkExperiences(experiences.filter((exp) => exp.id !== id));
          setExperiences(experiences.filter((exp) => exp.id !== id));
          toast.success(translate("profile.experience_deleted"));
        },
      });
    } catch (error) {
      if (error !== "cancelled") {
        toast.error(translate("profile.delete_error"));
        console.error("Delete error:", error);
      }
    }
  };

  const handleEditExperience = (experience) => {
    setSelected(experience.id);
    setFormData({
      id: experience.id,
      name: experience.name,
      company: experience.company,
      from_date: experience.from_date || "",
      to_date: experience.to_date || "",
      description: experience.description || "",
    });
    setErrors({});
  };

  return (
    <div className="flex flex-col gap-4" data-lenis-prevent="true">
      <h1 className="text-3xl">
        {isEditing
          ? translate("profile.edit_experience")
          : translate("profile.add_experience")}
      </h1>

      {isEditing && (
        <div
          className="flex flex-col gap-2 px-2 max-h-[200px] overflow-y-scroll"
          data-lenis-prevent="true"
        >
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="flex items-center justify-between p-2 border rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300"
            >
              <p className="line-clamp-1">{`${experience.name} | ${experience.company}`}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditExperience(experience)}
                  className="text-primary"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteExperience(experience.id)}
                  className="text-red-500"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected || !isEditing && (
        <>
          <div className="flex flex-col gap-4">
            <TextInput
              label={`${translate("profile.job_title")}`}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              required
            />

            <TextInput
              label={`${translate("profile.company_name")}`}
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              error={errors.company}
              // required
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
              label={translate("profile.description")}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={8}
              error={errors.description}
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
              onClick={handleSaveExperience}
              classNames="text-lg"
              disabled={isLoading}
            />
          </div>
        </>
      )}
    </div>
  );
};

// const TextInput = ({ label, name, value, onChange, error, ...props }) => (
//   <div className="flex flex-col gap-1">
//     <label className="font-medium" htmlFor={name}>
//       {label}
//     </label>
//     <input
//       type="text"
//       id={name}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 outline-none ${
//         error ? "!border-red-500" : ""
//       }`}
//       {...props}
//     />
//     {error && <span className="text-red-500 text-sm">{error}</span>}
//   </div>
// );

// const DateInput = ({ label, name, value, onChange, error, ...props }) => (
//   <div className="w-full flex flex-col gap-1">
//     <label className="font-medium" htmlFor={name}>
//       {label}
//     </label>
//     <input
//       type="date"
//       id={name}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 outline-none ${
//         error ? "!border-red-500" : ""
//       }`}
//       {...props}
//     />
//     {error && <span className="text-red-500 text-sm">{error}</span>}
//   </div>
// );

// const TextAreaInput = ({
//   label,
//   name,
//   value,
//   onChange,
//   error,
//   rows = 4,
//   ...props
// }) => (
//   <div className="flex flex-col gap-1">
//     <label className="font-medium" htmlFor={name}>
//       {label}
//     </label>
//     <textarea
//       id={name}
//       name={name}
//       value={value}
//       onChange={onChange}
//       rows={rows}
//       className={`border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 resize-none outline-none ${
//         error ? "!border-red-500" : ""
//       }`}
//       {...props}
//     />
//     {error && <span className="text-red-500 text-sm">{error}</span>}
//   </div>
// );

export default WorkExperince;
