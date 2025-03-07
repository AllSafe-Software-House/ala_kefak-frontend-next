"use client";
import { useRouter } from "next/navigation";
import AddBtn from "../UIItems/AddBtn";
import Heading from "../UIItems/Heading";
import TemplateCard from "../UIItems/TemplateCard";
import { useTranslation } from "@/app/providers/Transslations";

const Templates = ({ user }) => {
  const router = useRouter();
  const { translate } = useTranslation();

  const handleNavigate = () => {
    router.push("/profile/add-template");
  };
  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading
        text={translate("profile.templates")}
        actions={[<AddBtn key="add" onClick={handleNavigate} />]}
      />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
        {user?.templates.map((template) => (
          <TemplateCard key={template.id} project={template} />
        ))}
      </div>
    </div>
  );
};

export default Templates;
