import React, { useState } from "react";

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
          className="border p-2 rounded w-full  dark:text-slate-800"
          placeholder="Enter title"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-gray-700 dark:text-gray-200">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full  dark:text-slate-800 h-48  resize-none"
          placeholder="Enter description"
        />
      </label>
      <div className="w-full flex justify-end items-center gap-4">
        <button
          onClick={closeModal}
          className="mt-4 border-primary border-2 bg-white text-primary py-2 px-4 rounded hover:bg-primary hover:text-white  animation"
        >
          Discard
        </button>
        <button
          onClick={handleSave}
          className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primaryhover animation"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TitleModal;
