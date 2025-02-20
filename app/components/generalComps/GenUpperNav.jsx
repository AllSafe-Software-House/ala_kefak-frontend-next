"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const GenUpperNav = ({ navLinks, filters, SearchInput }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_3fr]  gap-2  rounded-xl py-3 px-4">
      <NavigationLinks links={navLinks} />
      <div className="w-full flex flex-col lg:flex-row justify-end items-start lg: gap-4">
        {SearchInput}
        {filters && <FilterDropdowns filters={filters} />}
      </div>
    </div>
  );
};

export default GenUpperNav;

const NavigationLinks = ({ links }) => {
  const pathname = usePathname();
  const currUrl = pathname.replace(/\s/g, "").toLowerCase();

  return (
    <div className="w-full flex items-center justify-start gap-6">
      {links.map(({ key, href, text }) => (
        <Link
          key={key}
          href={href}
          className={` text-sm md:text-base lg:text-lg pb-3 font-medium text-gray-500 dark:text-white hover:text-gray-900 animation 
            ${
              currUrl === "/" && key === "best-matches"
                ? "!text-primary border-b border-primary"
                : ""
            }
            ${
              currUrl.includes(key)
                ? "!text-primary border-b border-primary"
                : ""
            }
          `}
        >
          {text}
        </Link>
      ))}
    </div>
  );
};

const FilterDropdowns = ({ filters }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="grid grid-cols-3 gap-2">
      {filters.map(({ key, icon, label, options, setter }) => (
        <div key={key} className="relative  w-full ">
          <button
            onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
            className="w-full px-4 py-1 lg:py-2 bg-white dark:bg-darkinput border border-gray-300 dark:border-gray-500 rounded-xl text-gray-900 dark:text-gray-200 
            flex items-center justify-center gap-2 animation hover:border-gray-800 text-base lg:text-lg 
            "
          >
            <span className="">{icon}</span> <span>{label}</span>
          </button>
          {openDropdown === key && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2  mt-2  bg-white dark:bg-darkinput overflow-hidden  rounded-xl shadow-lg z-10">
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setter(option);
                    setOpenDropdown(null);
                  }}
                  className="w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-darkbg min-w-[130px]  whitespace-nowrap animation cursor-pointer overflow-hidden "
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
