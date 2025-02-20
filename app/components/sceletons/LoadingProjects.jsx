import ProjectSkeleton from './ProjectSkeleton';

const LoadingProjects = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <ProjectSkeleton key={i} />
      ))}
    </>
  );
}

export default LoadingProjects