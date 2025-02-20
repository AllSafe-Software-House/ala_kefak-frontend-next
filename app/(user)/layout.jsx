"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthContext";
import { useEffect } from "react";

const UserLayout = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default UserLayout;
