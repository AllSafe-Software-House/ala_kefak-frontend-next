// "use client";
// import GenHeading from "@/app/components/generalComps/GenHeading";
// import { getData } from "@/app/providers/TheQueryProvider";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { FaRegStar, FaShareSquare, FaStar } from "react-icons/fa";
// import { useQuery } from "react-query";

// const Freelancer = () => {
//   const searchParams = useSearchParams();
//   const userId = searchParams.get("userId");
//   const [userData, setUserData] = useState(null);

//   const { data, isLoading, error } = useQuery(
//     ["userData", userId],
//     () => getData(`users/${userId}`),
//     { enabled: !!userId }
//   );
//   useEffect(() => {
//     if (data) {
//       setUserData(data?.user);
//       console.log(data?.user);
//     }
//   }, [data]);

//   if (isLoading) return <p>Loading user data...</p>;
//   if (error) return <p>Error fetching user data: {error.message}</p>;

//   return (
//     <div className="min-h-screen mx-auto p-6 px-3 md:px-8 lg:px-16 flex flex-col gap-16 bg-gray-100 dark:bg-transparent ">
//       <Hero user={data?.user} />
//       <Content user={data?.user} />
//     </div>
//   );
// };

// export default Freelancer;

// const Hero = ({ user }) => {
//   const fullStars = Math.floor(user?.rating);
//   const emptyStars = 5 - fullStars;
//   return (
//     <div className="w-full flex flex-col items-center text-center">
//       <div className="w-full flex justify-end items-center gap-6">
//         <button className="flex justify-center items-center gap-2 border-primary border-2 bg-white text-primary py-2 px-4 rounded-xl hover:bg-primary hover:text-white animation">
//           <span>Share</span>
//           <FaShareSquare />
//         </button>
//       </div>
//       <div className="relative w-56 h-56">
//         <img
//           src={user?.image}
//           alt="Freelancer"
//           className="w-full h-full object-cover rounded-full border-gray-700 border-2"
//         />
//       </div>
//       <h2 className="mt-4 text-2xl font-medium">{user?.name}</h2>
//       <p className="text-gray-500">{user?.location}</p>
//       <div className="flex items-center mt-2">
//         {[...Array(fullStars)].map((_, index) => (
//           <FaStar key={index} className="text-yellow-500" />
//         ))}
//         {[...Array(emptyStars)].map((_, index) => (
//           <FaRegStar key={index} className="text-yellow-500" />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Content = ({ user, openModal, closeModal }) => {
//   return (
//     <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[70%_28%] justify-between gap-4 mb-8">
//       <div className="w-full flex flex-col gap-10">
//         <Title user={user} />
//         <Skills user={user} />
//         <Projects user={user} />
//         <Templates user={user} />
//         <WorkExperince user={user} />
//         <Education user={user} />
//         <Certificates user={user} />
//       </div>

//       <div className="w-full flex flex-col justify-start items-start gap-10">
//         <Badges user={user} />
//       </div>
//     </div>
//   );
// };

