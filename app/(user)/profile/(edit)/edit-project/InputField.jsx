"use client";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className="flex flex-col">
    <label className="font-medium mb-2">{label}</label>
    <input
      type={type}
      className={`border p-2 rounded dark:bg-darknav dark:text-gray-300 outline-none ${
        error ? "!border-redwarn" : "border-gray-300 dark:border-gray-600"
      }`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {error && <span className="text-redwarn text-sm mt-1 block">{error}</span>}
  </div>
);

export default InputField;
