// "use client";
// import GenHeading from "@/app/components/generalComps/GenHeading";
// import ErrorPage from "@/app/components/sceletons/ErrorPage";
// import LoadingProjects from "@/app/components/sceletons/LoadingProjects";
// import { getData } from "@/app/providers/TheQueryProvider";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { FaArrowLeft, FaTag, FaDollarSign } from "react-icons/fa";
// import { MdSort, MdCategory } from "react-icons/md";
// import { AiOutlineLineChart } from "react-icons/ai";
// import { useQuery } from "react-query";
// import { IoFilterOutline } from "react-icons/io5";
// import { FaArrowRightArrowLeft } from "react-icons/fa6";

// const SelectTemplate = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterPrice, setFilterPrice] = useState("all");
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [sortOption, setSortOption] = useState("newest");

//   const { data, isLoading, error } = useQuery(
//     ["templates", currentPage],
//     () => getData(`templates?page=${currentPage}`),
//     { keepPreviousData: true }
//   );

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   useEffect(() => {
//     if (data?.templates) {
//       let filtered = data.templates;
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

//   if (isLoading) return <LoadingProjects />;
//   if (error) return <ErrorPage />;
//   return (
//     <div className="p-8 w-full lg:w-[90%] mx-auto">
//       <div className="flex items-center gap-4 my-3">
//         <FaArrowLeft
//           className="cursor-pointer text-2xl"
//           onClick={() => router.back()}
//         />
//         <GenHeading
//           text={"Choose from Ready-made projects for purchase and download"}
//         />
//       </div>
//       <div className="flex gap-4 my-6 items-center justify-end">
//         <div className="w-full lg:w-[50%] grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-4">
//           <input
//             type="text"
//             placeholder="Search by name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full animation focus:border-primary  "
//           />
//           <div className="relative w-full font-medium">
//             <IoFilterOutline className="text-2xl absolute left-3 top-1/2 transform -translate-y-1/2 " />
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="border-2 border-gray-300 rounded-lg px-4 py-2 pl-10 animation focus:border-primary   w-full"
//             >
//               <option disabled defaultValue value="all">
//                 industry
//               </option>
//               <option value="all">All Categories</option>
//               <option value="software">Software</option>
//               <option value="design">Design</option>
//               <option value="marketing">Marketing</option>
//             </select>
//           </div>
//           <div className="relative w-full font-medium">
//             <FaArrowRightArrowLeft className="text-xl rotate-90 absolute left-3 top-1/2 transform -translate-y-1/2 " />
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="border-2 border-gray-300 rounded-lg px-4 py-2 pl-10 animation focus:border-primary   w-full"
//             >
//               <option disabled defaultValue value="all">
//                 Sort
//               </option>
//               <option value="newest">Newest to Oldest</option>
//               <option value="oldest">Oldest to New</option>
//               <option value="experience_level">Experience Level</option>
//               <option value="highest_salary">Highest Salary First</option>
//               <option value="lowest_salary">Lowest Salary First</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {filteredData.map((template) => (
//           <TemplateCard key={template.id} template={template} />
//         ))}
//       </div>
//       <div className="w-full flex justify-start items-center gap-3 mt-8">
//         {Array.from({ length: data.pagesCount }).map((_, i) => (
//           <button
//             key={i}
//             onClick={() => handlePageChange(i + 1)}
//             className={`size-12 rounded-lg ${
//               currentPage === i + 1
//                 ? "bg-primary text-white"
//                 : "border-primary border-2 bg-white text-primary"
//             } text-xl flex justify-center items-center animation hover:bg-primary/80 hover:text-white `}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SelectTemplate;

// function TemplateCard(template) {
//   return (
//     <Link
//       href={`/profile/template?type=template&templateId=${template?.template.id}`}
//       className="mt-4 grid grid-cols-1 gap-1 bg-white rounded-lg overflow-hidden animation hover:shadow-lg "
//     >
//       <div className="h-48 overflow-hidden text-slate-800 ">
//         <img
//           src={template?.template.image}
//           alt="project"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="p-2">
//         <h2 className="text-lg font-medium">
//           {template?.template.templateTitle}
//         </h2>
//         <div className="flex gap-3">
//           <span>Start Pricing</span>
//           <span className="font-medium">{template?.template.startPrice}</span>
//         </div>
//       </div>
//     </Link>
//   );
// }




"use client";
import GenHeading from "@/app/components/generalComps/GenHeading";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import LoadingProjects from "@/app/components/sceletons/LoadingProjects";
import { getData } from "@/app/providers/TheQueryProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { useQuery } from "react-query";

const SelectTemplate = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  const { data, isLoading, error } = useQuery(
    ["templates", currentPage],
    () => getData(`templates?page=${currentPage}`),
    { keepPreviousData: true }
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (data?.templates) {
      let filtered = [...data.templates];

      if (searchTerm) {
        filtered = filtered.filter((template) =>
          template.templateTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (filterPrice !== "all") {
        filtered = filtered.filter((template) => template.startPrice <= parseInt(filterPrice));
      }
      if (filterCategory !== "all") {
        filtered = filtered.filter((template) => template.category === filterCategory); 
      }

      switch (sortOption) {
        case "oldest":
          filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case "highest_salary":
          filtered = filtered.sort((a, b) => parseInt(b.startPrice) - parseInt(a.startPrice));
          break;
        case "lowest_salary":
          filtered = filtered.sort((a, b) => parseInt(a.startPrice) - parseInt(b.startPrice));
          break;
        case "experience_level":
          filtered = filtered.sort((a, b) => a.requiredLevel.localeCompare(b.requiredLevel));
          break;
        default:
          filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setFilteredData(filtered);
    }
  }, [data, searchTerm, filterPrice, filterCategory, sortOption]);

  if (isLoading) return <LoadingProjects />;
  if (error) return <ErrorPage />;

  return (
    <div className="p-8 w-full lg:w-[90%] mx-auto">
      <div className="flex items-center gap-4 my-3">
        <FaArrowLeft
          className="cursor-pointer text-2xl"
          onClick={() => router.back()}
        />
        <GenHeading
          text={"Choose from Ready-made projects for purchase and download"}
        />
      </div>
      <div className="flex gap-4 my-6 items-center justify-end">
        <div className="w-full lg:w-[70%] grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-4">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterSelect
            value={filterCategory}
            onChange={setFilterCategory}
            options={[
              { value: "all", label: "All Categories" },
              { value: "software", label: "Software" },
              { value: "design", label: "Design" },
              { value: "marketing", label: "Marketing" },
            ]}
            placeholder="Industry"
          />
          <FilterSelect
            value={sortOption}
            onChange={setSortOption}
            options={[
              { value: "newest", label: "Newest to Oldest" },
              { value: "oldest", label: "Oldest to New" },
              { value: "experience_level", label: "Experience Level" },
              { value: "highest_salary", label: "Highest Salary First" },
              { value: "lowest_salary", label: "Lowest Salary First" },
            ]}
            placeholder="Sort"
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredData.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
      <div className="w-full flex justify-start items-center gap-3 mt-8">
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
  );
};

// Search Input Component
const SearchInput = ({ searchTerm, setSearchTerm }) => (
  <input
    type="text"
    placeholder="Search by name"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full animation focus:border-primary"
  />
);

// Filter Select Component
const FilterSelect = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full font-medium" ref={dropdownRef}>
      <div
        className="flex items-center justify-between border-2 border-gray-300 rounded-lg px-4 py-2 pl-10 cursor-pointer animation focus:border-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoFilterOutline className="text-2xl" />
        <span className="text-gray-800">{value || placeholder}</span>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 p-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left p-2 whitespace-nowrap font-medium text-gray-800 hover:bg-blue-100 hover:text-primary transition-colors`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Template Card Component
const TemplateCard = ({ template }) => (
  <Link
    href={`/find-employee/select-template/view-template?templateId=${template.id}`}
    className="mt-4 grid grid-cols-1 gap-1 bg-white rounded-lg overflow-hidden animation hover:shadow-lg border-[1px] border-slate-200 hover:border-slate-500 group "
  >
    <div className="h-72 overflow-hidden relative text-slate-800 animation group-hover:rounded-lg ">
      <div className="absolute top-0 left-0 w-full h-full animation group-hover:shadow-[inset_0px_80px_100px_-50px_#000000]" />
      <img
        src={template.image}
        alt="project"
        className="w-full h-full object-cover  "
      />
    </div>
    <div className="p-2">
      <h2 className="text-lg font-medium">{template.templateTitle}</h2>
      <div className="flex gap-3">
        <span>Start Pricing</span>
        <span className="font-medium">{template.startPrice}</span>
      </div>
    </div>
  </Link>
);

export default SelectTemplate;
