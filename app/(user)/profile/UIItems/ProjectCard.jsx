import Link from "next/link";

const ProjectCard = ({ project }) => {
  return (
    <Link href={`/profile/${project.id}?type=project`} className="mt-4 grid grid-cols-1 gap-4">
      <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={project.cover_image}
          alt="priject"
          className="w-full h-full object-cover"
        />
      </div>
      <div>{project.name}</div>
    </Link>
  );
};

export default ProjectCard