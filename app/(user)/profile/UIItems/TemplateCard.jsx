import Link from "next/link";

const TemplateCard = ({ project }) => {
  return (
    <Link href={`/profile/project?type=template&projectId=${project.id}`} className="mt-4 grid grid-cols-1 gap-4">
      <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={project?.image}
          alt="priject"
          className="w-full h-full object-cover"
        />
      </div>
      <div>{project?.title}</div>
    </Link>
  );
}

export default TemplateCard