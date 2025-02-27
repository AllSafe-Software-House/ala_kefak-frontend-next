"use client";
import { useState } from "react";
import AddBtn from "../UIItems/AddBtn";
import EditBtn from "../UIItems/EditBtn";
import Experince from "../UIItems/Experince";
import Heading from "../UIItems/Heading";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";

const WorkExperince = ({ user, openModal, closeModal }) => {
  const [workExperiences, setWorkExperiences] = useState(user.experiences);

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
        text={"Work Experience"}
        actions={[
          <AddBtn key="add" onClick={handleAdd} />,
          <EditBtn key="edit" onClick={handleEdit} />,
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
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  });

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
      jobTitle: experience.jobTitle,
      companyName: experience.companyName,
      startDate: experience.startDate || "",
      endDate: experience.endDate || "",
      description: experience.description,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl">
        {isEditing ? "Edit Experience" : "Add Experience"}
      </h1>

      {isEditing && (
        <div className="flex flex-col gap-2">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="flex items-center justify-between p-2 border rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300"
            >
              <p>{`${experience.jobTitle} | ${experience.companyName}`}</p>
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
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleInputChange}
          placeholder="Job Title"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Company Name"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate || ""}
          onChange={handleInputChange}
          placeholder="From (Start Date)"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate || ""}
          onChange={handleInputChange}
          placeholder="To (End Date)"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300  resize-none h-48"
        />
      </div>

      <div className="w-full flex justify-end items-center gap-4 mt-4">
        <SecondaryBtn
          text="Discard"
          onClick={closeModal}
          classNames="text-lg"
        />

        <MainBtn
          text={"Save"}
          onClick={handleSaveExperience}
          classNames="text-lg"
        />
      </div>
    </div>
  );
};
