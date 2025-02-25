export default function InputField({ id, type, label, placeholder, error, ...rest }) {
  return (
    <div className="w-full text-sm md:text-lg font-medium">
      <label htmlFor={id} className="block m-0 text-gray-700 dark:text-gray-300">
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


// export default function InputField({ id, type, label, placeholder, error, ...rest }) {
//   return (
//     <div className="text-sm md:text-xl font-medium">
//       <label htmlFor={id} className="block text-gray-700 dark:text-gray-300">
//         {label}
//       </label>
//       <input
//         type={type}
//         id={id}
//         placeholder={placeholder}
//         className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none transition-all duration-200
//           ${
//             error
//               ? "border-red-500 dark:border-red-400 focus:border-red-500"
//               : "border-gray-300 dark:border-gray-600 dark:bg-darkinput hover:border-gray-500 focus:border-blue-500"
//           }`}
//         {...rest}
//       />
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }
