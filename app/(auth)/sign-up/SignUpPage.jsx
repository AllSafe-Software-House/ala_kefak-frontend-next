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
import {  useToast } from "@/app/components/toast/Toast";
import { useAuth } from "@/app/providers/AuthContext";

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();

  const { showNotification } = useNotification();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    mutation.mutate(userData);
  };

  return (
    <div className="w-full p-4 pt-2 rounded-lg border-2 shadow-md">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-4">
        Create Account
      </h2>
      <form onSubmit={handleSubmit}>
        <InputField
          id="name"
          type="text"
          label="Name"
          placeholder="Enter your full name"
        />
        <InputField
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
        <InputField
          id="password"
          type="password"
          label="Password"
          placeholder="Create a password"
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
          icon={<FcGoogle className="text-2xl" />}
          label="Sign Up with Google"
          onClick={() => console.log("Google Sign Up")}
        />
        <SocialAuthButton
          icon={<FaApple className="text-2xl text-gray-900" />}
          label="Sign Up with Apple"
          onClick={() => console.log("Apple Sign Up")}
        />
      </div>
    </div>
  );
}
