"use client";
import Badges from "@/app/(user)/profile/ContentItems/Badges";
import { useAuth } from "@/app/providers/AuthContext";
import { getData } from "@/app/providers/TheQueryProvider";
import React from "react";
import { useQuery } from "react-query";

const ClientOverviewContent = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery(
    ["userData", user?.user?.id],
    () => getData(`user?id=${user?.user?.id}`),
    { enabled: !!user?.user?.id }
  );

  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[70%_28%] gap-4 mb-8">
      <div className="w-full flex flex-col gap-10">
        <InfoSection title="Company Name (Optional)" content={CompanyInfo()} />
        <InfoSection
          title="About Me"
          content={
            <p className="text-gray-600 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          }
        />
        <InfoSection title="Skills" content={SkillsSection()} />
      </div>
      <div className="w-full flex flex-col gap-10">
        <Badges user={data?.user} />
      </div>
    </div>
  );
};

export default ClientOverviewContent;

const InfoSection = ({ title, content }) => (
  <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-transparent">
    <h3 className="text-xl font-semibold">{title}</h3>
    {content}
  </div>
);

const CompanyInfo = () => (
  <div className="flex gap-4 mt-2">
    {["Company1", "Company2"].map((company, idx) => (
      <span
        key={idx}
        className="px-3 py-1 bg-gray-200 rounded-lg flex items-center gap-4"
      >
        <img
          src={`/images/company${idx + 1}.jpg`}
          alt=""
          className="w-[70px] h-[70px] rounded-full"
        />
        {company} <br />
        As A {idx === 0 ? "CEO" : "Developer"}
      </span>
    ))}
  </div>
);

const SkillsSection = () => (
  <div className="flex gap-2 mt-2">
    {["Skill 1", "Skill 2", "Skill 3"].map((skill, idx) => (
      <span key={idx} className="px-3 py-1 bg-gray-200 rounded-lg">
        {skill}
      </span>
    ))}
  </div>
);
