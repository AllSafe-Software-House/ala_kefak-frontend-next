"use client"

import { useEffect, useState } from "react";
import { useTranslation } from "@/app/providers/Transslations";
import axiosInstance from "@/app/providers/axiosConfig";
import { useQuery } from "react-query";
import { IoClose } from "react-icons/io5";


const SkillsField = ({ onSkillsChange, initialSkills = [] }) => {
  const [newSkill, setNewSkill] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [skills, setSkills] = useState(initialSkills);
  const { translate, language } = useTranslation();

  const { data: allSkills, isLoading: isSkillsLoading } = useQuery(
    "skills",
    () => axiosInstance.get("/skills").then((res) => res.data)
  );

  useEffect(() => {
    if (allSkills?.data) {
      setSuggestions(allSkills.data);
    }
  }, [allSkills]);

  useEffect(() => {
    onSkillsChange(skills);
  }, [skills]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewSkill(value);

    const filteredSuggestions = allSkills?.data?.filter((skill) =>
      skill?.name?.toLowerCase()?.includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSelectSkill = (skill) => {
    if (!skills.some((s) => s.id === skill.id)) {
      const updatedSkills = [...skills, skill];
      setSkills(updatedSkills);
    }
    setNewSkill("");
    setSuggestions([]);
  };

  const handleDelete = (skillToDelete) => {
    const updatedSkills = skills.filter(
      (skill) => skill.id !== skillToDelete.id
    );
    setSkills(updatedSkills);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium mb-2">
        {translate("projects.project_skills")}
      </label>

      <div className="flex items-center gap-2 mt-4 relative">
        <input
          type="text"
          value={newSkill}
          onChange={handleInputChange}
          className="flex-1 border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300"
        />
        {newSkill && suggestions?.length > 0 && (
          <div
            data-lenis-prevent="true"
            className="absolute top-full left-0 right-0 bg-white dark:bg-darknav border border-gray-200 dark:border-darkinput rounded mt-1  z-10"
          >
            {suggestions.map((skill) => (
              <div
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
      {skills.length > 0 && (
        <div className="w-full flex justify-start items-center flex-wrap gap-2 md:gap-3 ">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-2 text-gray-500 rounded-full text-sm md:text-base p-2 px-3 md:px-4 border-gray-800 bg-gray-100 dark:bg-darkinput dark:border-darkinput dark:text-gray-400"
            >
              <span className="text-xs md:text-base">{skill.name}</span>
              <button
                type="button"
                onClick={() => handleDelete(skill)}
                className="text-redwarn hover:text-red-700 animation text-lg md:text-xl"
              >
                <IoClose />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default SkillsField;