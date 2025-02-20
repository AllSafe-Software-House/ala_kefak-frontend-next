import { useRouter } from 'next/navigation';
import AddBtn from '../UIItems/AddBtn';
import Heading from '../UIItems/Heading';
import ProjectCard from '../UIItems/ProjectCard';

const Projects = ({ user }) => {
  const router = useRouter()
  const handleNavigate = ()=>{
    router.push("/profile/add-project")
  }
  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading text={"Projects"} actions={[<AddBtn key="add" onClick={handleNavigate} />]} />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
        {user.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects