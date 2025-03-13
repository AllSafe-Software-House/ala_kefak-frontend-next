"use client";

import { useMutation } from "react-query";
import InputField from "../_components/InputField";
import PrimaryButton from "../_components/PrimaryButton";
import SocialAuthButton from "../_components/SocialAuthButton";
import LinkComp from "../_components/LinkComp";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { baseUrl } from "@/app/providers/axiosConfig";
import { useAuth } from "@/app/providers/AuthContext";
import { useTranslation } from "@/app/providers/Transslations";

const schema = yup.object().shape({
  email_or_username: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const { language, setLanguage, translate } = useTranslation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loginUser = async (userData) => {
    const response = await axios.post(`${baseUrl}/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log("data is", data);
      if (data.status) {
        if (data.data.otp == 0) {
          toast.success(translate("login.verify_account"));
          router.push("/verify");
        } else {
          toast.success(translate("login.login_success"));
          router.push("/");
        }
      } else {
        throw new Error(data.message || "Login failed");
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    },
  });

  const onSubmit = (data) => {
    localStorage.setItem("userEmail", data.email_or_username);
    mutation.mutate(data);
  };

  return (
    <div className="w-[95%] lg:w-[50%] min-w-[400px] h-full bg-white dark:bg-darknav p-2 md:p-6 pt-2 rounded-lg shadow-md">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-4">
        {translate("login.title")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          id="email_or_username"
          type="email"
          label={translate("login.email_or_username")}
          placeholder={translate("login.email_or_username")}
          {...register("email_or_username")}
          error={errors.email_or_username?.message}
        />
        <InputField
          id="password"
          type="password"
          label={translate("login.password")}
          placeholder={translate("login.password")}
          {...register("password")}
          error={errors.password?.message}
        />
        <LinkComp
          href="/reset-password"
          text={translate("login.forget_password")}
          classNames="text-end"
        />
        <PrimaryButton label={translate("login.login_button")} />
      </form>
      <LinkComp
        href="/sign-up"
        text={translate("login.create_account")}
        classNames="text-center"
      />
      <div className="flex flex-col gap-4 my-5">
        <SocialAuthButton
          icon={<FcGoogle className="text-3xl" />}
          label={translate("login.login_with_google")}
          onClick={() => console.log("Google Login")}
        />
        <SocialAuthButton
          icon={<FaApple className="text-3xl text-gray-900" />}
          label={translate("login.login_with_apple")}
          onClick={() => console.log("Apple Login")}
        />
      </div>
    </div>
  );
}
