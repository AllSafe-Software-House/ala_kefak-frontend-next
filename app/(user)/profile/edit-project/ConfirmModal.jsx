"use client";


import React from 'react'

const ConfirmModal = ({ modalMessage, confirmDelete, cancelDelete, translate, language }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] p-4">
    <div className="bg-white dark:bg-darknav rounded-lg p-6 max-w-md w-full border dark:border-gray-700 shadow-xl">
      <h3 className="text-lg font-medium mb-4 dark:text-white text-center">
        {modalMessage}
      </h3>
      <div
        className={`flex ${
          language === "ar" ? "flex-row-reverse" : "flex-row"
        } justify-center gap-4`}
      >
        <button
          onClick={cancelDelete}
          className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {translate("btns.cancel")}
        </button>
        <button
          onClick={confirmDelete}
          className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          {translate("btns.confirm")}
        </button>
      </div>
    </div>
  </div>
  )
}

export default ConfirmModal