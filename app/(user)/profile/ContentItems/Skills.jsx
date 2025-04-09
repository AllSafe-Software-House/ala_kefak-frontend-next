import { useEffect, useState } from "react";
import EditBtn from "../UIItems/EditBtn";
import Heading from "../UIItems/Heading";
import { IoClose } from "react-icons/io5";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "@/app/providers/axiosConfig";
import Spinner from "@/app/components/generalComps/Spinner";
import { toast } from "sonner";

const Skills = ({ user, openModal, closeModal }) => {
  const { translate, language } = useTranslation();

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
  const [suggestions, setSuggestions] = useState([]);
  const [allSkillsData, setAllSkillsData] = useState([]);
  const { translate, language } = useTranslation();

  const { data: allSkills, isLoading: isSkillsLoading } = useQuery('skills', () =>
    axiosInstance.get('/skills').then((res) => res.data)
  );

useEffect(() => {
  console.log(allSkills?.data)
  setAllSkillsData(allSkills?.data);
}, [allSkills])


  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewSkill(value);

    if (allSkills) {
      const filteredSuggestions = allSkillsData?.filter((skill) =>
        skill?.name?.toLowerCase()?.includes(value.toLowerCase())
      );
      console.log(allSkillsData)
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSelectSkill = (skill) => {
    if (!skills.some((s) => s.id === skill.id)) {
      setSkills([...skills, skill]);
    }
    setNewSkill("");
    setSuggestions([]);
  };

  const handleDelete = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill.id !== skillToDelete.id));
  };

  const mutation = useMutation(
    (updatedSkills) => {
      const formData = new FormData();
      updatedSkills.forEach((skill, index) => {
        formData.append(`skills[${index}]`, skill.id);
      });
      return axiosInstance.post('/auth/update-user-skills', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    {
      onSuccess: () => {
        onSave(skills);
        closeModal();
        toast.success(translate("profile.skills_updated"));
      },
      onError: (error) => {
        console.error('Failed to update skills:', error);
        toast.error(translate("profile.failed_to_update_skills"));
      },
    }
  );

  const handleSave = () => {
    mutation.mutate(skills);
  };

  return (
    <div className="flex flex-col gap-4 p-4 " data-lenis-prevent="true"  >
      <h1 className="text-xl md:text-3xl">
        {translate("profile.edit_skills")}
      </h1>

      <div className="w-full flex justify-start items-center flex-wrap gap-2 md:gap-3 max-h-[600px] overflow-y-scroll " >
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-2 text-gray-500 rounded-full text-sm md:text-base p-2 px-3 md:px-4 border-gray-800 bg-gray-100 dark:bg-darkinput dark:border-darkinput dark:text-gray-400"
          >
            <span className="text-xs md:text-base">{skill.name}</span>
            <button
              onClick={() => handleDelete(skill)}
              className="text-red-500 hover:text-red-700 animation text-lg md:text-xl"
            >
              <IoClose />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4 relative">
        <input
          type="text"
          value={newSkill}
          onChange={handleInputChange}
          placeholder={language === "ar" ? "أضف مهارة جديدة" : "Add a new skill"}
          className="flex-1 border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300"
        />
        {newSkill && suggestions?.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-darknav border border-gray-200 dark:border-darkinput rounded mt-1 max-h-40 overflow-y-auto z-10">
            {suggestions.map((skill) => (
              <div
              data-lenis-prevent="true"
                key={skill.id}
                onClick={() => handleSelectSkill(skill)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-darkinput cursor-pointer"
              >
                {skill.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full flex justify-end items-center gap-4 mt-4">
        <SecondaryBtn text={translate("btns.cancel")} onClick={closeModal} />
        <MainBtn
          text={mutation.isLoading ? <Spinner /> : translate("btns.save")}
          onClick={handleSave}
          disabled={mutation.isLoading}
        />
        
      </div>
    </div>
  );
};
