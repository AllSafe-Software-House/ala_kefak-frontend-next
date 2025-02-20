// "use client";

// import { useAuth } from "@/app/providers/AuthContext";
// import { getData } from "@/app/providers/TheQueryProvider";
// import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
// import FreelancerProfile from "./FreelancerProfile";
// import StackholderProfile from "./StackholderProfile";

// const ProfileContent = () => {
//   const { user } = useAuth();
//   const [userType, setUserType] = useState(null);

//   const { data, isLoading, error } = useQuery(
//     ["userData", user?.user?.id],
//     () => getData(`users/${user?.user?.id}`),
//     {
//       enabled: !!user?.user?.id,
//     }
//   );
//   useEffect(() => {
//     if (data) {
//       console.log(data?.user?.name);
//       setUserType(data?.user?.acountType);
//     }
//   }, [user?.user?.id]);

//   if (isLoading) {
//     return <p>Loading user data...</p>;
//   }

//   if (error) {
//     return <p>Error fetching user data: {error.message}</p>;
//   }
//   return (
//     <>
//       {userType == "freelancer" ? (
//         <FreelancerProfile />
//       ) : (
//         <StackholderProfile />
//       )}
//     </>
//   );
// };

// export default ProfileContent;



"use client";

import { useAuth } from "@/app/providers/AuthContext";
import { getData } from "@/app/providers/TheQueryProvider";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import FreelancerProfile from "./FreelancerProfile";
import StackholderProfile from "./StackholderProfile";

const ProfileContent = () => {
  const { user } = useAuth();
  const [userType, setUserType] = useState(null);

  const { data, isLoading, error } = useQuery(
    ["userData", user?.user?.id],
    () => getData(`users/${user?.user?.id}`),
    {
      enabled: !!user?.user?.id,
    }
  );
  useEffect(() => {
    console.log(user.user.id)
    console.log(data)
    if (data) {
      console.log(data?.user?.name);
      setUserType(data?.user?.acountType);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>Error fetching user data: {error.message}</p>;
  }
  return (
    <>
      {userType == "freelancer" ? (
        <FreelancerProfile />
      ) : (
        <StackholderProfile />
      )}
    </>
  );
};

export default ProfileContent;
