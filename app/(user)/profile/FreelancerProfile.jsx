"use client";

import { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaShareSquare,
  FaEye,
} from "react-icons/fa";
import GeneralModal from "./modals/GeneralModal";
import { useMutation } from "react-query";
import Title from "./ContentItems/Title";
import Skills from "./ContentItems/Skills";
import Projects from "./ContentItems/Projects";
import Templates from "./ContentItems/Templates";
import WorkExperince from "./ContentItems/WorkExperince";
import Education from "./ContentItems/Education";
import Certificates from "./ContentItems/Certificates";
import Badges from "./ContentItems/Badges";
import Complete from "./ContentItems/Complete";
import VerifyAccount from "./ContentItems/VerifyAccount";
import { MdOutlineModeEdit } from "react-icons/md";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";
import axiosInstance from "@/app/providers/axiosConfig";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/app/providers/cropImage";
import Spinner from "@/app/components/generalComps/Spinner";
import Link from "next/link";

const FreelancerProfile = ({ user }) => {
  const { language, setLanguage, translate } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  const handleImageChange = (e) => {};

  return (
    <div className="min-h-screen mx-auto p-6 px-3 md:px-8 lg:px-16 flex flex-col gap-16 bg-gray-100 dark:bg-transparent ">
      <Hero
        user={user}
        openModal={openModal}
        handleImageChange={handleImageChange}
      />
      <Content user={user} openModal={openModal} closeModal={closeModal} />
      {isModalOpen && (
        <GeneralModal
          content={modalContent}
          onClose={closeModal}
          classNames="w-[80%] min-h-fit max-h-[80%] "
        />
      )}
    </div>
  );
};

export default FreelancerProfile;

const Hero = ({ user, openModal, handleImageChange }) => {
  const { translate } = useTranslation();
  const fullStars = Math.floor(user?.rate);
  const emptyStars = 5 - fullStars;

  const openImageModal = () => {
    openModal(
      <ImageChangeModal
        currentImage={user?.personal_image}
        onImageChange={handleImageChange}
      />
    );
  };

const handleShare = () => {
  console.log(user.id)
};

  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="w-full flex justify-between md:justify-end items-center gap-6 mt-4">
        <SecondaryBtn
        onClick={handleShare}
          text={
            <div className="flex justify-center items-center gap-2">
              <span>{translate("profile.share")}</span>
              <FaShareSquare />
            </div>
          }
        />
        <MainBtn
          text={
            <Link href={`/viewProfile?freelancerId=${user?.id}`} className="flex justify-center items-center gap-2">
              <span>{translate("profile.preview")}</span>
              <FaEye />
            </Link>
          }
        />
      </div>
      <div className="relative w-56 h-56">
        <img
          onError={(e) => {
            e.target.src =
              "https://cdn-icons-png.flaticon.com/512/219/219983.png";
          }}
          src={
            user?.personal_image
              ? user?.personal_image
              : "https://cdn-icons-png.flaticon.com/512/219/219983.png"
          }
          alt="Freelancer"
          className="w-full h-full object-cover rounded-full border-gray-700 border-2"
        />
        <button
          className="text-xl absolute right-0 bottom-4 border-primary border-2 size-10 bg-gray-100 dark:bg-darkinput text-primary z-[2] rounded-full flex justify-center items-center"
          onClick={openImageModal}
        >
          <MdOutlineModeEdit />
        </button>
      </div>
      <h2 className="mt-4 text-2xl font-medium">{`${user?.first_name} ${user?.last_name}`}</h2>
      <p className=" ytext-lg font-medium text-gray-500">{user.user_name}</p>
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
  const { translate } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(currentImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const mutation = useMutation(
    (formData) =>
      axiosInstance.post("/auth/update-profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    {
      onSuccess: (response) => {
        onImageChange(response.data.imageUrl);
        setPreviewImage(response.data.imageUrl);
        setSelectedImage(null);
      },
      onError: (error) => {
        console.error("Failed to update profile image:", error);
      },
    }
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleSave = async () => {
    if (selectedImage && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(
          previewImage,
          croppedAreaPixels
        );

        const file = new File([croppedImage], "cropped-image.png", {
          type: "image/png",
        });

        const formData = new FormData();
        formData.append("personal_image", file);
        mutation.mutate(formData);
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  };

  return (
    <div className=" w-full h-[90%]  flex flex-col justify-between items-center ">
      <h2 className="text-xl md:text-2xl">{translate("profile.edit_photo")}</h2>
      <div
        className="my-2  flex-grow w-full flex justify-center items-center "
        data-lenis-prevent="true"
      >
        {selectedImage ? (
          <div className="relative w-full h-full min-h-[400px] max-h-[600px] ">
            <Cropper
              image={previewImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(croppedArea, croppedAreaPixels) => {
                setCroppedAreaPixels(croppedAreaPixels);
              }}
            />
          </div>
        ) : (
          <img
            src={previewImage}
            alt="Current profile"
            className="w-56 h-56 object-cover rounded-full border-gray-700 border-2"
          />
        )}
      </div>

      <div className="w-[80%] mx-auto flex justify-between items-center">
        <label
          className="curser-pointer bg-white hover:bg-primary text-primary hover:text-white border-primary animation border
        rounded-lg px-2 md:px-4 py-2 font-medium  dark:text-primary dark:bg-darknav dark:hover:bg-primary/20  text-xs md:text-sm lg:text-base "
        >
          {translate("profile.change_photo")}
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
        <MainBtn
          text={
            mutation.isLoading ? <Spinner /> : translate("profile.save_changes")
          }
          onClick={handleSave}
          disabled={!selectedImage || mutation.isLoading}
        />
      </div>
    </div>
  );
};

const Content = ({ user, openModal, closeModal }) => {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[70%_28%] justify-between gap-4 mb-8">
      <div className="w-full flex flex-col gap-10">
        <Title user={user} openModal={openModal} closeModal={closeModal} />
        <Skills user={user} openModal={openModal} closeModal={closeModal} />
        <Projects user={user} openModal={openModal} closeModal={closeModal} />
        <Templates user={user} openModal={openModal} closeModal={closeModal} />
        <WorkExperince
          user={user}
          openModal={openModal}
          closeModal={closeModal}
        />
        <Education user={user} openModal={openModal} closeModal={closeModal} />

        <Certificates
          user={user}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-10">
        <Badges user={user} openModal={openModal} closeModal={closeModal} />
        {user?.complete_profile === 1 && (
          <Complete user={user} openModal={openModal} closeModal={closeModal} />
        )}
        {user?.verify_account === false && (
          <VerifyAccount
            user={user}
            openModal={openModal}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
};
