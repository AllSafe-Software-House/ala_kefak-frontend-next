"use client";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { FileInputMultiple } from "@/app/components/generalComps/FileInputs";
import GenHeading from "@/app/components/generalComps/GenHeading";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const AskEdit = () => {
  const router = useRouter();
const handleSuccess = ()=>{
  router.push("/find-employee/select-template/view-template/ask-edit/success?templateId=6")
}
  return (
    <div className="p-8 w-full lg:w-[70%] mx-auto">
      <div className="flex items-center justify-center gap-4 my-3">
        <GenHeading text="Let Us Handle It for You" />
      </div>
      <InputField label="Email Address" type="text" />
      <InputField label="Budget" type="text" />
      <InputField label="Tell us what you want to edit" type="textarea" />
      <FileInputMultiple
        label="Upload Files"
        onFileChange={(files) => console.log(files)}
        accept="image/*"
      />
      <InputField label="Phone Number" type="text" />
      <div className="w-full flex justify-end items-center gap-8 mt-8">
        <SecondaryBtn text={"Discard"} onClick={()=> router.back()}  />
        <MainBtn text={"Send Request"}  onClick={handleSuccess} />
      </div>
    </div>
  );
}

export default AskEdit
const InputField = ({ label, type = "text" }) => (
  <div className="w-full mb-4">
    <label className="block text-base font-medium mb-2">{label}</label>
    {type === "textarea" ? (
      <textarea className="border p-3 rounded-lg w-full min-h-[150px]" />
    ) : (
      <input type={type} className="border p-3 rounded-lg w-full" />
    )}
  </div>
);
