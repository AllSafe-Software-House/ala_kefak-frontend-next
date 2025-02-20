"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import { getData } from "@/app/providers/TheQueryProvider";
import LoadingProjects from "@/app/components/sceletons/LoadingProjects";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import Heading from "./components/Heading";
import UpperNav from "./components/UpperNav";

const ProjectsContext = createContext();

export const useProjects = () => useContext(ProjectsContext);

const ProjectsLayout = ({ children }) => {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const { data, isLoading, error } = useQuery(
    ["projects", currentPage],
    () => getData(`projects?page=${currentPage}`),
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (data?.projects) {
      setFilteredData(data.projects);
    }
  }, [data]);

  const isProjectPage = pathname.includes("project-details");



  if (isLoading) return <LoadingProjects />;
  if (error) return <ErrorPage />;

  return (
    <ProjectsContext.Provider
      value={{
        data,
        filteredData,
        setFilteredData,
        currentPage,
        setCurrentPage,
      }}
    >
      <div className="w-[98%] lg:w-[90%] mx-auto min-h-screen flex flex-col justify-start items-start gap-4 pt-8">
        {!isProjectPage && (
          <>
            <Heading text={"My Projects"} />
            <UpperNav />
          </>
        )}
        {children}
      </div>
    </ProjectsContext.Provider>
  );
};

export default ProjectsLayout;
