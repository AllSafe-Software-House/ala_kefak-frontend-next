"use client";
import { useState } from "react";
import Heading from "../UIItems/Heading";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { MainBtn, SecondaryBtn } from "@/app/components/generalComps/Btns";
import { useTranslation } from "@/app/providers/Transslations";
import axiosInstance from "@/app/providers/axiosConfig";
import { toast } from "sonner";
import Spinner from "@/app/components/generalComps/Spinner";
import * as Yup from "yup";
import { useConfirmation } from "@/app/providers/SecondaryProvider";
import {
  DateInput,
  FileInput,
  TextAreaInput,
  TextInput,
} from "@/app/components/generalComps/inputs/GenInputs";

const Certificates = ({ user, openModal, closeModal }) => {
  const [certificates, setCertificates] = useState(user.certificates || []);
  const { translate } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { showConfirmation } = useConfirmation();

  const updateCertificates = (updatedCertificates) => {
    setCertificates(updatedCertificates);
  };

  const handleSave = async (updatedCertificates) => {
    setIsLoading(true);
    try {
      const newCertificates = updatedCertificates.filter(
        (cert) => !certificates.some((oldCert) => oldCert.id === cert.id)
      );

      const updatePromises = certificates
        .filter((oldCert) =>
          updatedCertificates.some((cert) => cert.id === oldCert.id)
        )
        .map(async (oldCert) => {
          const updatedCert = updatedCertificates.find(
            (cert) => cert.id === oldCert.id
          );
          if (JSON.stringify(oldCert) !== JSON.stringify(updatedCert)) {
            const formData = new FormData();
            formData.append("_method", "put");
            Object.entries(updatedCert).forEach(([key, value]) => {
              if (value !== null && value !== undefined) {
                if (key === "file" && typeof value === "object") {
                  formData.append(key, value);
                } else {
                  formData.append(key, value);
                }
              }
            });

            await axiosInstance.post(
              `/auth/freelancer/certificates/${oldCert.id}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }
        });

      const addPromises = newCertificates.map(async (cert) => {
        const formData = new FormData();
        Object.entries(cert).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (key === "file" && typeof value === "object") {
              formData.append(key, value);
            } else {
              formData.append(key, value);
            }
          }
        });

        const response = await axiosInstance.post(
          "/auth/freelancer/certificates",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data.data;
      });

      const addedCertificates = await Promise.all(addPromises);
      await Promise.all(updatePromises);

      const finalCertificates = [
        ...certificates.map((cert) => {
          const updated = updatedCertificates.find((uc) => uc.id === cert.id);
          return updated ? updated : cert;
        }),
        ...addedCertificates,
      ];

      updateCertificates(finalCertificates);
      toast.success(translate("status.certificates_updated"));
    } catch (error) {
      console.error("Error saving certificates:", error);
      toast.error(translate("status.error"));
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const handleAdd = () => {
    openModal(
      <CertificateForm
        certificates={certificates}
        updateCertificates={updateCertificates}
        onSave={handleSave}
        closeModal={closeModal}
        mode="add"
        isLoading={isLoading}
        translate={translate}
      />
    );
  };

  const handleEdit = () => {
    openModal(
      <CertificateForm
        certificates={certificates}
        updateCertificates={updateCertificates}
        onSave={handleSave}
        closeModal={closeModal}
        mode="edit"
        isLoading={isLoading}
        translate={translate}
      />
    );
  };

  return (
    <div className="w-full rounded-2xl bg-white p-3 md:p-6 border flex flex-col gap-6 dark:bg-darknav dark:border-darkinput dark:text-gray-300">
      <Heading
        text={translate("profile.certificates")}
        actions={[
          <SecondaryBtn
            key="add"
            text={translate("btns.add")}
            onClick={handleAdd}
          />,
          certificates.length > 0 && (
            <SecondaryBtn
              key="edit"
              text={<MdOutlineEdit />}
              onClick={handleEdit}
              classNames="!rounded-full border text-lg md:text-2xl !p-3"
            />
          ),
        ]}
      />
      <div className="w-full grid grid-cols-1 gap-4">
        {certificates.length > 0 ? (
          certificates.map((item) => (
            <CertificateItem
              key={item.id}
              certificate={item}
              translate={translate}
            />
          ))
        ) : (
          <p className="text-gray-500">
            {translate("profile.no_certificates")}
          </p>
        )}
      </div>
    </div>
  );
};

const CertificateForm = ({
  certificates,
  updateCertificates,
  onSave,
  closeModal,
  mode,
  isLoading,
  translate,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    from_date: "",
    to_date: "",
    description: "",
    file: null,
  });
  const [selectedId, setSelectedId] = useState(null);
  const [errors, setErrors] = useState({});
  const { showConfirmation } = useConfirmation();

  const certificateSchema = Yup.object().shape({
    name: Yup.string().required(translate("validation.name_required")),
    provider: Yup.string().required(translate("validation.provider_required")),
    from_date: Yup.string().required(translate("validation.date_required")),
    to_date: Yup.string().required(translate("validation.date_required")),
    description: Yup.string().required(
      translate("validation.description_required")
    ),
    file: Yup.mixed()
      .required(translate("validation.file_required"))
      .test("fileType", translate("validation.invalid_file_type"), (value) => {
        if (!value) return true; // Skip if no file (handled by required)
        if (typeof value === "string") return true; // Existing file path
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      }),
  });

  const isEditing = mode === "edit";
  const isAdding = mode === "add";
  const showForm = isAdding || selectedId;

  const selectedCertificate =
    certificates.find((cert) => cert.id === selectedId) || null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      if (errors.file) {
        setErrors((prev) => ({ ...prev, file: "" }));
      }
    }
  };

  const handleSaveCertificate = async () => {
    try {
      await certificateSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const updatedCertificates = isEditing
        ? certificates.map((cert) =>
            cert.id === selectedId ? { ...formData, id: selectedId } : cert
          )
        : [...certificates, { ...formData }];

      await onSave(updatedCertificates);
    } catch (validationError) {
      const errorMap = {};
      validationError.inner.forEach((err) => {
        errorMap[err.path] = err.message;
        toast.error(err.message);
      });
      setErrors(errorMap);
    }
  };

  const handleDeleteCertificate = async (id) => {
    try {
      await showConfirmation({
        message: translate("status.confirm_delete"),
        onConfirm: async () => {
          await axiosInstance.delete(`/auth/freelancer/certificates/${id}`);
          const updatedCertificates = certificates.filter(
            (cert) => cert.id !== id
          );
          updateCertificates(updatedCertificates);
          toast.success(translate("status.certificate_deleted"));
          closeModal();
        },
      });
    } catch (error) {
      if (error !== "cancelled") {
        toast.error(translate("status.delete_error"));
        console.error("Delete error:", error);
      }
    }
  };

  const handleEditCertificate = (cert) => {
    setSelectedId(cert.id);
    setFormData({
      id: cert.id,
      name: cert.name || "",
      provider: cert.provider || "",
      from_date: cert.from_date || "",
      to_date: cert.to_date || "",
      description: cert.description || "",
      file: cert.file_path || null,
    });
    setErrors({});
  };

  const handleAddNew = () => {
    setSelectedId(null);
    setFormData({
      name: "",
      provider: "",
      from_date: "",
      to_date: "",
      description: "",
      file: null,
    });
  };

  return (
    <div className="flex flex-col gap-4" data-lenis-prevent="true">
      <h1 className="text-3xl">
        {isEditing
          ? translate("profile.edit_certificate")
          : translate("profile.add_certificate")}
      </h1>

      {isEditing && (
        <div className="flex flex-col gap-2 px-2 max-h-[200px] overflow-y-scroll">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className={`flex items-center justify-between p-2 border rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 ${
                selectedId === cert.id ? "border-primary" : ""
              }`}
            >
              <p className="line-clamp-1">{`${cert.name} | ${cert.provider}`}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditCertificate(cert)}
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

      {showForm && (
        <>
          <div className="flex flex-col gap-4">
            <TextInput
              label={`${translate("profile.certificate_name")}`}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              required
            />

            <TextInput
              label={`${translate("profile.provider")}`}
              name="provider"
              value={formData.provider}
              onChange={handleInputChange}
              error={errors.provider}
              required
            />

            <div className="w-full flex justify-center items-center gap-4">
              <DateInput
                label={`${translate("profile.start_date")}`}
                name="from_date"
                value={formData.from_date}
                onChange={handleInputChange}
                error={errors.from_date}
                required
              />

              <DateInput
                label={translate("profile.end_date")}
                name="to_date"
                value={formData.to_date}
                onChange={handleInputChange}
                error={errors.to_date}
                required
              />
            </div>

            <TextAreaInput
              label={translate("profile.description")}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={8}
              error={errors.description}
              required
            />

            <FileInput
              label={translate("profile.certificate_file")}
              name="file"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
              multiple={false}
              error={errors.file}
              required
            />
          </div>

          <div className="w-full flex justify-end items-center gap-4 my-4">
            <SecondaryBtn
              text={translate("btns.cancel")}
              onClick={closeModal}
              classNames="text-lg"
              disabled={isLoading}
            />

            <MainBtn
              text={isLoading ? <Spinner /> : translate("btns.save")}
              onClick={handleSaveCertificate}
              classNames="text-lg"
              disabled={isLoading}
            />
          </div>
        </>
      )}
    </div>
  );
};

const CertificateItem = ({ certificate }) => {
  return (
    <div dir="ltr" className="mt-4 grid grid-cols-1 gap-2">
      <h1 className="text-base md:text-xl font-medium">{`${certificate.name} | ${certificate.provider}`}</h1>
      <p className="text-xs md:text-sm">{`${certificate.from_date} - ${certificate.to_date}`}</p>
      <p className="text-sm md:text-base line-clamp-4">
        {certificate.description}
      </p>
      <a href={certificate.link} target="_blank" rel="noopener noreferrer"></a>
    </div>
  );
};

export default Certificates;