// const Title = ({ user }) => {
//   return (
//     <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-transparent">
//       <GenHeading text={user.about.title} />
//       <p className="text-sm md:text-base lg:text-base ">
//         {user.about.description}
//       </p>
//     </div>
//   );
// };
// const Skills = ({ user }) => {
//   return (
//     <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-transparent">
//       <GenHeading text={"Skills"} />
//       <div className="w-full flex justify-start items-center flex-wrap gap-2 md:gap-3 ">
//         {user.skills.map((skill, i) => (
//           <span
//             key={i}
//             className="text-gray-500 rounded-full text-sm md:text-base p-2 px-3 md:px-4 border-gray-800 bg-gray-100"
//           >
//             {skill}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };
// const Projects = ({ user }) => {
//   return (
//     <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-transparent">
//       <GenHeading text={"Projects"} />
//       <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
//         {user.projects.map((project) => (
//           <ProjectCard key={project.id} project={project} />
//         ))}
//       </div>
//     </div>
//   );
// };
// const WorkExperince = ({ user }) => {
//   return (
//     <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-transparent">
//       <GenHeading text={"Work Experience"} />
//       <div className="w-full grid grid-cols-1 gap-4">
//         {user?.workExperience?.map((experience) => (
//           <div key={experience.id} className="mt-4 grid grid-cols-1 gap-2">
//             <h1 className="text-base md:text-xl font-medium">{`${experience.jobTitle} | ${experience.companyName}`}</h1>
//             <p className="text-xs md:text-sm">{`${experience.startDate} - ${experience.endDate}`}</p>
//             <p className="text-sm md:text-base line-clamp-4">
//               {experience.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// const Templates = ({ user }) => {
//   return (
//     <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-transparent">
//       <GenHeading text={"Projects"} />
//       <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
//         {user.templates.map((template) => (
//           <TemplateCard key={template.id} project={template} />
//         ))}
//       </div>
//     </div>
//   );
// };
// const Education = ({ user }) => {
//   return (
//     <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-transparent">
//       <GenHeading text={"Education"} />
//       <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
//         {user.education.map((item) => (
//           <div key={item.id} className="mt-4 grid grid-cols-1 gap-2">
//             <h1 className="text-base md:text-xl font-medium">{`${item.institution} | ${item.fieldOfStudy}`}</h1>
//             <p className="text-xs md:text-sm">{`${item.startDate} - ${item.endDate}`}</p>
//             <p className="text-sm md:text-base line-clamp-4">{item.degree}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// const Certificates = ({ user }) => {
//   return (
//     <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-transparent">
//       <GenHeading text={"Certificates"} />
//       <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
//         {user.certificates.map((certificate) => (
//           <div key={certificate.id} className="mt-4 grid grid-cols-1 gap-2">
//             <h1 className="text-base md:text-xl font-medium">
//               {certificate.organization}
//             </h1>
//             <h1 className="text-base md:text-xl font-medium">
//               {certificate.title}
//             </h1>
//             <p className="text-sm md:text-base line-clamp-4">
//               {certificate.date}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const ProjectCard = ({ project }) => {
//   return (
//     <Link
//       href={`/profile/project?type=project&projectId=${project.id}`}
//       className="mt-4 grid grid-cols-1 gap-4"
//     >
//       <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
//         <img
//           src={project?.image}
//           alt="priject"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div>{project?.title}</div>
//     </Link>
//   );
// };

// const TemplateCard = ({ project }) => {
//   return (
//     <Link
//       href={`/profile/project?type=template&projectId=${project.id}`}
//       className="mt-4 grid grid-cols-1 gap-4"
//     >
//       <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
//         <img
//           src={project?.image}
//           alt="priject"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div>{project?.title}</div>
//     </Link>
//   );
// };

// const Badges = ({ user }) => {
//   return (
//     <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-transparent">
//       <GenHeading text={"Badges"} />
//       <div className="w-full grid grid-cols-1 gap-4">
//         {user.badges.map((badge) => (
//           <div
//             className="flex justify-start items-center gap-4"
//             key={badge.id}
//             badge={badge}
//           >
//             <img src={badge?.image} alt="badge" className="w-10 h-10" />
//             <div className="flex flex-col">
//               <h3 className="text-sm md:text-base font-medium">
//                 {badge.title}
//               </h3>
//               <p className="text-xs md:text-sm">{badge.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

"use client";
import GenHeading from "@/app/components/generalComps/GenHeading";
import { getData } from "@/app/providers/TheQueryProvider";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import { FaRegStar, FaShareSquare, FaStar } from "react-icons/fa";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import LoadingProjects from "@/app/components/sceletons/LoadingProjects";

// ✅ استرجاع بيانات الفريلانسر
const Freelancer = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [userData, setUserData] = useState(null);

  const { data, isLoading, error } = useQuery(
    ["userData", userId],
    () => getData(`users/${userId}`),
    { enabled: !!userId }
  );

  useEffect(() => {
    console.log(data?.user?.skills);
    setUserData(data?.user);
    // if (data?.user)
  }, [data]);

  if (isLoading) return <LoadingProjects />;
  if (error) return <ErrorPage />;

  return (
    <div className="min-h-screen mx-auto p-6 px-3 md:px-8 lg:px-16 flex flex-col gap-16 bg-gray-100 dark:bg-transparent">
      {userData && (
        <>
          <Hero user={userData} />
          <Content user={userData} />
        </>
      )}
    </div>
  );
};

export default Freelancer;

// ✅ مكون الـ Hero (عرض الصورة، الاسم، الموقع، والتقييم)
const Hero = ({ user }) => {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <ShareButton />
      <ProfileImage src={user?.image} />
      <h2 className="mt-4 text-2xl font-medium">{user?.name}</h2>
      <p className="text-gray-500">{user?.location}</p>
      <Rating stars={user?.rating} />
    </div>
  );
};

