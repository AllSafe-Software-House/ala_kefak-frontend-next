"use client";
import { useState, useEffect } from "react";
import Heading from "../UIItems/Heading";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";
import axiosInstance from "@/app/providers/axiosConfig";
import { toast } from "sonner";
import Spinner from "@/app/components/generalComps/Spinner";
import { useConfirmation } from "@/app/providers/SecondaryProvider";
import { SelectInput } from "@/app/components/generalComps/inputs/GenInputs";

const Languages = ({ user, openModal, closeModal }) => {
  const [languages, setLanguages] = useState(user.languages || []);
  const { translate } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allLevels, setAllLevels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [languagesRes, levelsRes] = await Promise.all([
          axiosInstance.get("/languages"),
          axiosInstance.get("/levels")
        ]);
        setAllLanguages(languagesRes.data.data);
        setAllLevels(levelsRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(translate("status.error_fetching_data"));
      }
    };

    fetchData();
  }, [translate]);

  const handleSave = async (updatedLanguages) => {
    setIsLoading(true);
    try {
      const newLanguages = updatedLanguages.filter(
        (lang) => !languages.some((oldLang) => oldLang.id === lang.id)
      );

      const updatePromises = languages
        .filter((oldLang) =>
          updatedLanguages.some((lang) => lang.id === oldLang.id)
        )
        .map(async (oldLang) => {
          const updatedLang = updatedLanguages.find(
            (lang) => lang.id === oldLang.id
          );
          if (JSON.stringify(oldLang) !== JSON.stringify(updatedLang)) {
            await axiosInstance.post(`/auth/freelancer/languages/${oldLang.id}`, {
              language_id: updatedLang.language_id,
              level_id: updatedLang.level_id,
              _method: "put"
            });
          }
        });

      const addPromises = newLanguages.map(async (lang) => {
        const response = await axiosInstance.post("/auth/freelancer/languages", {
          language_id: lang.language_id,
          level_id: lang.level_id
        });
        return response.data.data;
      });

      const addedLanguages = await Promise.all(addPromises);
      await Promise.all(updatePromises);

      // Fetch the latest languages from server
      const response = await axiosInstance.get("/auth/freelancer/languages");
      setLanguages(response.data.data);
      toast.success(translate("status.languages_updated"));
    } catch (error) {
      console.error("Error saving languages:", error);
      toast.error(translate("status.error"));
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const handleAdd = () => {
    openModal(
      <LanguageForm
        languages={languages}
        onSave={handleSave}
        closeModal={closeModal}
        mode="add"
        isLoading={isLoading}
        translate={translate}
        allLanguages={allLanguages}
        allLevels={allLevels}
      />
    );
  };

  const handleEdit = () => {
    openModal(
      <LanguageForm
        languages={languages}
        onSave={handleSave}
        closeModal={closeModal}
        mode="edit"
        isLoading={isLoading}
        translate={translate}
        allLanguages={allLanguages}
        allLevels={allLevels}
      />
    );
  };

  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading
        text={translate("profile.languages")}
        actions={[
          <SecondaryBtn
            key="add"
            text={translate("btns.add")}
            onClick={handleAdd}
          />,
          languages.length > 0 && (
            <SecondaryBtn
              key="edit"
              text={<MdOutlineEdit />}
              onClick={handleEdit}
              classNames="!rounded-full border text-lg md:text-2xl !p-3"
            />
          ),
        ]}
      />
      <div className="w-full grid grid-cols-1 gap-4">
        {languages.length > 0 ? (
          languages.map((item) => <LanguageItem key={item.id} language={item} translate={translate} />)
        ) : (
          <p className="text-gray-500">{translate("profile.no_languages")}</p>
        )}
      </div>
    </div>
  );
};

