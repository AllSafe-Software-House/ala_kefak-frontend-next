"use client";

import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import axiosInstance from "./axiosConfig";

const queryClient = new QueryClient();

export default function TheQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
}

// Get data
export const getData = async (target) => {
  const { data } = await axiosInstance.get(`/${target}`);
  console.log(data)
  return data;
};

// Add data
export const addData = async (target, payload) => {
  const { data } = await axiosInstance.post(`/${target}`, payload);
  return data;
};

// Update data
export const updateData = async (target,  payload) => {
  const { data } = await axiosInstance.put(`/${target}`, payload);
  return data;
};

// Delete data
export const deleteData = async (target, id) => {
  const { data } = await axiosInstance.delete(`/${target}/${id}`);
  return data;
};

// Login
export const loginUser  = async (payload) => {
  const { data } = await axiosInstance.post(`/login`, payload);
  return data;
};

// Register
export const registerUser  = async (payload) => {
  const { data } = await axiosInstance.post(`/signup`, payload);
  return data;
};

// Verify User
export const verifyUser = async (payload) => {
  const { data } = await axiosInstance.post(`/verification`, payload);
  return data;
};

// Reset Password
export const resetPassword = async (payload) => {
  const { data } = await axiosInstance.post(`/reset-password`, payload);
  return data;
};

export const CheckUser = async (userId) => {
  const  data  = await getData(`users/${userId}`);
  return data;
};
