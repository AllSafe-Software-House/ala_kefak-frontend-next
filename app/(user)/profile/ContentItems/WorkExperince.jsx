"use client";
import { useState } from "react";
import Experince from "../UIItems/Experince";
import Heading from "../UIItems/Heading";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";

const WorkExperince = ({ user, openModal, closeModal }) => {
  const [workExperiences, setWorkExperiences] = useState(user.experiences);
  const { translate } = useTranslation();

  const handleSave = (updatedExperiences) => {
    console.log("Updated Work Experiences:", updatedExperiences);
    setWorkExperiences(updatedExperiences);
    closeModal();
  };

  const handleAdd = () => {
    openModal(
      <ModalContent
        initialExperiences={workExperiences}
        onSave={handleSave}
        closeModal={closeModal}
        isEditing={false}
      />
    );
  };

  const handleEdit = () => {
    openModal(
      <ModalContent
        initialExperiences={workExperiences}
        onSave={handleSave}
        closeModal={closeModal}
        isEditing={true}
      />
    );
  };

  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading
        text={translate("profile.work_experience")}
        actions={[
          <SecondaryBtn text={translate("btns.add")} onClick={handleAdd} />,
          <SecondaryBtn
            text={<MdOutlineEdit />}
            onClick={handleEdit}
            classNames="!rounded-full border text-lg md:text-2xl !p-3"
          />,
        ]}
      />
      <div className="w-full grid grid-cols-1 gap-4">
        {workExperiences.map((experience) => (
          <Experince key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
};

export default WorkExperince;

const ModalContent = ({
  initialExperiences,
  onSave,
  closeModal,
  isEditing,
}) => {
  const [experiences, setExperiences] = useState(initialExperiences);
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    company: "",
    from_date: "",
    to_date: "",
    description: "",
  });

  const { translate } = useTranslation(); // استخدام useTranslation هنا أيضًا

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveExperience = () => {
    const updatedExperiences = isEditing
      ? experiences.map((exp) =>
          exp.id === formData.id ? { ...formData } : exp
        )
      : [...experiences, formData];

    console.log("Saved Experience Data:", updatedExperiences);
    onSave(updatedExperiences);
  };

  const handleDeleteExperience = (id) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id);
    setExperiences(updatedExperiences);
    console.log("Deleted Experience ID:", id);
  };

  const handleEditExperience = (experience) => {
    setFormData({
      id: experience.id,
      name: experience.name,
      company: experience.company,
      from_date: experience.from_date || "",
      to_date: experience.to_date || "",
      description: experience.description,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl">
        {isEditing
          ? translate("profile.edit_experience")
          : translate("profile.add_experience")}
      </h1>

      {isEditing && (
        <div className="flex flex-col gap-2">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="flex items-center justify-between p-2 border rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300"
            >
              <p>{`${experience.name} | ${experience.company}`}</p>
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

      <div className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={translate("profile.job_title")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder={translate("profile.company_name")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="date"
          name="from_date"
          value={formData.from_date || ""}
          onChange={handleInputChange}
          placeholder={translate("profile.start_date")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="date"
          name="to_date"
          value={formData.to_date || ""}
          onChange={handleInputChange}
          placeholder={translate("profile.end_date")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder={translate("profile.description")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300  resize-none h-48"
        />
      </div>

      <div className="w-full flex justify-end items-center gap-4 mt-4">
        <SecondaryBtn
          text={translate("btns.cancel")}
          onClick={closeModal}
          classNames="text-lg"
        />

        <MainBtn
          text={translate("btns.save")}
          onClick={handleSaveExperience}
          classNames="text-lg"
        />
      </div>
    </div>
  );
};