const LanguageForm = ({
  languages,
  onSave,
  closeModal,
  mode,
  isLoading,
  translate,
  allLanguages,
  allLevels
}) => {
  const [formData, setFormData] = useState({
    id: null,
    language_id: "",
    level_id: "",
  });
  const [selectedId, setSelectedId] = useState(null);
  const [errors, setErrors] = useState({});
  const { showConfirmation } = useConfirmation();

  const isEditing = mode === "edit";
  const isAdding = mode === "add";
  const showForm = isAdding || selectedId;

  const selectedLanguage = languages.find((lang) => lang.id === selectedId) || null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSaveLanguage = async () => {
    try {
      if (!formData.language_id) {
        toast.error(translate("validation.language_required"));
        return;
      }
      if (!formData.level_id) {
        toast.error(translate("validation.level_required"));
        return;
      }

      const updatedLanguages = isEditing
        ? languages.map((lang) =>
            lang.id === selectedId ? { 
              ...lang,
              language_id: formData.language_id,
              level_id: formData.level_id,
              language_name: allLanguages.find(l => l.id == formData.language_id)?.name || lang.language_name,
              level_name: allLevels.find(l => l.id == formData.level_id)?.name || lang.level_name
            } : lang
          )
        : [
            ...languages,
            {
              id: Date.now(), // Temporary ID for new entries
              language_id: formData.language_id,
              level_id: formData.level_id,
              language_name: allLanguages.find(l => l.id == formData.language_id)?.name || "",
              level_name: allLevels.find(l => l.id == formData.level_id)?.name || "",
              created_at: new Date().toISOString()
            }
          ];

      await onSave(updatedLanguages);
    } catch (error) {
      console.error("Error saving language:", error);
      toast.error(translate("status.error"));
    }
  };

  const handleDeleteLanguage = async (id) => {
    try {
      await showConfirmation({
        message: translate("status.confirm_delete"),
        onConfirm: async () => {
          await axiosInstance.delete(`/auth/freelancer/languages/${id}`);
          const updatedLanguages = languages.filter((lang) => lang.id !== id);
          onSave(updatedLanguages);
          toast.success(translate("status.language_deleted"));
        },
      });
    } catch (error) {
      if (error !== "cancelled") {
        toast.error(translate("status.delete_error"));
        console.error("Delete error:", error);
      }
    }
  };

  const handleEditLanguage = (lang) => {
    setSelectedId(lang.id);
    setFormData({
      id: lang.id,
      language_id: lang.language_id,
      level_id: lang.level_id,
      _method: "put"
    });
    setErrors({});
  };

  const handleAddNew = () => {
    setSelectedId(null);
    setFormData({
      id: null,
      language_id: "",
      level_id: ""
    });
  };

  return (
    <div className="flex flex-col gap-4" data-lenis-prevent="true">
      <h1 className="text-3xl">
        {isEditing
          ? translate("profile.edit_language")
          : translate("profile.add_language")}
      </h1>

      {isEditing && (
        <div className="flex flex-col gap-2 px-2 max-h-[200px] overflow-y-scroll">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className={`flex items-center justify-between p-2 border rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 ${
                selectedId === lang.id ? "border-primary" : ""
              }`}
            >
              <p className="line-clamp-1">{`${lang.language_name} | ${lang.level_name}`}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditLanguage(lang)}
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

      {showForm && (
        <>
          <div className="flex flex-col gap-4">
            <SelectInput
              label={translate("profile.language")}
              name="language_id"
              value={formData.language_id}
              onChange={handleInputChange}
              options={[
                { id: "", name: translate("profile.choose_language") },
                ...allLanguages.map(lang => ({ id: lang.id, name: lang.name }))
              ]}
              error={errors.language_id}
            />

            <SelectInput
              label={translate("profile.level")}
              name="level_id"
              value={formData.level_id}
              onChange={handleInputChange}
              options={[
                { id: "", name: translate("profile.choose_level") },
                ...allLevels.map(level => ({ id: level.id, name: level.name }))
              ]}
              error={errors.level_id}
            />
          </div>

          <div className="w-full flex justify-end items-center gap-4 my-4">
            <SecondaryBtn
              text={translate("btns.cancel")}
              onClick={closeModal}
              classNames="text-lg"
              disabled={isLoading}
            />

            <MainBtn
              text={isLoading ? <Spinner /> : translate("btns.save")}
              onClick={handleSaveLanguage}
              classNames="text-lg"
              disabled={isLoading}
            />
          </div>
        </>
      )}
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

export default Languages;