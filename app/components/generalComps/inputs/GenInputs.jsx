"use client";
import { useTranslation } from "@/app/providers/Transslations";
import React, { useState } from "react";
import { FaFile, FaImage, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
export const TextInput = ({
  label,
  required = false,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  disabled,
  className = "",
  ...props
}) => {
  const { translate } = useTranslation();
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          className="flex justify-start items-center gap-1 font-medium"
          htmlFor={name}
        >
          {translate(label)}
          <span>
            {required ? (
              <Note
                required={required}
                text="This Field is required 'Mandatory Field' "
              />
            ) : (
              <Note
                required={required}
                text="This field is optional 'Optional Field' "
              />
            )}
          </span>
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder ? translate(placeholder) : undefined}
        disabled={disabled}
        className={`border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 outline-none w-full transition-all ${
          error ? "!border-red-500" : ""
        } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-sm">{translate(error)}</span>
      )}
    </div>
  );
};

export const DateInput = ({
  label,
  required = false,
  name,
  value,
  onChange,
  error,
  min,
  max,
  disabled,
  className = "",
  ...props
}) => {
  const { translate } = useTranslation();
  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          className="flex justify-start items-center gap-1 font-medium"
          htmlFor={name}
        >
          {translate(label)}
          <span>
            {required ? (
              <Note
                required={required}
                text="This Field is required 'Mandatory Field' "
              />
            ) : (
              <Note
                required={required}
                text="This field is optional 'Optional Field' "
              />
            )}
          </span>
        </label>
      )}
      <input
        type="date"
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        min={min}
        max={max}
        disabled={disabled}
        className={`border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 outline-none ${
          error ? "!border-red-500" : ""
        } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-sm">{translate(error)}</span>
      )}
    </div>
  );
};

export const TextAreaInput = ({
  label,
  required = false,
  name,
  value,
  onChange,
  error,
  rows = 4,
  placeholder,
  disabled,
  className = "",
  ...props
}) => {
  const { translate } = useTranslation();
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          className="flex justify-start items-center gap-1 font-medium"
          htmlFor={name}
        >
          {translate(label)}
          <span>
            {required ? (
              <Note
                required={required}
                text="This Field is required 'Mandatory Field' "
              />
            ) : (
              <Note
                required={required}
                text="This field is optional 'Optional Field' "
              />
            )}
          </span>
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder ? translate(placeholder) : undefined}
        disabled={disabled}
        className={`border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 resize-none outline-none w-full ${
          error ? "!border-red-500" : ""
        } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
        {...props}
        data-lenis-prevent="true"
      />
      {error && (
        <span className="text-red-500 text-sm">{translate(error)}</span>
      )}
    </div>
  );
};

export const SelectInput = ({
  label,
  required = false,
  name,
  value,
  onChange,
  options,
  error,
  placeholder,
  disabled,
  className = "",
  ...props
}) => {
  const { translate } = useTranslation();
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          className="flex justify-start items-center gap-1 font-medium"
          htmlFor={name}
        >
          {translate(label)}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className={`border p-2 rounded dark:border-danger dark:bg-darknav dark:text-gray-300 outline-none w-full ${
          error ? "!border-red-500" : ""
        } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {translate(placeholder)}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {translate(option.name)}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-red-500 text-sm">{translate(error)}</span>
      )}
    </div>
  );
};

export const CheckboxInput = ({
  label,
  required = false,
  name,
  checked,
  onChange,
  error,
  disabled,
  className = "",
  ...props
}) => {
  const { translate } = useTranslation();
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked || false}
        onChange={onChange}
        disabled={disabled}
        className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-darkinput dark:bg-darknav ${
          disabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
        {...props}
      />
      {label && (
        <label htmlFor={name} className="text-sm dark:text-gray-300">
          {translate(label)}
          <span>
            {required ? (
              <Note
                required={required}
                text="This Field is required 'Mandatory Field' "
              />
            ) : (
              <Note
                required={required}
                text="This field is optional 'Optional Field' "
              />
            )}
          </span>
        </label>
      )}
      {error && (
        <span className="text-red-500 text-sm">{translate(error)}</span>
      )}
    </div>
  );
};

