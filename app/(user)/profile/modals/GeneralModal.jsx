import React from "react";
import { IoClose } from "react-icons/io5";

const GeneralModal = ({ content, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm  "
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-darkbg w-full max-w-3xl max-h-[90vh]  p-6 rounded-lg shadow-lg overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
          <IoClose
          className="size-10 text-xl text-gray-800 cursor-pointer float-right flex justify-center items-center rounded-full border bg-gray-100 dark:bg-darkinput dark:text-gray-300 dark:border-gray-900 " onClick={onClose}
          />

        {content}

      </div>
    </div>
  );
};

export default GeneralModal;
