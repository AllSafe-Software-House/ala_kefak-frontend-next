"use client";
import { useEffect, useRef, useState } from "react";
import { IoIosSearch, IoMdNotificationsOutline } from "react-icons/io";
import { IoChatboxOutline } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { LightDarkToggle } from "./LightDarkToggle";
import { useAuth } from "../../providers/AuthContext";
import { useQuery } from "react-query";
import { getData } from "../../providers/TheQueryProvider";
import moment from "moment";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";
import UserComp from "./UserComp";
import MessageNotifySkeleton from "../sceletons/MessageNotifySkeleton";
import ErrorSkeleton from "../sceletons/ErrorSkeleton";
import { usePathname } from "next/navigation";
import { baseUrl } from "@/app/providers/axiosConfig";
import axios from "axios";

const navinks = {
  freelancer: [
    {
      id: 1,
      text: "Find Work",
      link: "/",
      subs: ["most-recent", "saved-jobs"],
    },
    {
      id: 2,
      text: "My Projects",
      link: "/my-projects",
      subs: [
        "my-projects",
        "declined-projects",
        "reviewed-projects",
        "pending-projects",
      ],
    },
    {
      id: 3,
      text: "My Proposals",
      link: "/my-proposals",
      subs: [
        "my-proposals",
        "declined-proposals",
        "reviewed-proposals",
        "pending-proposals",
        "saved-proposals",
      ],
    },
  ],
  stakeholder: [
    { id: 1, text: "Find Employee", link: "/find-employee", subs: [] },
    { id: 2, text: "Manage projects", link: "/manage-projects", subs: [] },
  ],
};

const Navbar = () => {
  const pathname = usePathname();
  const [searchText, setSearchText] = useState("");
  const [linksToShow, setLinksToShow] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    data: UserData,
    isLoading,
    error,
  } = useQuery("userData", async () => {
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
    if (!isLoading && !error && UserData) {
      const userType = UserData.data.type;
      setLinksToShow(userType === 2 ? navinks.freelancer : navinks.stakeholder);
    }
  }, [UserData]);

  return (
    <nav className="z-[99] fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 lg:px-6 bg-white dark:bg-darknav">
      <Logo />

      {/* Large Screen Menu */}
      <div className="hidden lg:flex flex-grow justify-between items-center">
        <div className="flex items-center gap-8 text-sm lg:text-xl font-medium text-gray-700 dark:text-white ps-6">
          {linksToShow.map((link) => (
            <NavLink
              key={link.id}
              href={link.link}
              subs={link.subs}
              pathname={pathname}
            >
              {link.text}
            </NavLink>
          ))}
        </div>
        <div className="flex justify-around items-center gap-8">
          <SearchInput
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <RightSection UserData={UserData} isLoading={isLoading} />
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div
        className="text-2xl lg:hidden cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <CiMenuFries />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <MobileMenu
          isOpen={menuOpen}
          toggleMenu={() => setMenuOpen(!menuOpen)}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      )}
    </nav>
  );
};

export default Navbar;

const NavLink = ({ href, children, subs, pathname }) => {
  useEffect(() => {
    console.log(pathname);
    console.log(href);
  }, [pathname]);

  const isActive = subs?.some((path) => pathname == `/${path}`);
  const isHome = pathname === "/";
  return (
    <Link
      href={href}
      className={`animation hover:text-primary  ${
        isActive || pathname === href
          ? "text-primary"
          : "text-gray-700 dark:text-white"
      }`}
    >
      {children}
    </Link>
  );
};

const SearchInput = ({ value, onChange }) => (
  <div className="flex items-center bg-gray-100 dark:bg-darkinput px-4 py-2 border border-gray-400 rounded-full animation hover:border-gray-800  ">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search..."
      className="text-gray-900 dark:text-white bg-inherit outline-none w-full"
    />
    <button className="text-gray-500 animation hover:text-primary text-2xl">
      <IoIosSearch />
    </button>
  </div>
);

