export default function InputField({ id, type, label, placeholder }) {
  return (
    <div className="mb-4 text-sm md:text-xl font-medium">
      <label htmlFor={id} className="block text-gray-700 dark:text-gray-300 ">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full mt-1 px-3 py-2 border border-gray-300 dark:bg-darkinput rounded-md focus:outline-none"
      />
    </div>
  );
}
