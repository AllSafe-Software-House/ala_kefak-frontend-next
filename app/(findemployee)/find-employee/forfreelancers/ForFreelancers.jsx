"use client";

import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { FileInputMultiple } from "@/app/components/generalComps/FileInputs";
import GenHeading from "@/app/components/generalComps/GenHeading";
import TwoColumnLayout from "@/app/components/generalComps/TwoColumnLayout";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import PrimaryButton from './../../../(auth)/_components/PrimaryButton';

const ForFreelancers = () => {
    const router = useRouter();
    const handleSave =()=>{
      console.log("save")
      router.push("/find-employee/forfreelancers/view?projectId=1")
    }
    const handleDiscard =()=>{
      router.back()
    }
  return (

    <div className="p-8 w-full lg:w-[90%] mx-auto">
      <div className="flex items-center gap-4 my-3">
        <FaArrowLeft
          className="cursor-pointer text-2xl"
          onClick={() => router.back()}
        />
        <GenHeading text="Add Project For Freelancers" />
      </div>

      <TwoColumnLayout
        leftContent={
          <>
            <InputField label="Project Title" type="text" />
            <InputField label="Project Field" type="text" />
            <InputField label="Description" type="textarea" />
            <InputField label="Skills" type="text" />
            <InputField label="Requirements" type="textarea" />
            <FileInputMultiple
              label="Upload Files"
              onFileChange={(files) => console.log(files)}
              accept="image/*"
            />
            <InputField label="Timeline" type="text" />

            <div className="w-full flex flex-col justify-start items-start gap-4 rounded-lg bg-white p-3 ">
              <label className="block text-xl font-semibold mb-2">
                Budget Options
              </label>
              <div className="flex items-center gap-8">
                <label className="flex items-center gap-4 cursor-pointer text-lg group ">
                  <input
                    type="radio"
                    name="budget"
                    value="fixed"
                    className="scale-[1.4] accent-primary animation group-hover:scale-[1.8] "
                  />
                  Fixed Price
                </label>
                <label className="flex items-center gap-4 cursor-pointer text-lg group ">
                  <input
                    type="radio"
                    name="budget"
                    value="hourly"
                    className="scale-[1.4] accent-primary animation group-hover:scale-[1.8] "
                  />
                  Hourly Rate
                </label>
              </div>
              <InputField label="Budget Range" type="text" />
            </div>
          </>
        }
        rightContent={
          <>
            <div className="w-full mb-4 p-3 bg-white rounded-lg space-y-3 mt-8">
              <label className="block text-base font-medium mb-2">
                Visibility
              </label>

              <div className="flex items-center mb-5">
                <span className="mr-3 text-sm font-medium text-gray-600 ">
                  Private
                </span>
                <label className="relative flex items-center  cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0  rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 hover:peer-checked:bg-green-700 "></div>
                </label>
                <span className="ml-3 text-sm font-medium text-gray-600 ">
                  Public
                </span>
              </div>
            </div>

            <div className="w-full mb-4 p-3 bg-white rounded-lg space-y-3">
              <h2 className="block text-base font-medium mb-2">
                Invite freelance
              </h2>

              <p>
                invite specific freelancers to bid on their projects, allowing
                them to send personalized invitations.
              </p>
              <SecondaryBtn
                classNames="flex items-center gap-2"
                text={
                  <>
                    <span className="font-medium">Invite</span>
                    <FaPlus />
                  </>
                }
              />
            </div>
          </>
        }
      />
      <div className="w-full flex justify-end items-center gap-8">
        <SecondaryBtn text={"Discard"} onClick={handleDiscard} />
        <MainBtn text={"Save"} onClick={handleSave} />
      </div>
    </div>
  )
}

export default ForFreelancers


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

