"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { MdCheckCircle, MdError, MdInfo, MdWarning } from "react-icons/md";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ isOpen: false, message: "", type: "info" });

  const showToast = (message, type = "info", duration = 3000) => {
    setToast({ isOpen: true, message, type });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, isOpen: false }));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastNotification {...toast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const ToastNotification = ({ isOpen, message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toastStyles = {
    success: {
      bg: "bg-green-600",
      icon: <MdCheckCircle className="text-white text-3xl" />,
    },
    error: {
      bg: "bg-red-600",
      icon: <MdError className="text-white text-3xl" />,
    },
    warning: {
      bg: "bg-yellow-500",
      icon: <MdWarning className="text-white text-3xl" />,
    },
    info: {
      bg: "bg-blue-500",
      icon: <MdInfo className="text-white text-3xl" />,
    },
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 rounded-lg text-white shadow-lg transition-all duration-300 ease-in-out
      ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
      ${toastStyles[type]?.bg}`}
    >
      {toastStyles[type]?.icon}
      <span className="text-lg">{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="text-white hover:text-gray-300 transition-all"
      >
        <IoMdClose className="text-2xl" />
      </button>
    </div>
  );
};