// ✅ زر المشاركة
const ShareButton = () => (
  <div className="w-full flex justify-end items-center gap-6">
    <button className="flex justify-center items-center gap-2 border-primary border-2 bg-white text-primary py-2 px-4 rounded-xl hover:bg-primary hover:text-white animation">
      <span>Share</span>
      <FaShareSquare />
    </button>
  </div>
);

// ✅ صورة البروفايل
const ProfileImage = ({ src }) => (
  <div className="relative w-56 h-56">
    <img
      src={src}
      alt="Freelancer"
      className="w-full h-full object-cover rounded-full border-gray-700 border-2"
    />
  </div>
);

// ✅ عرض التقييم بالنجوم
const Rating = ({ stars = 0 }) => {
  const fullStars = Math.floor(stars);
  return (
    <div className="flex items-center mt-2">
      {[...Array(5)].map((_, i) =>
        i < fullStars ? (
          <FaStar key={i} className="text-yellow-500" />
        ) : (
          <FaRegStar key={i} className="text-yellow-500" />
        )
      )}
    </div>
  );
};

// ✅ محتوى الصفحة (الأقسام المختلفة)
const Content = ({ user }) => {

  useEffect(() => {
    console.log(user);
  }, [user]);
  if (!user) {
    return "loading........"
  }
  return (
    <div className="w-full min-h-screen grid grid-cols-1  lg:grid-cols-[70%_28%] gap-4 mb-8">
      <div className="flex flex-col gap-10">
        <Section
          title={user?.about?.title}
          description={user?.about?.description}
        />
        <Skills skills={user?.skills} />
        <Projects title="Projects" projects={user?.projects} />
        <Projects title="Templates" projects={user?.templates} />
        <Experiences title="Work Experience" items={user?.workExperience} />
        <Experiences title="Education" items={user?.education} />
        <Experiences title="Certificates" items={user?.certificates} />
      </div>
      <div className="flex flex-col gap-10">
        <Badges badges={user?.badges} />
      </div>
    </div>
  );
};

// ✅ قسم العنوان والوصف
const Section = ({ title, description }) => (
  <div className="w-full rounded-2xl bg-white p-6 border flex flex-col gap-6 dark:bg-transparent">
    <GenHeading text={title} />
    <p className="text-sm md:text-base">{description}</p>
  </div>
);

// ✅ عرض المهارات
const Skills = ({ skills }) => (
  <Section title="Skills">
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, i) => (
        <span
          key={i}
          className="text-gray-500 rounded-full text-sm p-2 px-4 bg-gray-100 border-gray-800"
        >
          pppppppppp
        </span>
      ))}
    </div>
  </Section>
);

// ✅ عرض المشاريع والقوالب
const Projects = ({ title, projects }) => (
  <Section title={title}>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </Section>
);

// ✅ كرت المشروع
const ProjectCard = ({ project }) => (
  <Link
    href={`/profile/project?type=project&projectId=${project.id}`}
    className="grid gap-4"
  >
    <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div>{project.title}</div>
  </Link>
);

// ✅ عرض الخبرات والتعليم والشهادات
const Experiences = ({ title, items }) => (
  <Section title={title}>
    <div className="grid gap-4">
      {items.map((item) => (
        <div key={item.id} className="grid gap-2">
          <h1 className="text-base md:text-xl font-medium">{`${
            item.jobTitle || item.institution || item.organization
          } | ${item.companyName || item.fieldOfStudy || item.title}`}</h1>
          <p className="text-xs md:text-sm">{`${item.startDate} - ${
            item.endDate || "Present"
          }`}</p>
          <p className="text-sm md:text-base">
            {item.description || item.degree || item.date}
          </p>
        </div>
      ))}
    </div>
  </Section>
);

// ✅ عرض الإنجازات
const Badges = ({ badges }) => (
  <Section title="Badges">
    <div className="grid gap-4">
      {badges.map((badge) => (
        <div key={badge.id} className="flex gap-4 items-center">
          <img src={badge.image} alt="badge" className="w-10 h-10" />
          <div>
            <h3 className="text-sm md:text-base font-medium">{badge.title}</h3>
            <p className="text-xs md:text-sm">{badge.description}</p>
          </div>
        </div>
      ))}
    </div>
  </Section>
);
