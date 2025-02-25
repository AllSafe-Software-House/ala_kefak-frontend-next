"use client";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import FreelancerProfile from "./FreelancerProfile";
import StackholderProfile from "./StackholderProfile";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import UserSkeleton from "@/app/components/sceletons/UserSkeleton";
import { baseUrl } from "@/app/providers/axiosConfig";

const ProfileContent = () => {
  const [userType, setUserType] = useState(null);

  const { data, isLoading, error } = useQuery("userData", async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/auth/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

  useEffect(() => {
    if (data) {
      // console.log("data", data.data);
      setUserType(data.data.type);
    }
  }, [data]);

  if (isLoading) return <UserSkeleton />;
  if (error) return <ErrorPage />;

  return <FreelancerProfile user={data.data} /> 
  // return userType == 2 ? <FreelancerProfile user={data.data} /> : <StackholderProfile />;
};

export default ProfileContent;
