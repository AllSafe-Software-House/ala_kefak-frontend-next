"use client";
import { useEffect } from "react";
import { useAuth } from "../providers/AuthContext";

const AuthLayout = ({ children }) => {
  const { isInAuth, setIsInAuth } = useAuth();
  useEffect(() => {
    setIsInAuth(true);
  });
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center  p-2 md:p-8">
      {/* <AuthHeading /> */}
      <div className="w-full min-h-[90vh] flex justify-center items-center  ">
        <div className="flex items-center justify-center w-[98%] md:w-[60%] min-w-[320px] md:min-w-[500px] ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
