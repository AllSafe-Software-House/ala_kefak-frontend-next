import React from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useTranslation } from "@/app/providers/Transslations";
const GeneralModal = ({ content, onClose, classNames="" }) => {
    const { language } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex w-full h-[100vh] items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm  "
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative bg-white dark:bg-darkbg w-full max-w-3xl max-h-[70vh] p-4 rounded-lg shadow-lg overflow-auto ${classNames}`}
        onClick={(e) => e.stopPropagation()}
      >
        <IoClose
          className={`size-10 text-xl text-gray-800 cursor-pointer flex justify-center items-center rounded-full border bg-gray-100 dark:bg-darkinput dark:text-gray-300 dark:border-gray-900
            ${language == "ar" ? "mr-auto" : "ml-auto"} hover:!text-danger/80 hover:!bg-danger/10 animation
            `}
          onClick={onClose}
        />

        <div className="p-4 mt-4 max-h-[65vh] overflow-y-auto ">
        {content}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GeneralModal;
