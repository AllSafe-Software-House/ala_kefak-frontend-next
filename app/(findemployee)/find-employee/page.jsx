import GenHeading from "@/app/components/generalComps/GenHeading";
import Link from "next/link";
import React from "react";

const supportItems = [
  {
    img: "/images/freelancer.png",
    title: "Post for Freelancers",
    desc: "Share your project details and let skilled freelancers apply.",
    link: "/find-employee/forfreelancers",
  },
  {
    img: "/images/deal.png",
    title: "Let Us Handle It for You",
    desc: "Save time and effort! Our platform will manage your project from start to finish",
    link: "/find-employee/company-proposal",
  },
  {
    img: "/images/readytemplate.png",
    title: "Select from Ready-Made Solutions",
    desc: "Browse our library of ready-to-use templates. Customize them to suit your requirements.",
    link: "/find-employee/select-template",
  },
];

const page = () => {
  return (
    <div className="min-h-screen w-full mx-auto p-6 pt-12 px-3 md:px-8 lg:px-8 flex flex-col gap-16 bg-gray-100 dark:bg-transparent relative">
      <div className="w-full lg:w-[90%] mx-auto text-center">
        <GenHeading
          text="Add Project for "
          classNames="w-full !font-bold !text-4xl dark:text-white"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {supportItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="bg-white p-6 rounded-lg shadow-lg text-slate-800 flex flex-col justify-around items-center"
            >
              <img src={item.img} alt={item.title} className="w-full h-3/5" />
              <div>
                <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
                <p className="mt-2 ">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
