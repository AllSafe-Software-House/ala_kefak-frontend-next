"use client";

import ProjectCard from "../components/ProjectCard";
import { useProposals } from "../layout";

const page = () => {
  const { data,filteredData, currentPage, setCurrentPage } = useProposals();
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex flex-col justify-start items-start gap-5 pb-10">
        {filteredData.map((project) => (
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
}
export default page
