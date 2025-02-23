"use client";

import { useMutation } from "react-query";
import InputField from "../_components/InputField";
import PrimaryButton from "../_components/PrimaryButton";
import SocialAuthButton from "../_components/SocialAuthButton";
import LinkComp from "../_components/LinkComp";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { registerUser } from "@/app/providers/TheQueryProvider";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/toast/Toast";
import { useAuth } from "@/app/providers/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showNotification } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(registerUser, {
    onSuccess: (data) => {
      login(data?.user);
      showNotification(
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-3xl text-center">
            Account created successfully! Welcome to the journey!
          </p>
        </div>
      );
      router.push("/verify");
    },
    onError: (error) => {
      console.error("Registration failed:", error.message);
      alert("Registration failed. Please try again.");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-[95%] lg:w-[50%] min-w-[400px]p-4 pt-2 rounded-lg border shadow-md">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-4">
        Create Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          id="name"
          type="text"
          label="Name"
          placeholder="Enter your full name"
          {...register("name")}
          error={errors.name?.message}
        />
        <InputField
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputField
          id="password"
          type="password"
          label="Password"
          placeholder="Create a password"
          {...register("password")}
          error={errors.password?.message}
        />

        <PrimaryButton label="Sign Up" />
      </form>
      <LinkComp
        href={"/login"}
        text={"Already have an account? Login"}
        classNames="text-center mt-4"
      />

      <div className="flex flex-col gap-2 my-5">
        <SocialAuthButton
          icon={<FcGoogle className="text-3xl" />}
          label="Sign Up with Google"
          onClick={() => console.log("Google Sign Up")}
        />
        <SocialAuthButton
          icon={<FaApple className="text-3xl text-gray-900" />}
          label="Sign Up with Apple"
          onClick={() => console.log("Apple Sign Up")}
        />
      </div>
    </div>
  );
}
