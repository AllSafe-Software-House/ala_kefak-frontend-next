// "use client";

// import GenHeading from "@/app/components/generalComps/GenHeading";
// import ErrorPage from "@/app/components/sceletons/ErrorPage";
// import LoadingProjects from "@/app/components/sceletons/LoadingProjects";
// import { getData } from "@/app/providers/TheQueryProvider";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { IoFilterOutline } from "react-icons/io5";
// import { useQuery } from "react-query";
// import moment from "moment";
// import { FaRegUser } from "react-icons/fa";
// import { CiLocationOn } from "react-icons/ci";
// import { RiMoneyDollarCircleLine } from "react-icons/ri";
// import { IoMdTime } from "react-icons/io";
// import { TbMessage2Check } from "react-icons/tb";
// import Link from "next/link";

// const ManageProjects = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [projectsData, setProjectsData] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);

//   const { data, isLoading, error } = useQuery(
//     ["projects", currentPage],
//     () => getData(`projects?page=${currentPage}`),
//     { keepPreviousData: true }
//   );
//   useEffect(() => {
//     if (data) {
//       setProjectsData(data?.projects);
//       setFilteredProjects(data?.projects);
//     }
//   }, [data]);

//   if (isLoading) return <LoadingProjects />;
//   if (error) return <ErrorPage />;
//   return (
//     <div className="p-8 w-full lg:w-[90%] mx-auto space-y-5">
//       <GenHeading text={"my projects"} />
//       <UpperNav data={data} setFilteredProjects={setFilteredProjects} />
//       <div className="space-y-6">
//         {filteredProjects?.map((project, i) => (
//           <ProjectCard key={i} project={project} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageProjects;

// const ProjectCard = ({ project }) => {
//   return (
//     <Link
//       href={`/project-details?projectId=${project.id}`}
//       className="w-full p-2 md:p-4 border rounded-xl shadow hover:shadow-md transition bg-white dark:bg-transparent  flex flex-col justify-start items-start gap-2 md:gap-3 "
//     >
//       <p className="text-xs md:text-sm text-gray-600">
//         {moment(new Date(project.createdAt)).fromNow()}
//       </p>
//       <div className="w-full flex justify-between items-center">
//         <h2 className="text-lg md:text-xl font-semibold line-clamp-1 whitespace-nowrap">
//           {project.projectTitle}
//         </h2>
//         <p
//           className={`rounded-full p-2 px-4  border ${
//             project.status == "Open"
//               ? "text-indigo-700 bg-indigo-100"
//               : "text-primary bg-primary/10"
//           }  text-base flex justify-center items-center `}
//         >
//           {project.status}
//         </p>
//       </div>
//       <div className="w-full flex justify-between items-center">
//         <div className="flex justify-start items-center gap-4 md:gap-6 text-xs md:text-sm text-gray-600">
//           <div className="flex justify-center items-center gap-1 ">
//             <FaRegUser />
//             <span>User Name</span>
//           </div>
//           <div className="flex justify-center items-center gap-1 ">
//             <CiLocationOn />
//             <span>{project.location}</span>
//           </div>
//           <div className="flex justify-center items-center gap-1 ">
//             <TbMessage2Check />
//             <span>Proposals</span>
//           </div>
//         </div>
//       </div>
//       <p className=" line-clamp-3 text-xs md:text-sm text-gray-600 ">
//         {project.description}
//       </p>
//       <div className="flex justify-start items-center gap-6 text-sm md:text-base">
//         <div className="flex justify-center items-center gap-1 text-primary bg-primary/30 rounded-full p-1 px-3  ">
//           <RiMoneyDollarCircleLine />
//           <span>{project.budget}</span>
//         </div>
//         <div className="flex justify-center items-center gap-1 text-primary bg-primary/30 rounded-full p-1 px-3  ">
//           <IoMdTime />
//           <span>{project.duration}</span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// function UpperNav({ data, isLoading, error }) {
//   const Links = [
//     { id: 1, text: "All", href: "all" },
//     { id: 2, text: "Done", href: "done" },
//     { id: 3, text: "Open", href: "open" },
//   ];
//   const handleSelect = (selected) => {
//     console.log(selected);
//     // setFilteredProjects
//   };
//   return (
//     <div className="w-full flex justify-between items-center">
//       <div className="text-black flex justify-start items-center gap-6">
//         {Links.map((item) => (
//           <button
//             key={item.id}
//             className={``}
//             onClick={() => handleSelect(item.href)}
//           >
//             <span>{item.text}</span>
//           </button>
//         ))}
//       </div>
//       <Filters data={data} isLoading={isLoading} error={error} />
//     </div>
//   );
// }

