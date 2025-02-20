"use client";

import { IoIosSearch } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useProposals } from "../layout";
import Link from "next/link";

const UpperNav = () => {
  const { data, setFilteredData } = useProposals();

  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const currUrl = pathname.replace(/\s/g, "").toLowerCase();

  const navLinks = [
    { href: "/my-proposals", text: "All" },
    { href: "/declined-proposals", text: "Declined" },
    { href: "/reviewed-proposals", text: "Reviewed" },
    { href: "/pending-proposals", text: "Pending" },
    { href: "/saved-proposals", text: "Saved" },
  ];

  useEffect(() => {
    let filtered = data?.projects || [];

    if (searchText) {
      filtered = data?.projects?.filter((project) =>
        project?.projectTitle?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchText, data, setFilteredData]);

  const handleSearch = () => setSearchText(searchQuery);

  return (
    <div
      ref={dropdownRef}
      className="w-full flex flex-col lg:flex-row gap-4 justify-between items-center bg-gray-100 dark:bg-transparent dark:border rounded-xl p-3"
    >
      <div className="w-full lg:w-1/2 flex items-center justify-around lg:justify-start gap-2 lg:gap-4">
        {navLinks.map(({ href, text }) => {
          const isActive = pathname === href.toLowerCase();
          return (
            <Link
              key={href}
              href={href}
              className={`text-gray-700 dark:text-white hover:text-primary transition ${
                isActive ? "text-primary border-b border-primary" : ""
              }`}
            >
              {text}
            </Link>
          );
        })}
      </div>

      <div className="w-full flex justify-end">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

const SearchInput = ({ value, onChange, onSearch }) => (
  <div className="flex items-center px-3 bg-white border border-gray-300 rounded-full text-gray-700 animation">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search..."
      className="text-gray-900  bg-inherit outline-none w-full"
    />
    <button
      className="text-gray-500 animation hover:text-primary text-2xl"
      onClick={onSearch}
    >
      <IoIosSearch />
    </button>
  </div>
);

export default UpperNav;
