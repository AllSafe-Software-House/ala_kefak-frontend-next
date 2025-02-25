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

const schema = yup.object().shape({
  email_or_username: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const { login } = useAuth();

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
      if (data.status) {
        if (data.data.otp == 0) {
          toast.success(
            "you Didn't Virefy your Acount yet, Please check your email for OTP"
          );
          router.push("/verify");
        } else {
          toast.success("Login successful! Welcome back.");
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
    mutation.mutate(data);
  };

  return (
    <div className="w-[95%] lg:w-[50%] min-w-[400px] h-full bg-white dark:bg-darknav p-2 md:p-6 pt-2 rounded-lg shadow-md">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          id="email_or_username"
          type="email"
          label="Email or Username"
          placeholder="Enter your email or username"
          {...register("email_or_username")}
          error={errors.email_or_username?.message}
        />
        <InputField
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />
        <LinkComp
          href="/forget-password"
          text="Forget Password?"
          classNames="text-end"
        />
        <PrimaryButton label="Login" />
      </form>
      <LinkComp
        href="/sign-up"
        text="Create Account?"
        classNames="text-center"
      />
      <div className="flex flex-col gap-4 my-5">
        <SocialAuthButton
          icon={<FcGoogle className="text-3xl" />}
          label="Login with Google"
          onClick={() => console.log("Google Login")}
        />
        <SocialAuthButton
          icon={<FaApple className="text-3xl text-gray-900" />}
          label="Login with Apple"
          onClick={() => console.log("Apple Login")}
        />
      </div>
    </div>
  );
}
