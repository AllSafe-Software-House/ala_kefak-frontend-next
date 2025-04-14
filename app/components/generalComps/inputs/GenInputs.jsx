"use client";
import { useTranslation } from "@/app/providers/Transslations";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
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
      <select
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className={`border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 outline-none w-full ${
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
          <option key={option.value} value={option.value}>
            {translate(option.label)}
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
        type="file"
        id={name}
        name={name}
        onChange={onChange}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className={`border p-2 rounded dark:border-darkinput dark:bg-darknav dark:text-gray-300 outline-none w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 ${
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
          } ${required ? "bg-danger" : "bg-primary"} text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap`}
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
