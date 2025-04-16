"use client";
import { useState, useEffect } from "react";
import Heading from "../UIItems/Heading";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";
import axiosInstance from "@/app/providers/axiosConfig";
import Spinner from "@/app/components/generalComps/Spinner";
import { toast } from "sonner";
import { IoLocationOutline } from "react-icons/io5";
import {
  TextAreaInput,
  TextInput,
  SelectInput,
} from "@/app/components/generalComps/inputs/GenInputs";
import { MdOutlineEdit } from "react-icons/md";

const Title = ({ user, openModal, closeModal }) => {
  const [userData, setUserData] = useState(user || {});
  const { translate } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get("/countries");
        setCountries(response.data.data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        toast.error(translate("status.error_fetching_countries"));
      }
    };
    fetchCountries();
  }, [translate]);

  const handleSave = async (data) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await axiosInstance.post(
        "/auth/update-about-user",
        data
      );
      setUserData(response.data.data);
      toast.success(translate("status.done"));
    } catch (error) {
      console.error("Failed to update about:", error);
      toast.error(translate("status.error"));
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const handleEdit = () => {
    openModal(
      <TitleForm
        userData={userData}
        onSave={handleSave}
        closeModal={closeModal}
        isLoading={isLoading}
        translate={translate}
        countries={countries}
      />
    );
  };

  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-3 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading
        text={translate("profile.about_me")}
        actions={[
          <SecondaryBtn
            key="edit"
            text={<MdOutlineEdit />}
            onClick={handleEdit}
            classNames="!rounded-full border text-lg md:text-2xl !p-3"
          />,
        ]}
      />
      <p className="text-sm md:text-base lg:text-base ">{userData?.title}</p>
      <p className="text-sm flex justify-start items-center gap-2">
        <span>
          <IoLocationOutline />
        </span>
        <span>{userData?.country?.name}</span>
      </p>
      <p className="text-sm ">
        {userData?.description
          ? userData?.description
          : translate("profile.description")}
      </p>
    </div>
  );
};

const TitleForm = ({
  userData,
  onSave,
  closeModal,
  isLoading,
  translate,
  countries,
}) => {
  const [formData, setFormData] = useState({
    title: userData?.title || "",
    description: userData?.description || "",
    countryId: userData?.country?.id || ""
  });
  const [errors, setErrors] = useState({});

  // تعريف الـvalidation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(translate("validation.title_required")),
    description: Yup.string().required(translate("validation.description_required")),
    countryId: Yup.string().required(translate("validation.country_required")),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form data against the schema
      await validationSchema.validate(formData, { abortEarly: false });
      
      // If validation passes, save the data
      await onSave(formData);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Convert Yup validation errors to our errors state
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error saving data:", error);
        toast.error(translate("status.error"));
      }
    }
  };

  return (
    <div className="flex flex-col gap-4" data-lenis-prevent="true">
      <h1 className="text-3xl">{translate("profile.about_me")}</h1>

      <TextInput
        label="profile.title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        error={errors.title}
        required
      />

      <SelectInput
        label="profile.country"
        name="country_id"
        value={formData.country_id}
        onChange={handleInputChange}
        options={[
          { id: "", name: translate("profile.choose_country") },
          ...countries.map((country) => ({
            id: country.id,
            name: country.name,
          })),
        ]}
        error={errors.country_id}
        required
      />

      <TextAreaInput
        label="profile.description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        rows={6}
        error={errors.description}
        required
      />

      <div className="w-full flex justify-end items-center gap-4 my-4">
        <SecondaryBtn
          text={translate("btns.cancel")}
          onClick={closeModal}
          classNames="text-lg"
          disabled={isLoading}
        />

        <MainBtn
          text={isLoading ? <Spinner /> : translate("btns.save")}
          onClick={handleSave}
          classNames="text-lg"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Title;
