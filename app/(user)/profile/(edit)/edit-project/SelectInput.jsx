export default function SelectInput({ label, value, options, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border p-2 rounded dark:bg-darknav dark:text-gray-300 outline-none ${
          error ? "border-redwarn" : "border-gray-300 dark:border-gray-600"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <span className="text-redwarn text-sm mt-1">{error}</span>}
    </div>
  );
}