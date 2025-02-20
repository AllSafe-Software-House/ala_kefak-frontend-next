"use client";
import axios from "axios";

// const baseUri = "http://localhost:8000";
// const baseUri = "/api";

const baseUri = "https://alaa-kaifak.allsafeeg-project.com/api";
const version = "v1";

const axiosInstance = axios.create({
  baseURL: `${baseUri}/${version}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor لإضافة التوكن
axiosInstance.interceptors.request.use(
  (config) => {
    const lang = localStorage.getItem("language") || "en"; 
    const token = localStorage.getItem("token"); // الحصول على التوكن من localStorage

    config.headers["Accept-Language"] = lang;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // إضافة التوكن في الهيدرز
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor لإدارة الأخطاء العامة
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please log in again."); 
      // يمكن هنا إعادة توجيه المستخدم لصفحة تسجيل الدخول
      localStorage.removeItem("token"); // حذف التوكن من التخزين
      window.location.href = "/login"; // توجيه المستخدم لتسجيل الدخول
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
