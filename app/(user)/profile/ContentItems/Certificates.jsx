"use client";
import { useState } from "react";
import AddBtn from "../UIItems/AddBtn";
import EditBtn from "../UIItems/EditBtn";
import CertificateItem from "../UIItems/CertificateItem";
import Heading from "../UIItems/Heading";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";

const Certificates = ({ user, openModal, closeModal }) => {
  const [certificates, setCertificates] = useState(user.certificates);

  const handleSave = (updatedCertificates) => {
    console.log("Updated Certificates:", updatedCertificates);
    setCertificates(updatedCertificates);
    closeModal();
  };

  const handleAdd = () => {
    openModal(
      <ModalContent
        initialCertificates={certificates}
        onSave={handleSave}
        closeModal={closeModal}
        isEditing={false}
      />
    );
  };

  const handleEdit = () => {
    openModal(
      <ModalContent
        initialCertificates={certificates}
        onSave={handleSave}
        closeModal={closeModal}
        isEditing={true}
      />
    );
  };

  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading
        text={"Certificates"}
        actions={[
          <AddBtn key="add" onClick={handleAdd} />,
          <EditBtn key="edit" onClick={handleEdit} />,
        ]}
      />
      <div className="w-full grid grid-cols-1 gap-4">
        {certificates.map((certificate) => (
          <CertificateItem key={certificate.id} certificate={certificate} />
        ))}
      </div>
    </div>
  );
};

export default Certificates;

const ModalContent = ({
  initialCertificates,
  onSave,
  closeModal,
  isEditing,
}) => {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [formData, setFormData] = useState({
    id: Date.now(),
    title: "",
    organization: "",
    date: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveCertificate = () => {
    const updatedCertificates = isEditing
      ? certificates.map((cert) =>
          cert.id === formData.id ? { ...formData } : cert
        )
      : [...certificates, formData];

    console.log("Saved Certificate Data:", updatedCertificates);
    onSave(updatedCertificates);
  };

  const handleDeleteCertificate = (id) => {
    const updatedCertificates = certificates.filter((cert) => cert.id !== id);
    setCertificates(updatedCertificates);
    console.log("Deleted Certificate ID:", id);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl">
        {isEditing ? "Edit Certificate" : "Add Certificate"}
      </h1>

      {/* قائمة الشهادات للتعديل أو الحذف */}
      {isEditing && (
        <div className="flex flex-col gap-2">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center justify-between p-2 border rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300"
            >
              <p>{`${cert.title} | ${cert.organization}`}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFormData(cert)}
                  className="text-primary"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCertificate(cert.id)}
                  className="text-red-500"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Certificate Title"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleInputChange}
          placeholder="Organization"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          placeholder="Date - dd/mm/yyyy"
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 rounded resize-none h-24 dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
      </div>

      <div className="w-full flex justify-end items-center gap-4 mt-4">
        <SecondaryBtn
          text="Discard"
          onClick={closeModal}
          classNames="text-lg"
        />

        <MainBtn
          text={"Save"}
          onClick={handleSaveCertificate}
          classNames="text-lg"
        />
      </div>
    </div>
  );
};