const RightSection = ({ UserData, isLoading }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const notificationsRef = useRef(null);
  const messagesRef = useRef(null);

  const toggleDropdown = (dropdownType) => {
    setActiveDropdown((prev) => (prev === dropdownType ? null : dropdownType));
  };

  // click outside notifications || messages modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeDropdown === "notifications" &&
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }

      if (
        activeDropdown === "messages" &&
        messagesRef.current &&
        !messagesRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  return (
    <div className="flex items-center space-x-4 text-xl lg:text-3xl">
      {/* Notifications Icon */}
      {UserData && (
        <>
          <div
            className="relative cursor-pointer"
            onClick={() => toggleDropdown("notifications")}
          >
            <IoMdNotificationsOutline
              className={`w-10 h-10 lg:w-12 lg:h-12 p-2 text-gray-500 animation hover:text-primary bg-gray-100 dark:bg-darkinput rounded-full ${
                activeDropdown === "notifications" ? "text-primary" : ""
              } `}
            />
            {activeDropdown === "notifications" && (
              <div ref={notificationsRef}>
                <NotificationsDropdown />
              </div>
            )}
          </div>

          {/* Messages Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => toggleDropdown("messages")}
          >
            <IoChatboxOutline
              className={`w-10 h-10 lg:w-12 lg:h-12 p-2 text-gray-500 animation hover:text-primary bg-gray-100 dark:bg-darkinput rounded-full ${
                activeDropdown === "messages" ? "text-primary" : ""
              } `}
            />
            {activeDropdown === "messages" && (
              <div ref={messagesRef}>
                <MessagesDropdown />
              </div>
            )}
          </div>
        </>
      )}

      {/* Light/Dark Toggle */}
      <LightDarkToggle />

      {/* User Component */}
      <UserComp UserData={UserData} isLoading={isLoading} />
    </div>
  );
};
const MobileMenu = ({ isOpen, toggleMenu, searchText, setSearchText }) => (
  <div className="absolute top-full left-0 w-full lg:hidden">
    <motion.div
      onClick={toggleMenu}
      className="w-full absolute top-0 left-0 h-screen backdrop-blur-md"
      initial={{ x: "-100%" }}
      animate={isOpen ? { x: "0%" } : { x: "100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-0 left-0 w-[80%] h-screen bg-white dark:bg-gray-900 flex flex-col items-start p-4 gap-4 z-50 shadow-md"
      initial={{ x: "-100%" }}
      animate={isOpen ? { x: "0%" } : { x: "-100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <NavLink href="#">Find Work</NavLink>
      <NavLink href="#">My Projects</NavLink>
      <NavLink href="#">My Proposals</NavLink>
      <SearchInput
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <RightSection />
    </motion.div>
  </div>
);

const NotificationsDropdown = () => {
  const { data, isLoading, error, refetch } = useQuery("notifications", () =>
    getData("notifications")
  );

  return (
    <div
      className="absolute top-full right-0 w-[300px] md:w-[600px] bg-white dark:bg-darknav shadow-lg rounded-md p-3 z-50 border dark:border-darkinput "
      data-lenis-prevent="true"
    >
      {isLoading ? (
        <MessageNotifySkeleton />
      ) : error ? (
        <ErrorSkeleton func={refetch} />
      ) : (
        <div className="max-h-[50vh] overflow-y-scroll">
          {data?.notifications?.map((notification) => (
            <Link
              href={`/notifications?notificationid=${notification.id}`}
              key={notification.id}
              className="flex justify-start items-center gap-4 animation hover:bg-primary/20 rounded-lg p-2"
            >
              <div className="rounded-full text-xl p-3 bg-gray-100 text-slate-900">
                <FaRegUser />
              </div>
              <div className="w-full text-sm flex flex-col justify-start items-start gap-2">
                <p className="line-clamp-2">{notification.text}</p>
                <p className="text-xs self-end">
                  {moment(new Date(notification.timestamp)).fromNow()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Link
        href={"/notifications"}
        className="w-full text-lg font-semibold mb-2 animation flex justify-start items-center gap-2 mt-3 text-gray-900 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
      >
        <IoMdNotificationsOutline className="text-3xl" />
        <span>Show All Notifications</span>
      </Link>
    </div>
  );
};

const MessagesDropdown = () => {
  const { data, isLoading, error, refetch } = useQuery("conversations", () =>
    getData("conversations")
  );

  return (
    <div
      className="absolute top-full right-0 w-[300px] md:w-[600px] bg-white dark:bg-darknav shadow-lg rounded-md p-3 z-50 border dark:border-darkinput "
      data-lenis-prevent="true"
    >
      {isLoading ? (
        <MessageNotifySkeleton />
      ) : error ? (
        <ErrorSkeleton func={refetch} />
      ) : (
        <div className="max-h-[50vh] overflow-y-scroll">
          {data?.conversations?.map((conversation) => (
            <Link
              href={`/messages?conversationid=${conversation.id}`}
              key={conversation.id}
              className="flex justify-start items-center gap-4 animation hover:bg-primary/20 rounded-lg p-2"
            >
              <div className="rounded-full text-xl p-3 bg-gray-100 text-slate-900">
                <FaRegUser />
              </div>
              <div className="w-full text-sm flex flex-col justify-start items-start gap-2">
                <p>{conversation.participants[0]}</p>
                <p className="line-clamp-2">
                  {conversation.messages[conversation.messages.length - 1].text}
                </p>
                <p className="text-xs self-end">
                  {moment(
                    new Date(
                      conversation.messages[
                        conversation.messages.length - 1
                      ].timestamp
                    )
                  ).fromNow()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link
        href={"/messages"}
        className="w-full text-lg font-semibold mb-2 animation flex justify-start items-center gap-2 mt-3 text-gray-900 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
      >
        <IoChatboxOutline className="text-3xl" />
        Show All Messages
        <span></span>
      </Link>
    </div>
  );
};
