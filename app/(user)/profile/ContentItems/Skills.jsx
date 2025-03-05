import { useEffect, useState } from "react";
import EditBtn from "../UIItems/EditBtn";
import Heading from "../UIItems/Heading";
import { IoClose } from "react-icons/io5";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";

const Skills = ({ user, openModal, closeModal }) => {

  const { translate } = useTranslation();

  const [skills, setSkills] = useState(user?.skills);

  const handleSave = (updatedSkills) => {
    console.log("Updated Skills:", updatedSkills);
    setSkills(updatedSkills);
    closeModal();
  };

  const handleEdit = () => {
    openModal(
      <ModalContent
        initialSkills={skills}
        onSave={handleSave}
        closeModal={closeModal}
      />
    );
  };






  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading
        text={translate("profile.skills")}
        actions={[<EditBtn key="edit" onClick={handleEdit} />]}
      />
      <div className="w-full flex justify-start items-center flex-wrap gap-2 md:gap-3 ">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="text-gray-500 rounded-full text-sm md:text-base p-2 px-3 md:px-4 border-gray-800 bg-gray-100 dark:bg-darkinput dark:border-darkinput dark:text-gray-300"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;

const ModalContent = ({ initialSkills, onSave, closeModal }) => {
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState("");

  const handleDelete = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl">Edit Skills</h1>

      <div className="w-full flex justify-start items-center flex-wrap gap-2 md:gap-3 ">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-gray-500 rounded-full text-sm md:text-base p-2 px-3 md:px-4 border-gray-800 bg-gray-100 dark:bg-darkinput dark:border-darkinput dark:text-gray-400"
          >
            <span>{skill.name}</span>
            <button
              onClick={() => handleDelete(skill)}
              className="text-red-500 hover:text-red-700 animation"
            >
              <IoClose />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Skill */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a new skill"
          className="flex-1 border p-2 rounded  dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <MainBtn text="Add" onClick={handleAddSkill} />
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-end items-center gap-4 mt-4">
        <SecondaryBtn text="Cancel" onClick={closeModal} />
        <MainBtn text="Save" onClick={() => onSave(skills)} />
      </div>
    </div>
  );
};
