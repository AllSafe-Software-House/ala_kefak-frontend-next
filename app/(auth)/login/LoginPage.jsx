// "use client";
// import { FaApple } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import InputField from "../_components/InputField";
// import PrimaryButton from "../_components/PrimaryButton";
// import SocialAuthButton from "../_components/SocialAuthButton";
// import LinkComp from "../_components/LinkComp";
// import { useMutation } from "react-query";
// import { useAuth } from "@/app/providers/AuthContext";
// import { useRouter } from "next/navigation";
// import { useToast } from "@/app/components/toast/Toast";

// const loginUser = async (userData) => {
//   const response = await fetch(
//     "https://alaa-kaifak.allsafeeg-project.com/api/v1/login",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Invalid credentials");
//   }

//   return response.json();
// };

// export default function LoginPage() {
//   const { login } = useAuth();
//   const router = useRouter();
//   const { showToast } = useToast();

//   const mutation = useMutation(loginUser, {
//     onSuccess: (data) => {
//       console.log("User logged in:", data);
//       showToast("Login successful!", "success");
//       login(data);
//       router.push("/");
//     },
//     onError: (error) => {
//       console.error("Login failed:", error.message);
//       showToast(`Login failed. ${error.message}`, "error");
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userData = {
//       email_or_username: e.target.email.value,
//       password: e.target.password.value,
//     };
//     mutation.mutate(userData);
//   };

//   return (
//     <div className="w-[50%] h-full bg-white dark:bg-darknav p-2 md:p-6 pt-2 rounded-lg shadow-md">
//       <h2 className="text-xl md:text-3xl font-bold text-center mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <InputField
//           id="email"
//           type="email"
//           label="Email"
//           placeholder="Enter your email"
//         />
//         <InputField
//           id="password"
//           type="password"
//           label="Password"
//           placeholder="Enter your password"
//         />
//         <LinkComp
//           href={"/forget-password"}
//           text={"Forget Password?"}
//           classNames="text-end"
//         />
//         <PrimaryButton label="Login" />
//       </form>
//       <LinkComp
//         href={"/sign-up"}
//         text={"Create Account?"}
//         classNames="text-center"
//       />
//       <div className="flex flex-col gap-4 my-5">
//         <SocialAuthButton
//           icon={<FcGoogle className="text-3xl" />}
//           label="Login with Google"
//           onClick={() => console.log("Google Login")}
//         />
//         <SocialAuthButton
//           icon={<FaApple className="text-3xl text-gray-900" />}
//           label="Login with Apple"
//           onClick={() => console.log("Apple Login")}
//         />
//       </div>
//     </div>
//   );
// }



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
import { useToast } from "@/app/components/toast/Toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import {  loginUser } from "@/app/providers/TheQueryProvider";


const schema = yup.object().shape({
  email_or_username: yup.string().required("Email or username is required"),
  password: yup.string().required("Password is required"),
});

const loginUser = async (userData) => {
  const response = await fetch(
    "/api/login",
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
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      showToast("Login successful!", "success");
      login(data);
      router.push("/");
    },
    onError: (error) => {
      showToast(`Login failed. ${error.message}`, "error");
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
          type="text"
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
        <LinkComp href="/forget-password" text="Forget Password?" classNames="text-end" />
        <PrimaryButton label="Login" />
      </form>
      <LinkComp href="/sign-up" text="Create Account?" classNames="text-center" />
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
