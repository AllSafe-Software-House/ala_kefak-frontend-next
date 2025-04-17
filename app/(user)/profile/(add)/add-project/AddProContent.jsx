"use client";
import axiosInstance from "@/app/providers/axiosConfig";
import { useTranslation } from "@/app/providers/Transslations";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaImage } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { MainBtn } from "@/app/components/generalComps/Btns";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  DateInput,
  FileInput,
  SelectInput,
  TextAreaInput,
  TextInput,
} from "@/app/components/generalComps/inputs/GenInputs";
import Spinner from "@/app/components/generalComps/Spinner";

const AddProContent = () => {
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [projectLink, setProjectLink] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const { translate, language } = useTranslation();
  const router = useRouter();
  // const [isLoading, setisLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFiles(files);
    setErrors((prev) => ({ ...prev, files: "" }));
  };

  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    "categories",
    () => axiosInstance.get("/categories").then((res) => res.data)
  );

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setErrors((prev) => ({ ...prev, coverImage: "" }));
  };

  const projectSchema = Yup.object().shape({
    categoryId: Yup.string().required(
      translate("validation.category_required")
    ),
    title: Yup.string().required(translate("validation.title_required")),
    date: Yup.string().required(translate("validation.date_required")),
    description: Yup.string().required(
      translate("validation.description_required")
    ),
    skills: Yup.array()
      .typeError(translate("validation.skills_array"))
      .min(1, translate("validation.skills_required")),

    projectLink: Yup.string()
      .url(translate("validation.link_invalid"))
      .required(translate("validation.link_required")),
    files: Yup.array()
      .of(Yup.mixed())
      .min(1, translate("validation.files_required")),
    coverImage: Yup.mixed().required(translate("validation.cover_required")),
  });

  const {mutation, isLoading} = useMutation(
    (data) => axiosInstance.post("/auth/freelancer/projects", data),
    {
      onSuccess: () => {
        toast.success(translate("status.done"));
        setErrors({});
        router.push("/profile");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || translate("status.error"));
        console.error("Failed to update about:", error);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToValidate = {
      title,
      date,
      description,
      skills,
      projectLink,
      files,
      coverImage,
      categoryId,
    };

    try {
      await projectSchema.validate(dataToValidate, { abortEarly: false });
      setErrors({});

      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description);
      formData.append("category_id", categoryId);
      formData.append("link", projectLink);
      formData.append("date", date);
      formData.append("cover_image", coverImage);

      skills.forEach((skill, index) => {
        formData.append(`skills[${index}]`, skill.id);
      });

      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      mutation.mutate(formData);
    } catch (validationError) {
      const errorMap = {};
      validationError.inner.forEach((err) => {
        errorMap[err.path] = err.message;
        toast.error(err.message);
        console.log(validationError)
      });
      setErrors(errorMap);
  
  }
  }
  return (
    <div className="min-h-screen w-[90%] mx-auto p-6 px-3 md:px-8 lg:px-16 flex flex-col gap-16 bg-gray-100 dark:bg-transparent">
      <div className="head text-3xl mt-3">
        <Link
          className="flex justify-start items-center gap-4 font-medium"
          href={"/profile"}
        >
          {language === "en" ? <FaArrowLeft /> : <FaArrowRight />}
          <span>{translate("projects.add_project")}</span>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 lg:grid-cols-[70%_28%] justify-between gap-4 mb-8"
      >
        <div>
          <SelectInput
            label="projects.project_category"
            name="categoryId"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setErrors((prev) => ({ ...prev, categoryId: "" }));
            }}
            options={[
              ...(categories?.data?.map((category) => ({
                id: category.id,
                name: category.name,
              })) || []),
            ]}
            error={errors.categoryId}
            required
            placeholder="projects.select_category"
          />

          <TextInput
            label={translate("projects.project_name")}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: "" }));
            }}
            error={errors.title}
            required
          />

          <DateInput
            label={translate("projects.project_date")}
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setErrors((prev) => ({ ...prev, date: "" }));
            }}
            required
            error={errors.date}
          />

          <TextAreaInput
            label={translate("projects.project_description")}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
            required
            error={errors.description}
          />

          <FileInput
            label={translate("projects.project_files")}
            onChange={handleFileChange}
            error={errors.files}
            multiple={true}
            required
            accept="image/*,video/*,application/pdf"
          />

          <div className="flex flex-col">
            <SkillsField onSkillsChange={setSkills} error={errors.skills} />
          </div>
        </div>

        <div className="w-full sticky top-0 h-full">
          <FileInput
            label={translate("projects.project_cover")}
            onChange={handleCoverImageChange}
            error={errors.coverImage}
            required
            accept="image/*"
            multiple={false}
          />

          <TextInput
            label={translate("projects.project_url")}
            type="url"
            value={projectLink}
            onChange={(e) => {
              setProjectLink(e.target.value);
              setErrors((prev) => ({ ...prev, projectLink: "" }));
            }}
            error={errors.projectLink}
            required
          />
        </div>
        <div className="mt-6 flex justify-end w-full">
          <MainBtn text={isLoading ? <Spinner /> : translate("btns.add")} />
        </div>
      </form>
    </div>
  );
};

export default AddProContent;

const SkillsField = ({ onSkillsChange, error }) => {
  const [newSkill, setNewSkill] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [skills, setSkills] = useState([]);
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
      onSkillsChange(updatedSkills);
    }
    setNewSkill("");
    setSuggestions([]);
  };

  const handleDelete = (skillToDelete) => {
    const updatedSkills = skills.filter(
      (skill) => skill.id !== skillToDelete.id
    );
    setSkills(updatedSkills);
    onSkillsChange(updatedSkills);
  };

  return (
    <div className="flex flex-col gap-2 ">
      <label className="font-medium mb-2">
        {translate("projects.project_skills")}
      </label>

      <div className="flex items-center gap-2 mt-4 relative">
        <input
          type="text"
          value={newSkill}
          onChange={handleInputChange}
          className={`flex-1 border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300  ${
            error ? "!border-redwarn" : ""
          }`}
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
      {error && <span className="text-redwarn text-sm block">{error}</span>}
      {skills.length > 0 && (
        <div className="w-full flex justify-start items-center flex-wrap gap-2 md:gap-3 ">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-2 text-gray-500 rounded-full text-sm md:text-base p-2 px-3 md:px-4 border-gray-800 bg-gray-200 dark:bg-darkinput dark:border-darkinput dark:text-gray-400"
            >
              <span className="text-xs md:text-base">{skill.name}</span>
              <button
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
