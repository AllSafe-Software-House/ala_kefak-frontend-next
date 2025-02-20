"use client";

import { useState } from "react";
import { FaStar, FaRegStar, FaShareSquare, FaEdit } from "react-icons/fa";
import GeneralModal from "./modals/GeneralModal";
import { useAuth } from "@/app/providers/AuthContext";
import { getData } from "@/app/providers/TheQueryProvider";
import { useQuery } from "react-query";
import Title from "./ContentItems/Title";
import Skills from "./ContentItems/Skills";
import Badges from "./ContentItems/Badges";
import Complete from "./ContentItems/Complete";
import VerifyAccount from "./ContentItems/VerifyAccount";
import GenHeading from "@/app/components/generalComps/GenHeading";
import CompanyInfo from "./ContentItems/CompanyInfo";
import FirstOffer from "./ContentItems/FirstOffer";

const StackholderProfile = () => {
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data, isLoading, error } = useQuery(
    ["userData", user?.user?.id],
    () => getData(`user?id=${user?.user?.id}`),
    {
      enabled: !!user?.user?.id,
    }
  );

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>Error fetching user data: {error.message}</p>;
  }

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen mx-auto p-6 px-3 md:px-8 lg:px-16 flex flex-col gap-16 bg-gray-100 dark:bg-transparent ">
      <Hero
        user={data.user}
        openModal={openModal}
        handleImageChange={handleImageChange}
      />
      <Content user={data.user} openModal={openModal} closeModal={closeModal} />
      {isModalOpen && (
        <GeneralModal content={modalContent} onClose={closeModal} />
      )}
    </div>
  );
};

export default StackholderProfile;

const Hero = ({ user, openModal, handleImageChange }) => {
  const fullStars = Math.floor(user.rating);
  const emptyStars = 5 - fullStars;

  const openImageModal = () => {
    openModal(
      <ImageChangeModal
        currentImage={user?.image}
        onImageChange={handleImageChange}
      />
    );
  };

  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="w-full flex justify-end items-center gap-6">
        <button className="flex justify-center items-center gap-2 border-primary border-2 bg-white text-primary py-2 px-4 rounded-xl hover:bg-primary hover:text-white animation">
          <span>Share</span>
          <FaShareSquare />
        </button>
      </div>
      <div className="relative w-56 h-56">
        <img
          src={user?.image}
          alt="Freelancer"
          className="w-full h-full object-cover rounded-full border-gray-700 border-2"
        />
        <button
          className="text-xl absolute right-0 bottom-4 border-primary border-2 size-10 bg-gray-100 text-primary z-[2] rounded-full flex justify-center items-center"
          onClick={openImageModal}
        >
          <FaEdit />
        </button>
      </div>
      <GenHeading text={user.name} />
      <p className="text-gray-500">{user.location}</p>
      <div className="flex items-center mt-2">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
      </div>
    </div>
  );
};

const ImageChangeModal = ({ currentImage, onImageChange }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl">Change Profile Picture</h2>
      <div className="mt-4">
        <img
          src={currentImage}
          alt="Current profile"
          className="w-40 h-40 object-cover rounded-full border-gray-700 border-2"
        />
      </div>
      <div className="mt-4">
        <input
          type="file"
          onChange={onImageChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-primary text-white py-2 px-4 rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const Content = ({ user, openModal, closeModal }) => {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[70%_28%] justify-between gap-4 mb-8">
      <div className="w-full flex flex-col gap-10">
        <Title user={user} openModal={openModal} closeModal={closeModal} />
        <CompanyInfo
          user={user}
          openModal={openModal}
          closeModal={closeModal}
        />
        <Skills user={user} openModal={openModal} closeModal={closeModal} />
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-10">
        <Badges user={user} openModal={openModal} closeModal={closeModal} />
        {user?.offers <= 0 && <FirstOffer />}
      </div>
    </div>
  );
};
