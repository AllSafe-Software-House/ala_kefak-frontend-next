"use client"
import { useSearchParams } from "next/navigation";
import ProjectDetailsPage from "./ProjectDetailsPage";
import LoadingProjects from "@/app/components/sceletons/LoadingProjects";
import { Suspense } from "react";

const page = () => {


  
  return (
    <Suspense fallback={<LoadingProjects />}>
      <ProjectDetailsPage  />
    </Suspense>
  );
};

export default page;


