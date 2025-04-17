"use client";
import { useTranslation } from "@/app/providers/Transslations";
import Heading from "../UIItems/Heading";

const Complete = ({ user }) => {
  const { translate } = useTranslation();
  return (
    <div className="w-full rounded-2xl bg-white  p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading text={translate("profile.completion_status")} actions={[]} />
      <div className="mt-4">
        <progress
          className="w-full h-3 rounded-full mt-2"
          value={user?.complete_profile}
          max={10}
        ></progress>
        <p>{`${user?.complete_profile}/10 ${translate("profile.steps")} `}</p>
      </div>
    </div>
  );
};

export default Complete;
