"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import { getData } from "@/app/providers/TheQueryProvider";
import LoadingProjects from "@/app/components/sceletons/LoadingProjects";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import Heading from "./components/Heading";
import UpperNav from "./components/UpperNav";

const ProposalsContext = createContext();

export const useProposals = () => useContext(ProposalsContext);

const ProposalsLayout = ({ children }) => {
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

  const isProposalPage = pathname.includes("proposal-detailes");



  if (isLoading) return <LoadingProjects />;
  if (error) return <ErrorPage />;

  return (
    <ProposalsContext.Provider
      value={{
        data,
        filteredData,
        setFilteredData,
        currentPage,
        setCurrentPage,
      }}
    >
      <div className="w-[98%] lg:w-[90%] mx-auto min-h-screen flex flex-col justify-start items-start gap-4 pt-8">
        {!isProposalPage && (
          <>
            <Heading text={"My Proposals"} />
            <UpperNav />
          </>
        )}
        {children}
      </div>
    </ProposalsContext.Provider>
  );
};

export default ProposalsLayout;
