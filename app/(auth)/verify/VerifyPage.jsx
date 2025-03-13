"use client";
import React, { useState, useEffect, useRef } from "react";
import PrimaryButton from "../_components/PrimaryButton";
import { useMutation } from "react-query";
import { useAuth } from "@/app/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/toast/Toast";
import axios from "axios";
import { baseUrl } from "@/app/providers/axiosConfig";
import { toast } from "sonner";
import CryptoJS from "crypto-js";




const SECRET_KEY = "your-secret-key"; // يمكنك استخدام متغيرات البيئة (environment variables) لتخزينه

// وظيفة لتشفير البيانات
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// وظيفة لفك تشفير البيانات
const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const VerifyPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(80);
  const { showNotification } = useToast();
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const verifyUser = async (payload) => {
    const response = await axios.post(`${baseUrl}/verify-otp`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };

  const mutation = useMutation(verifyUser, {
    onSuccess: (data) => {
      const encryptedToken = encryptData(data.data.token);
      console.log(encryptedToken) // تشفير الـ token
      // localStorage.setItem("alakefaktoken", encryptedToken ||data.data.token);
      localStorage.setItem("alakefaktoken", data.data.token)
      toast.success("Verification successful! Welcome!");
      router.push("/profile");
    },
    onError: (error) => {
      console.error("Verification failed:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Verification failed");
    },
  });

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

  const handleConfirm = () => {
    const payload = {
      email_or_username: localStorage.getItem("userEmail"),
      otp: otp.join(""),
    };
    mutation.mutate(payload);
  };

  const resendOtp = async (payload) => {
    const response = await axios.post(`${baseUrl}/resend-otp`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };

  const resendMutation = useMutation(resendOtp, {
    onSuccess: () => {
      toast.success("OTP resent successfully!");
      setTimer(80);
    },
    onError: (error) => {
      console.error("Resend failed:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    },
  });

  const handleResend = () => {
    const payload = { email_or_username: localStorage.getItem("userEmail") };
    resendMutation.mutate(payload);
  };

  return (
    <div className="w-full max-w-[400px] md:max-w-[500px] bg-white dark:bg-transparent p-6 pt-2 rounded-lg border shadow-md">
      <h2 className="text-3xl text-gray-900 dark:text-gray-300 font-bold text-center mb-4">
        Enter The Code We Sent To You
      </h2>

      <div className="w-full max-w-full flex justify-between gap-2 my-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            ref={index === 0 ? firstInputRef : null}
            onChange={(e) => handleChange(e, index)}
            className=" w-1/6 h-16 text-center text-xl border dark:bg-darkinput border-gray-300 dark:border-darkbg text-gray-800 dark:text-gray-300 rounded-md focus:outline-none focus:border-primary"
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
          className="block my-4 w-full text-sm md:text-xl font-medium hover:text-primary animation disabled:opacity-50"
          disabled={timer > 0}
        >
          Send Again?
        </button>
      </div>
    </div>
  );
};

export default VerifyPage;
