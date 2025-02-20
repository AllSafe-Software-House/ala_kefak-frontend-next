"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import { getData } from "@/app/providers/TheQueryProvider";
import LoadingProjects from "@/app/components/sceletons/LoadingProjects";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import Heading from "./components/Heading";
import GenUpperNav from "../components/generalComps/GenUpperNav";
import { BsFillBarChartFill } from "react-icons/bs";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";

const JobsContext = createContext();
export const useJobs = () => useContext(JobsContext);

const JobsLayout = ({ children }) => {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery(
    ["projects", currentPage],
    () => getData(`projects?page=${currentPage}`),
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (data?.projects) {
      setCategories([...new Set(data.projects.map((p) => p.category))]);
      setLevels([...new Set(data.projects.map((p) => p.requiredLevel))]);
    }
  }, [data]);
  const getHeadingText = () => {
    if (pathname.includes("best-matches")) return "Best Matches Projects";
    if (pathname.includes("most-recent")) return "Most Recent Projects";
    if (pathname.includes("saved-jobs")) return "Saved Jobs";
    return "Best Matches Projects";
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let filtered = data?.projects || [];

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (selectedLevel) {
      filtered = filtered.filter((p) => p.requiredLevel === selectedLevel);
    }
    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        if (sortOrder === "Oldest to New")
          return new Date(a.date) - new Date(b.date);
        if (sortOrder === "Highest Salary First") return b.salary - a.salary;
        if (sortOrder === "Lowest Salary First") return a.salary - b.salary;
        return 0;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p?.projectTitle?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [data, selectedCategory, selectedLevel, sortOrder, searchQuery]);

  const navLinks = [
    { key: "best-matches", href: "/", text: "Best Matches" },
    { key: "most-recent", href: "/most-recent", text: "Most Recent" },
    { key: "saved-jobs", href: "/saved-jobs", text: "Saved Jobs" },
  ];

  if (isLoading) return <LoadingProjects />;
  if (error) return <ErrorPage />;

  return (
    <JobsContext.Provider
      value={{
        data,
        filteredData,
        setFilteredData,
        currentPage,
        setCurrentPage,
      }}
    >
      <div className="w-[95%] lg:w-[90%] mx-auto min-h-screen flex flex-col justify-start items-start gap-4 pt-6 mb-8">
        {!pathname.includes("project-details") && (
          <>
            <Heading text={getHeadingText()} />
            <GenUpperNav
              navLinks={navLinks}
              SearchInput={
                <SearchInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onSearch={() => console.log("Searching:", searchQuery)}
                />
              }
              filters={[
                {
                  key: "categories",
                  icon: <IoFilterOutline />,
                  label: "Categories",
                  options: categories,
                  setter: setSelectedCategory,
                },
                {
                  key: "levels",
                  icon: <BsFillBarChartFill />,
                  label: "Level",
                  options: levels,
                  setter: setSelectedLevel,
                },
                {
                  key: "sort",
                  icon: <RiArrowLeftRightFill className="rotate-90" />,
                  label: "Sort",
                  options: [
                    "Oldest to New",
                    "Highest Salary First",
                    "Lowest Salary First",
                  ],
                  setter: setSortOrder,
                },
              ]}
            />
          </>
        )}
        {children}
        <div className="w-full flex justify-start items-center gap-3">
          {Array.from({ length: data?.pagesCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`size-12 rounded-lg ${
                currentPage === i + 1
                  ? "bg-primary text-white"
                  : "border-primary border-2 bg-white text-primary"
              } text-xl flex justify-center items-center animation hover:bg-primary/80 hover:text-white `}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </JobsContext.Provider>
  );
};

export default JobsLayout;

const SearchInput = ({ value, onChange, onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`w-full lg:w-fit relative flex items-center bg-white dark:bg-darkinput overflow-hidden px-6 rounded-full animation origin-center 
        border border-gray-300 text-gray-700 animation hover:border-gray-800
        ${isFocused ? "flex-grow" : "flex-grow-0"}`}
    >
      <button
        className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 animation hover:text-primary hover:scale-125 text-2xl ${
          isFocused ? "left-[92%]" : "left-2"
        }`}
        onClick={onSearch}
      >
        <IoIosSearch />
      </button>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search..."
        className="w-[90%] mx-auto text-gray-900 dark:text-gray-200 bg-inherit outline-none py-1 lg:py-2"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