// function Filters({ data, isLoading, error }) {
//   const router = useRouter();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterPrice, setFilterPrice] = useState("all");
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [sortOption, setSortOption] = useState("newest");

//   const handlePageChange = useCallback((page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   useEffect(() => {
//     if (data?.templates) {
//       let filtered = [...data.templates];

//       if (searchTerm) {
//         filtered = filtered.filter((template) =>
//           template.templateTitle
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase())
//         );
//       }
//       if (filterPrice !== "all") {
//         filtered = filtered.filter(
//           (template) => template.startPrice <= parseInt(filterPrice)
//         );
//       }
//       if (filterCategory !== "all") {
//         filtered = filtered.filter(
//           (template) => template.category === filterCategory
//         );
//       }

//       switch (sortOption) {
//         case "oldest":
//           filtered = filtered.sort(
//             (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//           );
//           break;
//         case "highest_salary":
//           filtered = filtered.sort(
//             (a, b) => parseInt(b.startPrice) - parseInt(a.startPrice)
//           );
//           break;
//         case "lowest_salary":
//           filtered = filtered.sort(
//             (a, b) => parseInt(a.startPrice) - parseInt(b.startPrice)
//           );
//           break;
//         case "experience_level":
//           filtered = filtered.sort((a, b) =>
//             a.requiredLevel.localeCompare(b.requiredLevel)
//           );
//           break;
//         default:
//           filtered = filtered.sort(
//             (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//           );
//       }

//       setFilteredData(filtered);
//     }
//   }, [data, searchTerm, filterPrice, filterCategory, sortOption]);

//   return (
//     <div className="w-full lg:w-[60%] grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-4">
//       <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       <FilterSelect
//         value={filterCategory}
//         onChange={setFilterCategory}
//         options={[
//           { value: "all", label: "All Categories" },
//           { value: "software", label: "Software" },
//           { value: "design", label: "Design" },
//           { value: "marketing", label: "Marketing" },
//         ]}
//         placeholder="Industry"
//       />
//       <FilterSelect
//         value={sortOption}
//         onChange={setSortOption}
//         options={[
//           { value: "newest", label: "Newest to Oldest" },
//           { value: "oldest", label: "Oldest to New" },
//           { value: "experience_level", label: "Experience Level" },
//           { value: "highest_salary", label: "Highest Salary First" },
//           { value: "lowest_salary", label: "Lowest Salary First" },
//         ]}
//         placeholder="Sort"
//       />
//     </div>
//   );
// }

// const SearchInput = ({ searchTerm, setSearchTerm }) => (
//   <input
//     type="text"
//     placeholder="Search by name"
//     value={searchTerm}
//     onChange={(e) => setSearchTerm(e.target.value)}
//     className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full animation focus:border-primary"
//   />
// );

// const FilterSelect = ({ value, onChange, options, placeholder }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleSelect = useCallback(
//     (optionValue) => {
//       onChange(optionValue);
//       setIsOpen(false);
//     },
//     [onChange]
//   );

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <div className="relative w-full font-medium" ref={dropdownRef}>
//       <div
//         className="flex items-center justify-between border-2 border-gray-300 rounded-lg px-4 py-2 pl-10 cursor-pointer animation focus:border-primary"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <IoFilterOutline className="text-2xl" />
//         <span className="text-gray-800">{value || placeholder}</span>
//       </div>

//       {isOpen && (
//         <div className="absolute left-0 right-0 mt-2 p-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
//           {options.map((option) => (
//             <button
//               key={option.value}
//               onClick={() => handleSelect(option.value)}
//               className={`w-full text-left p-2 whitespace-nowrap font-medium text-gray-800 hover:bg-blue-100 hover:text-primary transition-colors`}
//             >
//               {option.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


"use client"
import GenHeading from "@/app/components/generalComps/GenHeading";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import LoadingProjects from "@/app/components/sceletons/LoadingProjects";
import { getData } from "@/app/providers/TheQueryProvider";
import { useQuery } from "react-query";
import moment from "moment";
import { FaRegUser } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbMessage2Check } from "react-icons/tb";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { IoMdTime } from "react-icons/io";

