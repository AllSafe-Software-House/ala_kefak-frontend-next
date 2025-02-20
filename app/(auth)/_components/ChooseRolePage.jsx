"use client";

import React, { useState } from "react";
import PrimaryButton from "../_components/PrimaryButton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthContext";
import {  useToast } from "@/app/components/toast/Toast";
import { useMutation } from "react-query";
import { updateData } from "@/app/providers/TheQueryProvider";

const ChooseRolePage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const { showNotification } = useNotification();

  const mutation = useMutation(
    (userData) => updateData(`users/${user.id}`, userData),
    {
      onSuccess: () => {
        showNotification(
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-3xl text-center">Role selected successfully</p>
          </div>
        );
        router.push("/login");
      },
      onError: (error) => {
        console.error("Role selection failed:", error.message);
        alert("Role selection failed. Please try again.");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }

    const userData = {
      ...user,
      acountType: selectedRole,
      companies: [],
      offers: [],
    };

    mutation.mutate(userData);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-8 p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Continue As A
      </h2>
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
        <RoleCard
          title="A Stackholder"
          description="Hiring for a project"
          imageSrc="/images/stackholder.png"
          selected={selectedRole === "stackholder"}
          onClick={() => setSelectedRole("stackholder")}
        />

        <RoleCard
          title="A Freelancer"
          description="Looking for job"
          imageSrc="/images/freelancer.png"
          selected={selectedRole === "freelancer"}
          onClick={() => setSelectedRole("freelancer")}
        />
      </div>

      <PrimaryButton
        label="Continue"
        onClick={handleSubmit}
        className="w-[60%] md:w-[40%]"
      />
    </div>
  );
};

export default ChooseRolePage;

const RoleCard = ({ title, description, imageSrc, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-full md:w-[45%] p-6 border-2 rounded-lg shadow-md flex flex-col items-center gap-4 cursor-pointer ${
        selected ? "border-primary" : "border-gray-300"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full border-2 ${
          selected ? "bg-primary border-primary" : "border-gray-300"
        }`}
      />
      <div className="w-full h-32 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 text-center">{description}</p>
    </div>
  );
};
