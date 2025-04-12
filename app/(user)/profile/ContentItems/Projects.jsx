import { useRouter } from 'next/navigation';
import AddBtn from '../UIItems/AddBtn';
import Heading from '../UIItems/Heading';
import ProjectCard from '../UIItems/ProjectCard';
import { useTranslation } from '@/app/providers/Transslations';
import { useState } from 'react';

const Projects = ({ user }) => {
  const { translate } = useTranslation();
  const [userProjects, setuserProjects] = useState(user?.projects)

  const router = useRouter()
  const handleNavigate = ()=>{
    router.push("/profile/add-project")
  }
  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading text={translate("profile.projects")} actions={[<AddBtn key="add" onClick={handleNavigate} />]} />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
        {userProjects?.map((project) => (
          <ProjectCard key={project.id} project={project} setuserProjects={setuserProjects} />
        ))}
      </div>
    </div>
  );
};

export default Projects