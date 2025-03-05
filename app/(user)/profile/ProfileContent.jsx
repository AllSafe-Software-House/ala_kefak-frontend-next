"use client";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import FreelancerProfile from "./FreelancerProfile";
import StackholderProfile from "./StackholderProfile";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import UserSkeleton from "@/app/components/sceletons/UserSkeleton";
import axiosInstance, { baseUrl } from "@/app/providers/axiosConfig";
import { useTranslation } from "@/app/providers/Transslations";

const ProfileContent = () => {
  const [userType, setUserType] = useState(null);
  const { language, setLanguage, translate } = useTranslation();

  const { data, isLoading, error } = useQuery(["userData", language], async () => {
    const response = await axiosInstance.get(`/auth/profile`, {
      headers: {
        "Accept-Language": "language",
      },
    });
    return response.data;
  });

  useEffect(() => {
    if (data) {
      console.log(data)
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