const ManageProjects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  const { data, isLoading, error } = useQuery(
    ["projects", currentPage],
    () => getData(`projects?page=${currentPage}`),
    { keepPreviousData: true }
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  useEffect(() => {
    if (data) setFilteredProjects(data.projects);
  }, [data]);
  useEffect(() => {
    console.log(filteredProjects)

  }, [filteredProjects]);

  if (isLoading) return <LoadingProjects />;
  if (error) return <ErrorPage />;

  return (
    <div className="p-8 w-full lg:w-[90%] mx-auto space-y-5">
      <GenHeading text="My Projects" />
      <UpperNav data={data} setFilteredProjects={setFilteredProjects} />
      <div className="space-y-6">
        {filteredProjects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="w-full flex justify-start items-center gap-3">
          {Array.from({ length: data?.pagesCount }).map((_, i) => (
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
  );
};

const ProjectCard = ({ project }) => (
  <Link
    href={`/manage-projects/view?projectId=${project.id}`}
    className="w-full p-4 border rounded-xl shadow hover:shadow-md transition bg-white dark:bg-transparent flex flex-col gap-3"
  >
    <p className="text-xs md:text-sm text-gray-600">{moment(project.createdAt).fromNow()}</p>
    <div className="flex justify-between items-center">
      <h2 className="text-lg md:text-xl font-semibold line-clamp-1">{project.projectTitle}</h2>
      <p className={`rounded-full px-4 py-2 border ${project.status === "open" ? "text-indigo-700 bg-indigo-100" : "text-primary bg-primary/10"}`}>
        {project.status}
      </p>
    </div>
    <div className="flex justify-between items-center text-xs md:text-sm text-gray-600">
      <div className="flex gap-4">
        <InfoItem icon={<FaRegUser />} text="User Name" />
        <InfoItem icon={<CiLocationOn />} text={project.location} />
        <InfoItem icon={<TbMessage2Check />} text="Proposals" />
      </div>
    </div>
    <p className="line-clamp-3 text-xs md:text-sm text-gray-600">{project.description}</p>
    <div className="flex gap-6 text-sm md:text-base">
      <Badge icon={<RiMoneyDollarCircleLine />} text={project.budget} />
      <Badge icon={<IoMdTime />} text={project.duration} />
    </div>
  </Link>
);

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center gap-1">
    {icon} <span>{text}</span>
  </div>
);

const Badge = ({ icon, text }) => (
  <div className="flex items-center gap-1 text-primary bg-primary/30 rounded-full p-1 px-3">
    {icon} <span>{text}</span>
  </div>
);

const UpperNav = ({ data, setFilteredProjects }) => {
  // const filters = ["All", "Done", "Open"];
  const filters =[
    {
      text:"All",
      key:"all"
    },
    {
      text:"Done",
      key:"done"
    },
    {
      text:"Open",
      key:"open"
    },
  ]

  const handleFilter = (filter) => {

    if (filter == "all") {
      setFilteredProjects(data?.projects);
    } else {
      setFilteredProjects(data?.projects.filter((project) => project?.status == filter));
    }
    console.log(filter)
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-6">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => handleFilter(filter.key)}
            className="px-4 py-2 rounded-lg border hover:bg-gray-200 transition"
          >
            {filter.text}
          </button>
        ))}
      </div>
      <Filters data={data} setFilteredProjects={setFilteredProjects} />
    </div>
  );
};


const Filters = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full lg:w-[60%]">
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <FilterSelect value={filterCategory} onChange={setFilterCategory} options={categoryOptions} />
      <FilterSelect value={sortOption} onChange={setSortOption} options={sortOptions} />
    </div>
  );
};

const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search by name"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-primary"
  />
);

const FilterSelect = ({ value, onChange, options }) => {
  return (
    <select
      className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-primary"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "software", label: "Software" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
];

const sortOptions = [
  { value: "newest", label: "Newest to Oldest" },
  { value: "oldest", label: "Oldest to New" },
  { value: "experience_level", label: "Experience Level" },
  { value: "highest_salary", label: "Highest Salary First" },
  { value: "lowest_salary", label: "Lowest Salary First" },
];

export default ManageProjects;
