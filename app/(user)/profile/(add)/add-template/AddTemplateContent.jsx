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

const AddTemplateContent = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [skills, setSkills] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [errors, setErrors] = useState({});
  const { translate, language } = useTranslation();
  const router = useRouter();

  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    "categories",
    () => axiosInstance.get("/categories").then((res) => res.data)
  );

  const handleCoverImageChange = (file) => {
    setCoverImage(file[0]);
    setErrors((prev) => ({ ...prev, coverImage: "" }));
  };

  const templateSchema = Yup.object().shape({
    name: Yup.string().required(translate("validation.name_required")),
    categoryId: Yup.string().required(translate("validation.category_required")),
    description: Yup.string().required(translate("validation.description_required")),
    link: Yup.string()
      .url(translate("validation.link_invalid"))
      .required(translate("validation.link_required")),
    deliveryTime: Yup.string().required(translate("validation.delivery_time_required")),
    startPrice: Yup.string().required(translate("validation.price_required")),
    skills: Yup.array().min(1, translate("validation.skills_required")),
    coverImage: Yup.mixed().required(translate("validation.cover_required")),
  });

  const mutation = useMutation(
    (data) => axiosInstance.post("/auth/freelancer/templates", data),
    {
      onSuccess: () => {
        toast.success(translate("status.done"));
        setErrors({});
        router.push("/profile");
      },
      onError: (error) => {
        toast.error(translate("status.error"));
        console.error("Failed to create template:", error);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToValidate = {
      name,
      categoryId,
      description,
      link,
      deliveryTime,
      startPrice,
      skills,
      coverImage,
    };

    try {
      await templateSchema.validate(dataToValidate, { abortEarly: false });
      setErrors({});

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category_id", categoryId);
      formData.append("link", link);
      formData.append("delivery_time", deliveryTime);
      formData.append("start_price", startPrice);
      formData.append("cover_image", coverImage);

      skills.forEach((skill, index) => {
        formData.append(`skills[${index}]`, skill.id);
      });

      mutation.mutate(formData);
    } catch (validationError) {
      const errorMap = {};
      validationError.inner.forEach((err) => {
        errorMap[err.path] = err.message;
        toast.error(err.message);
      });
      setErrors(errorMap);
    }
  };

  return (
    <div className="min-h-screen w-[90%] mx-auto p-6 px-3 md:px-8 lg:px-16 flex flex-col gap-16 bg-gray-100 dark:bg-transparent">
      <div className="head text-3xl mt-3">
        <Link className="flex justify-start items-center gap-4 font-medium" href={"/profile"}>
          {language === "en" ? <FaArrowLeft /> : <FaArrowRight />}
          <span>{translate("templates.add_template")}</span>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 lg:grid-cols-[70%_28%] justify-between gap-4 mb-8"
      >
        <div>
          <div className="flex flex-col">
            <label className="font-medium mb-2">{translate("templates.template_category")}</label>
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setErrors((prev) => ({ ...prev, categoryId: "" }));
              }}
              className={`border p-2 rounded dark:bg-darknav dark:text-gray-300 outline-none ${
                errors.categoryId
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <option value="">{translate("templates.select_category")}</option>
              {categories?.data?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span className="text-red-500 text-sm mt-1">{errors.categoryId}</span>
            )}
          </div>

          <InputField
            label={translate("templates.template_name")}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
            error={errors.name}
          />

          <InputField
            label={translate("templates.delivery_time")}
            value={deliveryTime}
            onChange={(e) => {
              setDeliveryTime(e.target.value);
              setErrors((prev) => ({ ...prev, deliveryTime: "" }));
            }}
            error={errors.deliveryTime}
            placeholder="e.g., 6 days"
          />

          <InputField
            label={translate("templates.start_price")}
            type="number"
            value={startPrice}
            onChange={(e) => {
              setStartPrice(e.target.value);
              setErrors((prev) => ({ ...prev, startPrice: "" }));
            }}
            error={errors.startPrice}
            placeholder="e.g., 100"
          />

          <TextAreaField
            label={translate("templates.template_description")}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
            error={errors.description}
          />

          <div className="flex flex-col">
            <SkillsField onSkillsChange={setSkills} />
            {errors.skills && <span className="text-red-500 text-sm mt-1">{errors.skills}</span>}
          </div>
        </div>

        <div>
          <div className="flex flex-col">
            <label className="font-medium mb-2">{translate("templates.template_cover")}</label>
            <FileInput
              label={translate("files.upload_cover")}
              fileNames={coverImage ? [coverImage.name] : []}
              onFileChange={handleCoverImageChange}
              errors={errors.coverImage}
              multiple={false}
            />
            {errors.coverImage && (
              <span className="text-red-500 text-sm mt-1">{errors.coverImage}</span>
            )}
          </div>

          <InputField
            label={translate("templates.template_url")}
            type="url"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
              setErrors((prev) => ({ ...prev, link: "" }));
            }}
            error={errors.link}
            placeholder="https://www.example.com"
          />
        </div>
        <div className="mt-6 flex justify-end w-full">
          <MainBtn text={translate("btns.add")} />
        </div>
      </form>
    </div>
  );
};

export default AddTemplateContent;


const SkillsField = ({ onSkillsChange }) => {
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
                onClick={() => handleDelete(skill)}
                className="text-red-500 hover:text-red-700 animation text-lg md:text-xl"
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

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className="flex flex-col">
    <label className="font-medium mb-2">{label}</label>
    <input
      type={type}
      className={`border p-2 rounded dark:bg-darknav dark:text-gray-300 outline-none ${
        error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
      }`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
);

const TextAreaField = ({ label, value, onChange, error, placeholder }) => (
  <div className="flex flex-col">
    <label className="font-medium mb-2">{label}</label>
    <textarea
      className={`border p-2 rounded dark:bg-darknav dark:text-gray-300 outline-none ${
        error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
      }`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
    />
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
);

const FileInput = ({
  label,
  onFileChange,
  fileNames,
  errors,
  multiple = false,
}) => {
  const handleFileChange = (e) => {
    if (multiple) {
      const files = Array.from(e.target.files);

      onFileChange(files);
    } else {
      const file = e.target.files[0];

      onFileChange([file]);
    }
  };

  return (
    <label
      className={`w-full cursor-pointer flex justify-center items-center flex-col py-9 dark:text-white text-slate-900 dark:bg-darknav dark:border-darkinput
    rounded-2xl border-blue-300 gap-3 border-dashed border-2 hover:border-blue-700 group animation dark:hover:bg-blue-500/20 ${
      errors ? "!border-red-500" : "border-gray-300 dark:border-gray-600"
    }`}
    >
      <input
        type="file"
        className="hidden"
        multiple={multiple}
        onChange={handleFileChange}
      />
      <FaImage className="text-4xl text-blue-400 group-hover:text-blue-700 animation" />
      <h2 className="text-center text-gray-400 text-xs group-hover:text-gray-900 animation">
        {fileNames.length > 0 ? fileNames.join(", ") : label}
      </h2>
    </label>
  );
};
