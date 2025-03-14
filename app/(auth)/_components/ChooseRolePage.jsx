"use client";

import React, { useState } from "react";
import PrimaryButton from "../_components/PrimaryButton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthContext";
import { useToast } from "@/app/components/toast/Toast";
import { useMutation } from "react-query";
import { updateData } from "@/app/providers/TheQueryProvider";
import LinkComp from "./LinkComp";
import { useTranslation } from "@/app/providers/Transslations";

const ChooseRolePage = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const router = useRouter();
  const { user } = useAuth();
  const { showNotification } = useToast();
  const { translate } = useTranslation();

  const mutation = useMutation(
    (userData) => updateData(`users/${user.id}`, userData),
    {
      onSuccess: () => {
        showNotification(
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-3xl text-center">
              {translate("signup.role_selected_success")}
            </p>
          </div>
        );
        router.push("/login");
      },
      onError: (error) => {
        console.error("Role selection failed:", error.message);
        alert(translate("signup.role_selection_failed"));
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert(translate("signup.select_role_alert"));
      return;
    }

    onRoleSelect(selectedRole);
  };

  return (
    <div className="w-full min-w-[300px] md:min-w-[400px] h-full flex flex-col justify-center items-center gap-8 p-2 md:p-8 ">
      
      <h2 className="text-2xl text-gray-900 dark:text-gray-300 md:text-3xl font-bold text-center mb-4">
        {translate("signup.role_selection")}
      </h2>
      <div className="w-full flex flex-col md:flex-row justify-around items-center gap-4">
        <RoleCard
          title={translate("signup.stakeholder")}
          description={translate("signup.stakeholder_description")}
          imageSrc="/images/stackholder.png"
          selected={selectedRole === "1"}
          onClick={() => setSelectedRole("1")}
        />

        <RoleCard
          title={translate("signup.freelancer")}
          description={translate("signup.freelancer_description")}
          imageSrc="/images/freelancer.png"
          selected={selectedRole === "2"}
          onClick={() => setSelectedRole("2")}
        />
      </div>

      <PrimaryButton
        label={translate("signup.continue_button")}
        onClick={handleSubmit}
        className="w-[60%] md:w-[40%]"
        disabled={!selectedRole}
      />
      <LinkComp
        href={"/login"}
        text={translate("signup.already_have_account")}
        classNames="text-center mt-4"
      />
    </div>
  );
};

export default ChooseRolePage;

const RoleCard = ({ title, description, imageSrc, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-full md:w-[45%] p-6 border-2 rounded-lg shadow-md flex flex-col items-center gap-4 cursor-pointer animation ${
        selected ? "border-primary" : "border-gray-300 dark:border-darkinput"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full border-2 animation ${
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
      <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
        {description}
      </p>
    </div>
  );
};