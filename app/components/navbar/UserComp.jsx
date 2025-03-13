"use client";
import { useEffect, useRef, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { CiDollar } from "react-icons/ci";
import { RiCustomerService2Fill } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthContext";
import axiosInstance from "@/app/providers/axiosConfig";

const UserComp = ({ UserData, isLoading }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useAuth();

const handleLogout = () => {
  logout();
  axiosInstance.post("/auth/logout");
};

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading)
    return <div className="h-10 w-10 bg-gray-300 rounded-full"></div>;
  if (!UserData)
    return (
      <Link href="/login">
        <FiLogIn />
      </Link>
    );

  const menuItems = [
    { icon: CiDollar, text: "Balance", link: "/my-balance" },
    { icon: RiCustomerService2Fill, text: "Support", link: "/support" },
    { icon: CiSettings, text: "Settings", link: "/settings" },
    { icon: TbLogout, text: "Logout" },
  ];

  return (
    <div ref={menuRef} className="relative">
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden bg-green-400 flex items-center justify-center text-white text-xl lg:text-2xl font-medium cursor-pointer"
      >
        {UserData?.data?.personal_image ? (
          <img
          onError={(e) => {e.target.src = "https://cdn-icons-png.flaticon.com/512/219/219983.png"}}
            src={UserData?.data?.personal_image}
            alt="user"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white">
            {UserData?.data?.first_name?.charAt(0)}
          </span>
        )}
      </div>

      {menuOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 min-w-fit bg-white dark:bg-darknav rounded-md shadow-lg border border-gray-200 dark:border-darkinput text-base z-50">
          <Link
            href="/profile"
            className="w-full flex flex-col items-center px-4 py-2 text-gray-700 dark:text-white animation hover:bg-gray-100 dark:hover:bg-darkbg border-b-2"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={UserData?.data?.personal_image}
              alt="user"
              className="w-16 h-16 lg:w-28 lg:h-28 rounded-full object-cover border-2 border-slate-900"
            />
            <p className="text-base">{`${UserData?.data?.first_name} ${UserData?.data?.last_name}`}</p>
            <p className="text-sm">{UserData?.data?.acountType}</p>
          </Link>
          {menuItems.map(({ icon: Icon, text, link }, index) =>
            link ? (
              <Link
                key={index}
                href={link}
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-white animation hover:bg-gray-100 dark:hover:bg-darkbg"
                onClick={() => setMenuOpen(false)}
              >
                <Icon className="text-2xl" />
                <span>{text}</span>
              </Link>
            ) : (
              <button
                key={index}
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-white animation hover:bg-gray-100 dark:hover:bg-darkbg"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
              >
                <Icon className="text-2xl" />
                <span>{text}</span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UserComp;
