"use client";
import { useState } from "react";
import AddBtn from "../UIItems/AddBtn";
import EditBtn from "../UIItems/EditBtn";
import CertificateItem from "../UIItems/CertificateItem";
import Heading from "../UIItems/Heading";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";

const Certificates = ({ user, openModal, closeModal }) => {
  const [certificates, setCertificates] = useState(user.certificates);
  const { translate } = useTranslation();

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
        text={translate("profile.certificates")}
        actions={[
          <SecondaryBtn text={translate("btns.add")} onClick={handleAdd} />,
          <SecondaryBtn
            text={<MdOutlineEdit />}
            onClick={handleEdit}
            classNames="!rounded-full border text-lg md:text-2xl !p-3"
          />,
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
    name: "",
    provider: "",
    date: "",
    description: "",
    from_date: "",
    to_date: "",
    description: "",
  });

  const { translate } = useTranslation(); // استخدام useTranslation هنا أيضًا

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
        {isEditing
          ? translate("profile.edit_certificate")
          : translate("profile.add_certificate")}
      </h1>

      {isEditing && (
        <div className="flex flex-col gap-2">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center justify-between p-2 border rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300"
            >
              <p>{`${cert.name} | ${cert.provider}`}</p>
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
          value={formData.name}
          onChange={handleInputChange}
          placeholder={translate("profile.certificate_title")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="provider"
          value={formData.provider}
          onChange={handleInputChange}
          placeholder={translate("profile.organization")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="from_date"
          value={formData.from_date}
          onChange={handleInputChange}
          placeholder={translate("profile.start_date")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="to_date"
          value={formData.to_date}
          onChange={handleInputChange}
          placeholder={translate("profile.end_date")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder={translate("profile.field_of_study")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleInputChange}
          placeholder={translate("profile.link")}
          className="border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder={translate("profile.description")}
          className="border p-2 rounded resize-none h-24 dark:border-darkinput dark:bg-darknav dark:text-gray-300 "
        />
      </div>

      <div className="w-full flex justify-end items-center gap-4 mt-4">
        <SecondaryBtn
          text={translate("btns.cancel")}
          onClick={closeModal}
          classNames="text-lg"
        />

        <MainBtn
          text={translate("btns.save")}
          onClick={handleSaveCertificate}
          classNames="text-lg"
        />
      </div>
    </div>
  );
};