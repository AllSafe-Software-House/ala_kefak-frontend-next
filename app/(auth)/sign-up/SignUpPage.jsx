"use client";

import { useMutation } from "react-query";
import InputField from "../_components/InputField";
import PrimaryButton from "../_components/PrimaryButton";
import SocialAuthButton from "../_components/SocialAuthButton";
import LinkComp from "../_components/LinkComp";
import { FaApple, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChooseRolePage from "../_components/ChooseRolePage";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { baseUrl } from "@/app/providers/axiosConfig";
import { useTranslation } from "@/app/providers/Transslations";

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  user_name: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export default function SignUpPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);
  const { language, setLanguage, translate } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get(`${baseUrl}/countries`);
      if (data.status) {
        const uniqueCountries = [];
        const seenCodes = new Set();
        data.data.forEach((country) => {
          if (!seenCodes.has(country.code)) {
            seenCodes.add(country.code);
            uniqueCountries.push(country);
          }
        });
        setCountries(uniqueCountries);
      }
    };

    fetchCountries();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const registerUser = async (userData) => {
    const response = await axios.post(`${baseUrl}/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };

  const mutation = useMutation(registerUser, {
    onSuccess: (data) => {
      if (data.status) {
        toast.success(
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-3xl text-center">
              {translate("signup.signup_success")}
            </p>
          </div>
        );
        router.push("/login");
      } else {
        throw new Error(data.message || "Registration failed");
      }
    },
    onError: (error) => {
      console.log("error is", error.response.data.message);
      toast.error(
        <div className="w-fit h-full flex justify-center items-center">
          <p className="text-xl text-center whitespace-nowrap ">
            {error.response.data.message ||
              translate("signup.signup_failed")}
          </p>
        </div>
      );
    },
  });

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setValue("country_id", country.id);
    setIsDropdownOpen(false);
  };

  const onSubmit = (data) => {
    mutation.mutate({
      ...data,
      type: selectedRole,
      country_id: selectedCountry.id,
    });
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  const transitionEffect = {
    initial: { opacity: 0, y: 500 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    viewport: { once: false },
  };

  return (
    <div className="w-[95%] lg:w-[70%] min-w-[350px] lg:min-w-[550px] h-fit animation bg-white dark:bg-darknav p-2 md:p-6 pt-2 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-8">
        {selectedRole ? (
          <button
            className="flex items-center justify-center gap-2"
            onClick={() => setSelectedRole(null)}
          >
            <FaArrowLeft className="text-2xl" />
          </button>
        ) : (
          <div></div>
        )}
        <h2 className="text-xl md:text-3xl font-bold text-center ">
          {translate("signup.title")}
        </h2>
        <div></div>
      </div>
      {selectedRole ? (
        <motion.div
          key={selectedRole ? "form" : "role-selection"}
          {...transitionEffect}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex justify-start items-center gap-2">
              <InputField
                id="first_name"
                type="text"
                label={translate("signup.first_name")}
                placeholder={translate("signup.first_name")}
                {...register("first_name")}
                error={errors.first_name?.message}
              />
              <InputField
                id="last_name"
                type="text"
                label={translate("signup.last_name")}
                placeholder={translate("signup.last_name")}
                {...register("last_name")}
                error={errors.last_name?.message}
              />
            </div>
            <InputField
              id="user_name"
              type="text"
              label={translate("signup.username")}
              placeholder={translate("signup.username")}
              {...register("user_name")}
              error={errors.user_name?.message}
            />
            <InputField
              id="email"
              type="email"
              label={translate("signup.email")}
              placeholder={translate("signup.email")}
              {...register("email")}
              error={errors.email?.message}
            />

            <div className="flex justify-start items-center gap-2">
              <div className="relative w-full" ref={dropdownRef}>
                <label className="block text-gray-700 dark:text-gray-300 text-sm md:text-xl font-medium">
                  {translate("signup.select_country")}
                </label>
                <div
                  className="w-full mt-1 px-3 py-2 border text-gray-900 dark:text-gray-300 border-gray-300 dark:border-gray-600 dark:bg-darkinput rounded-md flex items-center justify-between cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedCountry ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedCountry.flag}
                        alt={selectedCountry.name}
                        className="w-6 h-4"
                      />
                      {selectedCountry.iso} ({selectedCountry.code})
                    </div>
                  ) : (
                    <span className="text-gray-400">
                      {translate("signup.select_country")}
                    </span>
                  )}
                  <span>▼</span>
                </div>

                {isDropdownOpen && (
                  <div
                    data-lenis-prevent="true"
                    className="absolute z-10 w-full bg-white dark:bg-darknav border border-gray-300 dark:border-gray-600 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto"
                  >
                    {countries.map((country) => (
                      <div
                        key={country.id}
                        className="px-3 py-2 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-darkinput cursor-pointer"
                        onClick={() => handleSelectCountry(country)}
                        {...register("country")}
                      >
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="w-6 h-4"
                        />
                        {country.iso} ({country.code})
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.country && (
                <p className="text-redwarn text-sm">{errors.country.message}</p>
              )}
              <InputField
                id="tel"
                type="tel"
                label={translate("signup.phone")}
                placeholder={translate("signup.phone")}
                {...register("mobile")}
                error={errors.mobile?.message}
              />
            </div>

            <InputField
              id="password"
              type="password"
              label={translate("signup.password")}
              placeholder={translate("signup.password")}
              {...register("password")}
              error={errors.password?.message}
            />
            <InputField
              id="password_confirmation"
              type="password"
              label={translate("signup.confirm_password")}
              placeholder={translate("signup.confirm_password")}
              {...register("password_confirmation")}
              error={errors.password_confirmation?.message}
            />

            <PrimaryButton
              label={
                mutation.isLoading
                  ? translate("signup.signing_up")
                  : translate("signup.sign_up_button")
              }
              type="submit"
              disabled={mutation.isLoading}
              classNames="mt-4"
            />
          </form>
          <LinkComp
            href={"/login"}
            text={translate("signup.already_have_account")}
            classNames="text-center mt-4"
          />

          <div className="flex flex-col gap-2 my-5">
            <SocialAuthButton
              icon={<FcGoogle className="text-3xl" />}
              label={translate("signup.signup_with_google")}
              onClick={() => console.log("Google Sign Up")}
            />
            <SocialAuthButton
              icon={<FaApple className="text-3xl text-gray-900" />}
              label={translate("signup.signup_with_apple")}
              onClick={() => console.log("Apple Sign Up")}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={selectedRole ? "form" : "role-selection"}
          {...transitionEffect}
        >
          <ChooseRolePage onRoleSelect={handleSelectRole} />
        </motion.div>
      )}
    </div>
  );
}