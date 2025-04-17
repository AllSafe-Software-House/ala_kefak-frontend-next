"use client";

const TextAreaField = ({ label, value, onChange, error, placeholder }) => (
  <div className="flex flex-col">
    <label className="font-medium mb-2">{label}</label>
    <textarea
      className={`border p-2 rounded dark:bg-darknav dark:text-gray-300 outline-none ${
        error ? "border-redwarn" : "border-gray-300 dark:border-gray-600"
      }`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
    />
    {error && <span className="text-redwarn text-sm mt-1">{error}</span>}
  </div>
);

export default TextAreaField;