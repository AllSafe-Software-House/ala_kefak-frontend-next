"use client";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import InputField from "../_components/InputField";
import PrimaryButton from "../_components/PrimaryButton";
import SocialAuthButton from "../_components/SocialAuthButton";
import LinkComp from "../_components/LinkComp";
import { useMutation } from "react-query";
import { useAuth } from "@/app/providers/AuthContext";
import { useRouter } from "next/navigation";
import {  useToast } from "@/app/components/toast/Toast";

const loginUser = async (userData) => {
  const response = await fetch(
    "https://alaa-kaifak.allsafeeg-project.com/api/v1/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log("User logged in:", data);
      showToast("Login successful!", "success");
      login(data); 
      router.push("/");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
      showToast(`Login failed. ${error.message}`, "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email_or_username: e.target.email.value,
      password: e.target.password.value,
    };
    mutation.mutate(userData);
  };

  return (
    <div className="w-full h-full bg-white dark:bg-darknav p-2 md:p-6 pt-2 rounded-lg border-2 shadow-md">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
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
          placeholder="Enter your password"
        />
        <LinkComp
          href={"/forget-password"}
          text={"Forget Password?"}
          classNames="text-end"
        />
        <PrimaryButton label="Login" />
      </form>
      <LinkComp
        href={"/sign-up"}
        text={"Create Account?"}
        classNames="text-center"
      />
      <div className="flex flex-col gap-2 my-5">
        <SocialAuthButton
          icon={<FcGoogle className="text-2xl" />}
          label="Login with Google"
          onClick={() => console.log("Google Login")}
        />
        <SocialAuthButton
          icon={<FaApple className="text-2xl text-gray-900" />}
          label="Login with Apple"
          onClick={() => console.log("Apple Login")}
        />
      </div>
    </div>
  );
}