export const RadioInput = ({
  label,
  required = false,
  name,
  value,
  checked,
  onChange,
  error,
  disabled,
  className = "",
  ...props
}) => {
  const { translate } = useTranslation();
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="radio"
        id={`${name}-${value}`}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`h-4 w-4 text-primary focus:ring-primary dark:border-darkinput ${
          disabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
        {...props}
      />
      {label && (
        <label
          htmlFor={`${name}-${value}`}
          className="text-sm dark:text-gray-300"
        >
          {translate(label)}
          <span>
            {required ? (
              <Note
                required={required}
                text="This Field is required 'Mandatory Field' "
              />
            ) : (
              <Note
                required={required}
                text="This field is optional 'Optional Field' "
              />
            )}
          </span>
        </label>
      )}
      {error && (
        <span className="text-red-500 text-sm">{translate(error)}</span>
      )}
    </div>
  );
};

export const FileInput = ({
  label,
  required = false,
  name,
  onChange,
  error,
  accept,
  multiple = false,
  disabled,
  className = "",
  ...props
}) => {
  const { translate } = useTranslation();
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);
      if (onChange) {
        onChange(e);
      }
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!disabled && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      setSelectedFiles(filesArray);

      if (onChange) {
        // Create a synthetic event to match the normal file input change event
        const event = {
          target: {
            name,
            files: e.dataTransfer.files,
          },
        };
        onChange(event);
      }
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          className="flex justify-start items-center gap-1 font-medium"
          htmlFor={name}
        >
          {translate(label)}
          <span>
            {required ? (
              <Note
                required={required}
                text="This Field is required 'Mandatory Field' "
              />
            ) : (
              <Note
                required={required}
                text="This field is optional 'Optional Field' "
              />
            )}
          </span>
        </label>
      )}

      <label
        className={`w-full cursor-pointer flex justify-center items-center flex-col py-9 dark:text-white text-slate-900 dark:bg-darknav dark:border-darkinput
    rounded-2xl border-blue-300 gap-3 border-dashed border-2 hover:border-blue-700 group animation dark:hover:bg-blue-500/20 ${
      error ? "!border-red-500" : ""
    } ${disabled ? "opacity-70 cursor-not-allowed" : ""} ${
          isDragging
            ? "!border-blue-700 bg-blue-100/50 dark:bg-blue-500/30"
            : ""
        }`}
        htmlFor={name}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          className="hidden"
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          {...props}
        />
        <FaImage
          className={`text-4xl text-blue-400 group-hover:text-blue-700 ${
            disabled ? "opacity-70 cursor-not-allowed" : ""
          } ${error ? "!text-red-500" : ""} animation`}
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {translate("Drag and drop files here or click to browse")}
        </p>
      </label>
      {selectedFiles.length > 0 && (
        <div className="w-full flex justify-start items-start gap-3 flex-wrap mt-4 border rounded-xl p-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 bg-gray-100 dark:bg-gray-700 p-2 rounded "
            >
              <FaFile className={`text-4xl text-blue-400  animation`} />
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {file.name.slice(0, 10)}... ({Math.round(file.size / 1024)} KB)
              </p>
            </div>
          ))}
        </div>
      )}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

const Note = ({ text, Icon = FaInfoCircle, required }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { translate, language } = useTranslation();
  return (
    <div className="relative flex items-center">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <Icon className={`${required ? "text-danger" : "text-primary"}`} />
      </div>
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className={`absolute bottom-full l ${
            language == "ar" ? "right-0" : "left-0"
          } ${
            required ? "bg-danger" : "bg-primary"
          } text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap`}
        >
          {required ? (
            <span>{translate("validation.mandatory_field")}</span>
          ) : (
            <span>{translate("validation.optinal_field")}</span>
          )}
        </motion.div>
      )}
    </div>
  );
};
