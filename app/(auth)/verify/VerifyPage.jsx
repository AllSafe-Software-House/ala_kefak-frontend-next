"use client";

import React, { useState, useEffect } from "react";
import PrimaryButton from "../_components/PrimaryButton";
import { useMutation } from "react-query";
import { useAuth } from "@/app/providers/AuthContext";
import { verifyUser } from "@/app/providers/TheQueryProvider";
import { useRouter } from "next/navigation";
import {  useToast } from "@/app/components/toast/Toast";

const VerifyPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(80);
  const { showNotification } = useToast();

  // Mutation for verifying OTP
  const mutation = useMutation(verifyUser, {
    onSuccess: (data) => {

      showNotification(
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-3xl text-center">
            Account created successfully! Welcome to the journey!
          </p>
        </div>
      );
      router.push("/choose-type");
    },
    onError: (error) => {
      console.error("Verification failed:", error.response?.data?.message);
      alert(error.response?.data?.message || "Verification failed");
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleResend = () => {
    setTimer(80);
    console.log("Resend OTP");
    // Logic for resending OTP can be implemented here.
  };

  const handleConfirm = () => {
    console.log(user);
    const payload = {
      email: user.email,
      verifyCode: otp.join(""),
    };
    mutation.mutate(payload);
  };

  return (
    <div className="w-[95%] lg:w-[50%] min-w-[400px] bg-white dark:bg-transparent p-6 pt-2 rounded-lg border  shadow-md">
      <h2 className="text-3xl text-gray-900 dark:text-gray-300 font-bold text-center mb-4">
        Enter The Code We Sent To Your Email
      </h2>

      <div className="flex justify-around gap-2 my-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            className="w-16 h-16 text-center text-xl border dark:bg-darkinput border-gray-300 dark:border-darkbg text-gray-800 dark:text-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
        ))}
      </div>
      <div className="w-full text-end text-base text-gray-700 dark:text-gray-300 my-6">
        {timer > 0
          ? `ends in ${Math.floor(timer / 60)}:${timer % 60}`
          : "Time expired"}
      </div>
      <PrimaryButton label="Confirm" onClick={handleConfirm} />
      <div className="text-center mt-4">
        <button
          onClick={handleResend}
          className="block my-4 w-full text-sm md:text-xl font-medium hover:text-primary animation"
          disabled={timer > 0}
        >
          Send Again?
        </button>
      </div>
    </div>
  );
};

export default VerifyPage;
