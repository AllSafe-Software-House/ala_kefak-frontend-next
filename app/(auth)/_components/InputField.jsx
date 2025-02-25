export default function InputField({
  id,
  type,
  label,
  placeholder,
  error,
  ...rest
}) {
  return (
    <div className="w-full text-sm md:text-lg font-medium">
      <label
        htmlFor={id}
        className="block m-0 text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full m px-3 py-1 border text-gray-900 dark:text-gray-300 border-gray-300 dark:border-gray-600 dark:bg-darkinput rounded-md focus:outline-none 
          ${error ? "border-red-500 focus:border-red-500" : ""}`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm font-light">{error}</p>}
    </div>
  );
}
