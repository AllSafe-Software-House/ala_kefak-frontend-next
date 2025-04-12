"use client";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import EditBtn from "../UIItems/EditBtn";
import Heading from "../UIItems/Heading";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";
import axiosInstance from "@/app/providers/axiosConfig";
import Spinner from "@/app/components/generalComps/Spinner";
import { toast } from "sonner";
import { IoLocationOutline } from "react-icons/io5";

const Title = ({ user, openModal, closeModal }) => {
  const [userData, setUserData] = useState(null);
  const { translate } = useTranslation();
  const handleEdit = () => {
    openModal(
      <TitleModal
        about={user}
        closeModal={closeModal}
        setUserData={setUserData}
      />
    );
  };

  useEffect(() => {
    setUserData(user);
  }, []);

  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-3 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading
        text={translate("profile.about_me")}
        actions={[<EditBtn key="edit" onClick={handleEdit} />]}
      />
      <p className="text-sm md:text-base lg:text-base ">{userData?.title}</p>
      <p className="text-sm flex justify-start items-center gap-2">
        <span>
          <IoLocationOutline />
          </span>
          <span>
          {userData?.country?.name}
          </span>
      </p>
      <p className="text-sm ">
        {userData?.description
          ? userData?.description
          : translate("profile.description")}
      </p>
    </div>
  );
};

export default Title;

const TitleModal = ({ about, closeModal, setUserData }) => {
  const [title, setTitle] = useState(about?.title || "");
  const [description, setDescription] = useState(about?.description || "");
  const { translate } = useTranslation();

  const mutation = useMutation(
    (data) =>
      axiosInstance.post("/auth/update-about-user", data, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: () => {
        closeModal();
        toast.success(translate("status.done"));
        setUserData((prev) => ({
          ...prev,
          title: title,
          description: description,
        }));
      },
      onError: (error) => {
        toast.error(translate("status.error"));
        console.error("Failed to update about:", error);
      },
    }
  );

  const handleSave = () => {
    const data = { title, description };
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl md:text-3xl">{translate("profile.about_me")}</h1>
      <label className="flex flex-col gap-2">
        <span className="text-gray-700 dark:text-gray-200">
          {translate("profile.title")}
        </span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border p-2 rounded  dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
          placeholder={translate("profile.title")}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-gray-700 dark:text-gray-200">
          {translate("profile.description")}
        </span>
        <textarea
          data-lenis-prevent="true"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full flex-1 border p-2 rounded  dark:border-darkinput dark:bg-darknav dark:text-gray-300 min-h-60 resize-none"
          placeholder={translate("profile.description")}
        />
      </label>
      <div className="w-full flex justify-end items-center gap-4">
        <SecondaryBtn onClick={closeModal} text={translate("btns.cancel")} />
        <MainBtn
          onClick={handleSave}
          text={mutation.isLoading ? <Spinner /> : translate("btns.save")}
          disabled={mutation.isLoading}
        />
      </div>
    </div>
  );
};
