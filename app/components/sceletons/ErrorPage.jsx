"use client";

import { useRouter } from 'next/navigation'
import React from 'react'

const ErrorPage = () => {
  const router = useRouter()

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-red-100">
    <div className="p-6 bg-white rounded-lg shadow-lg text-center max-w-md">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        حدث خطأ أثناء تحميل البيانات
      </h1>
      <p className="text-gray-700 mb-4">
        { "يرجى المحاولة مرة أخرى لاحقًا."}
      </p>
      <button
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        onClick={() => router.refresh() }
      >
        إعادة تحميل الصفحة
      </button>
    </div>
  </div>
  )
}

export default ErrorPage