"use client";
import { FaShareSquare, FaStar, FaRegStar } from "react-icons/fa";
import { useQuery } from "react-query";
import { getData } from "../providers/TheQueryProvider";
import { useAuth } from "../providers/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ClientLayout = ({ children }) => {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery(
    ["userData", user?.user?.id],
    () => getData(`user?id=${user?.user?.id}`),
    { enabled: !!user?.user?.id }
  );

  const Links = [
    {
      href: "/client-overview",
      text: "Overview",
    },
    {
      href: "/client-projects",
      text: "Projects",
    },
  ];

  const pathname = usePathname();
  const currUrl = pathname.replace(/\s/g, "").toLowerCase();

  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  return (
    <div className="min-h-screen mx-auto p-6 px-3 md:px-8 lg:px-16 flex flex-col gap-16 bg-gray-100 dark:bg-transparent">
      <Hero user={data.user} />
      <div className="flex mt-4 text-xl">
        {Links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 animation hover:text-primary/50 ${
              currUrl == item.href ? "text-primary border-b-primary" : "text-gray-800 dark:text-gray-200"
            } `}
          >
            {item.text}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
};

export default ClientLayout;

const Hero = ({ user }) => {
  const fullStars = Math.floor(user.rating);
  const emptyStars = 5 - fullStars;
  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="w-full flex justify-end items-center gap-6">
        <button className="flex justify-center items-center gap-2 border-primary border-2 bg-white text-primary py-2 px-4 rounded-xl hover:bg-primary hover:text-white animation">
          <span>Share</span>
          <FaShareSquare />
        </button>
      </div>
      <div className="relative w-56 h-56">
        <img
          src={user?.image}
          alt="Freelancer"
          className="w-full h-full object-cover rounded-full border-gray-700 border-2"
        />
      </div>
      <h2 className="mt-4 text-2xl font-medium">{user.name}</h2>
      <p className="text-gray-500">{user.location}</p>
      <div className="flex items-center mt-2">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
      </div>
    </div>
  );
};
