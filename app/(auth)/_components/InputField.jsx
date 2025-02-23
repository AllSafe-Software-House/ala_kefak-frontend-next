export default function InputField({ id, type, label, placeholder,error }) {
  return (
    <div className="mb-4 text-sm md:text-xl font-medium">
      <label htmlFor={id} className="block text-gray-700 dark:text-gray-300 ">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full mt-1 px-3 py-2 border text-gray-900 dark:text-gray-300 border-gray-300 dark:bg-darkinput rounded-md focus:outline-none"
      />
      {error && <p className="text-red-500 text-sm font-light">{error}</p>}
    </div>
  );
}
