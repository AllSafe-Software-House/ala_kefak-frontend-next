"use client";
import { useState } from "react";
import AddBtn from "../UIItems/AddBtn";
import EditBtn from "../UIItems/EditBtn";
import EducationItem from "../UIItems/EducationItem";
import Heading from "../UIItems/Heading";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";

const Education = ({ user, openModal, closeModal }) => {
  const [education, setEducation] = useState(user.education);

  const handleSave = (updatedEducation) => {
    console.log("Updated Education:", updatedEducation);
    setEducation(updatedEducation);
    closeModal();
  };

  const handleAdd = () => {
    openModal(
      <ModalContent
        initialEducation={education}
        onSave={handleSave}
        closeModal={closeModal}
        isEditing={false}
      />
    );
  };

  const handleEdit = () => {
    openModal(
      <ModalContent
        initialEducation={education}
        onSave={handleSave}
        closeModal={closeModal}
        isEditing={true}
      />
    );
  };

  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading
        text={"Education"}
        actions={[
          <AddBtn key="add" onClick={handleAdd} />,
          <EditBtn key="edit" onClick={handleEdit} />,
        ]}
      />
      <div className="w-full grid grid-cols-1 gap-4">
        {education.map((item) => (
          <EducationItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Education;

const ModalContent = ({ initialEducation, onSave, closeModal, isEditing }) => {
  const [education, setEducation] = useState(initialEducation);
  const [formData, setFormData] = useState({
    id: Date.now(),
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    fieldOfStudy: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveEducation = () => {
    const updatedEducation = isEditing
      ? education.map((edu) => (edu.id === formData.id ? { ...formData } : edu))
      : [...education, formData];

    console.log("Saved Education Data:", updatedEducation);
    onSave(updatedEducation);
  };

  const handleDeleteEducation = (id) => {
    const updatedEducation = education.filter((edu) => edu.id !== id);
    setEducation(updatedEducation);
    console.log("Deleted Education ID:", id);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl">
        {isEditing ? "Edit Education" : "Add Education"}
      </h1>

      {isEditing && (
        <div className="flex flex-col gap-2">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="flex items-center justify-between p-2 border rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300"
            >
              <p>{`${edu.degree} | ${edu.institution}`}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFormData(edu)}
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

      <div className="flex flex-col gap-2">
        <input
          type="text"
          name="degree"
          value={formData.degree}
          onChange={handleInputChange}
          placeholder="Degree"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="institution"
          value={formData.institution}
          onChange={handleInputChange}
          placeholder="Institution"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          placeholder="From (Start Date) - dd/mm/yyyy"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          placeholder="To (End Date) - dd/mm/yyyy"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="fieldOfStudy"
          value={formData.fieldOfStudy}
          onChange={handleInputChange}
          placeholder="Field of Study"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
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
          onClick={handleSaveEducation}
          classNames="text-lg"
        />
      </div>
    </div>
  );
};
