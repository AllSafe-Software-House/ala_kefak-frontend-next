"use client";
import React, { useState } from "react";
import PrimaryButton from "../_components/PrimaryButton";
import { toast } from "sonner";
import { useTranslation } from "@/app/providers/Transslations";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance, { baseUrl } from "@/app/providers/axiosConfig";
import { useMutation } from "react-query";

const ResetPassword = () => {
  const [stage, setStage] = useState(1);
  const { translate } = useTranslation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(translate("error.invalid_email"))
      .required(translate("error.required")),
    otp: yup
      .string()
      .length(6, translate("error.invalid_otp"))
      .required(translate("error.required")),
    newPassword: yup
      .string()
      .min(8, translate("error.password_min_length"))
      .required(translate("error.required")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], translate("error.passwords_mismatch"))
      .required(translate("error.required")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(
    async (data) => {
      const response = await axiosInstance.post(
        `${baseUrl}/forget-password`,
        { email_or_username: data.email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        if (data.status) {
          toast.success(data.message);
          setStage(2);
        } else {
          toast.error(data.message);
        }
      },
    }
  );

  const handleSendEmail = (data) => {
    mutation.mutate(data);
  };

  const goToNextStage = async () => {
    let isValid = false;

    switch (stage) {
      case 1:
        isValid = await trigger("email");
        break;
      case 2:
        isValid = await trigger("otp");
        break;
      case 3:
        isValid = await trigger(["newPassword", "confirmPassword"]);
        break;
      default:
        break;
    }

    if (isValid && stage < 4) {
      setStage(stage + 1);
    }
  };

  const goToPreviousStage = () => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  };

  const onSubmit = (data) => {
    toast.success("Password reset successfully!");
    console.log("Form Data:", data);
  };

  const Stage1 = () => (
    <div className="w-full h-[250px]  flex flex-col justify-around items-start">
      <h2 className="w-full text-xl md:text-3xl font-bold text-center mb-4">
        {translate("forget_password.enter_email")}
      </h2>
      <div className="w-full flex flex-col justify-start items-start gap-2 ">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder={translate("forget_password.enter_email")}
              className={`w-full px-3 py-2 border text-gray-900 dark:text-gray-300 border-gray-300 dark:border-gray-600 dark:bg-darkinput rounded-md focus:outline-none ${
                errors.email ? "border-redwarn focus:border-redwarn" : ""
              }`}
            />
          )}
        />
        {errors.email && (
          <p className="text-redwarn text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <PrimaryButton
        label={translate("forget_password.next")}
        onClick={() => {
          handleSendEmail({ email: control._formValues.email });
          goToNextStage();
        }}
      />
    </div>
  );

  const Stage2 = () => (
    <div>
      <h2 className="text-xl md:text-3xl font-bold text-center mb-4">
        {translate("forget_password.enter_otp")}
      </h2>
      <Controller
        name="otp"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="flex justify-between gap-2 mb-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={field.value[index] || ""}
                onChange={(e) => {
                  const newOtp = field.value.split("");
                  newOtp[index] = e.target.value;
                  field.onChange(newOtp.join(""));
                  if (e.target.value && index < 5) {
                    document.getElementById(`otp-${index + 1}`).focus();
                  }
                }}
                className="w-1/6 h-12 text-center text-xl border border-gray-300 dark:border-darkbg dark:bg-darkinput rounded-md"
                id={`otp-${index}`}
              />
            ))}
          </div>
        )}
      />
      {errors.otp && (
        <p className="text-redwarn text-sm mt-1">{errors.otp.message}</p>
      )}
      <PrimaryButton
        label={translate("forget_password.next")}
        onClick={goToNextStage}
      />
      <button
        onClick={goToPreviousStage}
        className="block w-full text-center text-sm text-gray-700 dark:text-gray-300 mt-2"
      >
        {translate("forget_password.back")}
      </button>
    </div>
  );

  const Stage3 = () => (
    <div>
      <h2 className="text-xl md:text-3xl font-bold text-center mb-4">
        {translate("forget_password.set_new_password")}
      </h2>
      <Controller
        name="newPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            type="password"
            placeholder={translate("forget_password.new_password")}
            className={`w-full px-3 py-1 border text-gray-900 dark:text-gray-300 border-gray-300 dark:border-gray-600 dark:bg-darkinput rounded-md focus:outline-none ${
              errors.newPassword ? "border-redwarn focus:border-redwarn" : ""
            }`}
          />
        )}
      />
      {errors.newPassword && (
        <p className="text-redwarn text-sm mt-1">
          {errors.newPassword.message}
        </p>
      )}
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            type="password"
            placeholder={translate("forget_password.confirm_password")}
            className={`w-full px-3 py-1 border text-gray-900 dark:text-gray-300 border-gray-300 dark:border-gray-600 dark:bg-darkinput rounded-md focus:outline-none ${
              errors.confirmPassword
                ? "border-redwarn focus:border-redwarn"
                : ""
            }`}
          />
        )}
      />
      {errors.confirmPassword && (
        <p className="text-redwarn text-sm mt-1">
          {errors.confirmPassword.message}
        </p>
      )}
      <PrimaryButton
        label={translate("forget_password.submit")}
        onClick={goToNextStage}
      />
      <button
        onClick={goToPreviousStage}
        className="block w-full text-center text-sm text-gray-700 dark:text-gray-300 mt-2"
      >
        {translate("forget_password.back")}
      </button>
    </div>
  );

  const Stage4 = () => (
    <div>
      <h2 className="text-xl md:text-3xl font-bold text-center mb-4">
        {translate("forget_password.success_title")}
      </h2>
      <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
        {translate("forget_password.success_message")}
      </p>
      <PrimaryButton
        label={translate("forget_password.go_to_login")}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );

  return (
    <div className="w-[95%] lg:w-[70%] min-w-[400px] min-h-[300px] h-full bg-white dark:bg-darknav p-2 md:p-6 pt-2 rounded-lg shadow-md flex  justify-center items-center">
      {stage === 1 && <Stage1 />}
      {stage === 2 && <Stage2 />}
      {stage === 3 && <Stage3 />}
      {stage === 4 && <Stage4 />}
    </div>
  );
};

export default ResetPassword;
