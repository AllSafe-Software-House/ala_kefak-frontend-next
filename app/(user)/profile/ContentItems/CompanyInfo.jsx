"use client";

import React, { useState } from "react";
import Heading from "../UIItems/Heading";
import EditBtn from "../UIItems/EditBtn";
import AddBtn from "../UIItems/AddBtn";
import { useTranslation } from "@/app/providers/Transslations";

const CompanyInfo = ({ user, openModal, closeModal }) => {
  const [companies, setCompanies] = useState(user?.companies);
  const { language, setLanguage, translate } = useTranslation();

  const handleSave = (updatedCompanies) => {
    console.log("Updated Companies:", updatedCompanies);
    closeModal();
  };

  const handleAdd = () => {
    openModal(
      <ModalContent
        initialCompanies={companies}
        onSave={handleSave}
        closeModal={closeModal}
        isEditing={false}
      />
    );
  };

  const handleEdit = () => {
    openModal(
      <ModalContent
        initialCompanies={companies}
        onSave={handleSave}
        closeModal={closeModal}
        isEditing={true}
      />
    );
  };

  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-transparent">
      <Heading
        text={translate("profile.companies")}
        actions={[
          <AddBtn key="add" onClick={handleAdd} />,
          <EditBtn key="edit" onClick={handleEdit} />,
        ]}
      />
      <div className="w-full flex justify-start items-start gap-6 flex-wrap">
        {companies?.map((company, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-gray-100 rounded-lg flex items-center gap-4"
          >
            <img
              src={company.companyImage}
              alt={company.companyName}
              className="w-[70px] h-[70px] rounded-full"
            />
            {company.companyName} <br />
            As A {company.role}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfo;

const ModalContent = ({ initialCompanies, onSave, closeModal, isEditing }) => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [formData, setFormData] = useState({
    id: Date.now(),
    companyName: "",
    companyImage: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveCompany = () => {
    console.log("Saved Companies Data:", updatedCompanies);
    onSave(updatedCompanies);
  };

  const handleDeleteCompany = (id) => {
    const updatedCompanies = companies.filter((company) => company.id !== id);
    setCompanies(updatedCompanies);
    console.log("Deleted Company ID:", id);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl">{isEditing ? "Edit Company" : "Add Company"}</h1>

      {isEditing && (
        <div className="flex flex-col gap-2">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <p>{`${company.companyName} | ${company.role}`}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFormData(company)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCompany(company.id)}
                  className="text-redwarn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* حقول الإدخال */}
      <div className="flex flex-col gap-2">
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Company Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="companyImage"
          value={formData.companyImage}
          onChange={handleInputChange}
          placeholder="Company Image URL"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          placeholder="Role"
          className="border p-2 rounded"
        />
      </div>

      {/* أزرار الإجراءات */}
      <div className="w-full flex justify-end items-center gap-4 mt-4">
        <button
          onClick={closeModal}
          className="border-primary border-2 bg-white text-primary py-2 px-4 rounded hover:bg-primary hover:text-white animation"
        >
          Discard
        </button>
        <button
          onClick={handleSaveCompany}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-primaryhover animation"
        >
          Save
        </button>
      </div>
    </div>
  );
};
