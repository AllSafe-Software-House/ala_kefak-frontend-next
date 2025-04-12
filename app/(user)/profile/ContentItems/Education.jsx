"use client";
import { useState } from "react";
import EducationItem from "../UIItems/EducationItem";
import Heading from "../UIItems/Heading";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";

const Education = ({ user, openModal, closeModal }) => {
  const [education, setEducation] = useState(user.educations);
  const { translate } = useTranslation();

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
        text={translate("profile.education")}
        actions={[
          <SecondaryBtn key={1} text={translate("btns.add")} onClick={handleAdd} />,
          <SecondaryBtn 
            key={2}
            text={<MdOutlineEdit />}
            onClick={handleEdit}
            classNames="!rounded-full border text-lg md:text-2xl !p-3"
          />,
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
    departement: "",
    university: "",
    from_date: "",
    to_date: "",
    description: "",
  });

  const { translate } = useTranslation(); // استخدام useTranslation هنا أيضًا

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
        {isEditing
          ? translate("profile.edit_education")
          : translate("profile.add_education")}
      </h1>

      {isEditing && (
        <div className="flex flex-col gap-2">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="flex items-center justify-between p-2 border rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300"
            >
              <p>{`${edu.departement} | ${edu.university}`}</p>
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
          value={formData.departement}
          onChange={handleInputChange}
          placeholder={translate("profile.degree")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="institution"
          value={formData.university}
          onChange={handleInputChange}
          placeholder={translate("profile.institution")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="from_date"
          value={formData.from_date}
          onChange={handleInputChange}
          placeholder={translate("profile.start_date")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="to_date"
          value={formData.to_date}
          onChange={handleInputChange}
          placeholder={translate("profile.end_date")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder={translate("profile.field_of_study")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleInputChange}
          placeholder={translate("profile.link")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
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
          onClick={handleSaveEducation}
          classNames="text-lg"
        />
      </div>
    </div>
  );
};