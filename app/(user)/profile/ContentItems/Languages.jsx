"use client";
import { useState } from "react";
import AddBtn from "../UIItems/AddBtn";
import EditBtn from "../UIItems/EditBtn";
import CertificateItem from "../UIItems/CertificateItem";
import Heading from "../UIItems/Heading";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";

const Languages = ({ user, openModal, closeModal }) => {
  const [languages, setLanguages] = useState(user.languages);
  const { translate } = useTranslation();

  const handleSave = (updatedLanguages) => {
    console.log("Updated languages:", updatedLanguages);
    setLanguages(updatedLanguages);
    closeModal();
  };

  const handleAdd = () => {
    openModal(
      <ModalContent
        initialLanguages={languages}
        onSave={handleSave}
        closeModal={closeModal}
        isEditing={false}
      />
    );
  };

  const handleEdit = () => {
    openModal(
      <ModalContent
        initialLanguages={languages}
        onSave={handleSave}
        closeModal={closeModal}
        isEditing={true}
      />
    );
  };

  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading
        text={translate("profile.languages")}
        actions={[
          <SecondaryBtn
            key={"add"}
            text={translate("btns.add")}
            onClick={handleAdd}
          />,
          <SecondaryBtn
            key={"edit"}
            text={<MdOutlineEdit />}
            onClick={handleEdit}
            classNames="!rounded-full border text-lg md:text-2xl !p-3"
          />,
        ]}
      />
      <div className="w-full grid grid-cols-1 gap-4">
        {languages.map((language) => (
          <LanguageItem key={language.id} language={language} />
        ))}
      </div>
    </div>
  );
};

export default Languages;

const ModalContent = ({ initialLanguages, onSave, closeModal, isEditing }) => {
  const [languages, setLanguages] = useState(initialLanguages);
  const [formData, setFormData] = useState({
    id: Date.now(),
    language_name: "",
    level_name: "",
    proficiency: "",
  });

  const { translate } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveLanguage = () => {
    const updatedLanguages = isEditing
      ? languages.map((lang) =>
          lang.id === formData.id ? { ...formData } : lang
        )
      : [...languages, formData];

    console.log("Saved Language Data:", updatedLanguages);
    onSave(updatedLanguages);
  };

  const handleDeleteLanguage = (id) => {
    const updatedLanguages = languages.filter((lang) => lang.id !== id);
    setLanguages(updatedLanguages);
    console.log("Deleted Language ID:", id);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl">
        {isEditing
          ? translate("profile.edit_language")
          : translate("profile.add_language")}
      </h1>

      {isEditing && (
        <div className="flex flex-col gap-2">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className="flex items-center justify-between p-2 border rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300"
            >
              <p>{`${lang.language_name} | ${lang.level_name}`}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFormData(lang)}
                  className="text-primary"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteLanguage(lang.id)}
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
          name="language_name"
          value={formData.language_name}
          onChange={handleInputChange}
          placeholder={translate("profile.language_name")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <select
          name="level_name"
          value={formData.level_name}
          onChange={handleInputChange}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300"
        >
          <option value="">{translate("profile.select_level")}</option>
          <option value="Beginner">{translate("profile.beginner")}</option>
          <option value="Intermediate">{translate("profile.intermediate")}</option>
          <option value="Advanced">{translate("profile.advanced")}</option>
          <option value="Fluent">{translate("profile.fluent")}</option>
          <option value="Native">{translate("profile.native")}</option>
        </select>
        <input
          type="number"
          name="proficiency"
          value={formData.proficiency}
          onChange={handleInputChange}
          placeholder={translate("profile.proficiency")}
          min="1"
          max="100"
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
          onClick={handleSaveLanguage}
          classNames="text-lg"
        />
      </div>
    </div>
  );
};

const LanguageItem = ({ language }) => {
  return (
    <div className="flex items-center justify-between p-2 b dark:border-darkinput dark:bg-darknav dark:text-gray-300">
      <div className="flex items-center gap-2">
        <span className="font-medium">{language.language_name}</span>
      </div>
      <div className="flex items-center gap-4">
        <span>{language.level_name}</span>
        {language.proficiency && (
          <div className="w-20 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${language.proficiency}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};