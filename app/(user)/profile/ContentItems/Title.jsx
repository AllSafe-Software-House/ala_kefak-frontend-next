import { useState } from "react";
import EditBtn from "../UIItems/EditBtn";
import Heading from "../UIItems/Heading";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";

const Title = ({ user, openModal, closeModal }) => {
  const handleEdit = () => {
    openModal(<TitleModal about={user.about} closeModal={closeModal} />);
  };

  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading
        text={user.about.title}
        actions={[<EditBtn key="edit" onClick={handleEdit} />]}
      />
      <p className="text-sm md:text-base lg:text-base ">
        {user.about.description}
      </p>
    </div>
  );
};

export default Title;

const TitleModal = ({ about, closeModal }) => {
  const [title, setTitle] = useState(about.title || "");
  const [description, setDescription] = useState(about.description || "");

  const handleSave = () => {
    console.log({ title, description });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl">About Me</h1>
      <label className="flex flex-col gap-2">
        <span className="text-gray-700 dark:text-gray-200">Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border p-2 rounded  dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
          placeholder="Enter title"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-gray-700 dark:text-gray-200">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="  w-full flex-1 border p-2 rounded  dark:border-darkinput dark:bg-darknav dark:text-gray-300 h-72  resize-none "
          placeholder="Enter description"
        />
      </label>
      <div className="w-full flex justify-end items-center gap-4">
        <SecondaryBtn onClick={closeModal} text={"Discard"} />
        <MainBtn onClick={handleSave} text={"Save"} />
      </div>
    </div>
  );
};
