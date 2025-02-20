"use client";

import { IoIosSearch } from "react-icons/io";
import { MdSort } from "react-icons/md";
import { AiOutlineLineChart } from "react-icons/ai";
import { useEffect, useState, useRef } from "react";
import { IoFilterOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useJobs } from "../layout";

const UpperNav = () => {
  const { data, setFilteredData } = useJobs();

  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [requiredLevels, setRequiredLevels] = useState([]);
  const [dropdownState, setDropdownState] = useState({
    categories: false,
    levels: false,
    sort: false,
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const currUrl = pathname.replace(/\s/g, "").toLowerCase();

  const navLinks = [
    { key: "best-matches", href: "/", text: "Best Matches" },
    { key: "most-recent", href: "/most-recent", text: "Most Recent" },
    { key: "saved-jobs", href: "/saved-jobs", text: "Saved Jobs" },
  ];

  const toggleDropdown = (type) => {
    setDropdownState((prevState) => ({
      categories: type === "categories" ? !prevState.categories : false,
      levels: type === "levels" ? !prevState.levels : false,
      sort: type === "sort" ? !prevState.sort : false,
    }));
  };

  useEffect(() => {
    if (data?.projects) {
      setCategories([
        ...new Set(data.projects.map((project) => project.category)),
      ]);
      setRequiredLevels([
        ...new Set(data.projects.map((project) => project.requiredLevel)),
      ]);
      console.log(data?.projects);
    }
  }, [data]);

  useEffect(() => {
    let filtered = data?.projects || [];

    if (searchText) {
      console.log(searchText);
      filtered = data?.projects?.filter((project) =>
        project?.projectTitle?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = data?.projects?.filter(
        (project) => project.category === selectedCategory
      );
    }

    if (selectedLevel) {
      filtered = data?.projects?.filter(
        (project) => project.requiredLevel === selectedLevel
      );
    }

    if (sortOrder === "oldest") {
      filtered = data?.projects?.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (sortOrder === "highestSalary") {
      filtered = data?.projects?.sort((a, b) => b.salary - a.salary);
    } else if (sortOrder === "lowestSalary") {
      filtered = data?.projects?.sort((a, b) => a.salary - b.salary);
    }

    setFilteredData(filtered);
  }, [searchText, selectedCategory, selectedLevel, sortOrder, data]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownState({ categories: false, levels: false, sort: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => setSearchText(searchQuery);

  const buttons = [
    {
      onClick: () => toggleDropdown("categories"),
      Icon: IoFilterOutline,
      text: "Categories",
    },
    {
      onClick: () => toggleDropdown("levels"),
      Icon: AiOutlineLineChart,
      text: "Level",
    },
    { onClick: () => toggleDropdown("sort"), Icon: MdSort, text: "Sort" },
  ];

  const renderDropdown = (type, items, setter) =>
    dropdownState[type] && (
      <div className="absolute top-full right-0 bg-white b mt-1 p-1 rounded-lg shadow-lg w-full lg:w-1/2 min-w-fit z-[90]">
          {items.map((item, index) => (
            <div
              key={index}
              className="py-2 px-2 lg-px-3 text-gray-700  hover:bg-gray-100 cursor-pointer whitespace-nowrap text-start"
              onClick={() => {
                setter(item);
                toggleDropdown(type);
              }}
            >
              {item}
            </div>
          ))}
      </div>
    );

  return (
    <div
      ref={dropdownRef}
      className="w-full flex flex-col lg:flex-row gap-4 justify-between items-center bg-gray-100 dark:bg-transparent  rounded-xl p-3"
    >
      <div className="w-full lg:w-1/2 flex items-center justify-around lg:justify-start gap-2 lg:gap-4">
        {navLinks.map(({ key, href, text }) => (
          <Link
            key={key}
            href={href}
            className={`text-[20px] text-gray-700 dark:text-white hover:text-primary animation ${
              currUrl === "/" && key === "best-matches"
                ? "!text-primary border-b border-primary"
                : currUrl.includes(key)
                ? "!text-primary border-b border-primary"
                : ""
            } `}
          >
            {text}
          </Link>
        ))}
      </div>

      <div className="w-full lg:w-1/2 grid grid-cols-2 lg:grid-cols-4 gap-2">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />
        {buttons.map(({ Icon, text, onClick }, index) => (
          <button
            onClick={onClick}
            key={index}
            className="relative flex justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:text-primary focus:text-primary animation"
          >
            <Icon className="text-xl" />
            <span>{text}</span>

            {text === "Categories" &&
              renderDropdown("categories", categories, setSelectedCategory)}
            {text === "Level" &&
              renderDropdown("levels", requiredLevels, setSelectedLevel)}
            {text === "Sort" &&
              renderDropdown(
                "sort",
                [
                  "Oldest to New",
                  "Highest Salary First",
                  "Lowest Salary First",
                ],
                setSortOrder
              )}
          </button>
        ))}
      </div>
    </div>
  );
};

const SearchInput = ({ value, onChange, onSearch }) => (
  <div className="flex items-center px-3 bg-white border border-gray-300 rounded-full text-gray-700 animation">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search..."
      className="text-gray-900  bg-inherit outline-none w-full"
    />
    <button
      className="text-gray-500 animation hover:text-primary text-2xl"
      onClick={onSearch}
    >
      <IoIosSearch />
    </button>
  </div>
);

export default UpperNav;
