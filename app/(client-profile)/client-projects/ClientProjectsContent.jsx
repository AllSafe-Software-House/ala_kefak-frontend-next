"use client";
import ProjectCard from "@/app/(myProposals)/components/ProjectCard";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import LoadingProjects from "@/app/components/sceletons/LoadingProjects";
import { getData } from "@/app/providers/TheQueryProvider";
import React, { useState } from "react";
import { useQuery } from "react-query";

const ClientProjectsContent = () => {
    const [currentPage, setCurrentPage] = useState(1);
  
  const { data, isLoading, error } = useQuery(
    ["projects", currentPage],
    () => getData(`projects?page=${currentPage}`),
    { keepPreviousData: true }
  );
  if (isLoading) return <LoadingProjects />;
  if (error) return <ErrorPage />;

  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex flex-col justify-start items-start gap-5 pb-10">
        {data?.projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <div className="w-full flex justify-start items-center gap-3">
          {Array.from({ length: data.pagesCount }).map((_, i) => (
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
    </div>
  );
};

export default ClientProjectsContent;
