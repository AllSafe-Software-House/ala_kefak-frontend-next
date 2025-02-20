"use client";

import {  useToast } from "@/app/components/toast/Toast";
import ProjectCard from "../components/ProjectCard";
import { useJobs } from "../layout";
import GenProjectCard from "@/app/components/generalComps/GenProjectCard";

const PageContent = () => {
  const { data, filteredData, currentPage, setCurrentPage } = useJobs();
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex flex-col justify-start items-start gap-5 pb-10">
        {filteredData?.map((project) => (
          <GenProjectCard key={project.id} project={project} />
        ))}

      </div>
    </div>
  );
};

export default PageContent;
