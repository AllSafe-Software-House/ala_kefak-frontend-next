export const MainBtn = ({text, onClick,disabled=false, classNames = ""}) => {
  return (
    <button
    disabled={disabled} 
      onClick={onClick}
      className={`bg-primary hover:bg-primaryhover animation text-white rounded-lg px-2 md:px-5 py-2 font-medium
        dark:bg-primaryhover dark:hover:bg-primary dark:text-darknav text-xs md:text-sm lg:text-base
        ${classNames} ${disabled && "opacity-50 cursor-not-allowed"} `}
    >
      {text}
    </button>
  );
};
export const SecondaryBtn = ({text, onClick,disabled=false, classNames = ""}) => {
  return (
    <button
    disabled={disabled}
      onClick={onClick}
      className={`bg-white hover:bg-primary text-primary hover:text-white border-primary animation border
        rounded-lg px-2 md:px-4 py-2 font-medium  dark:text-primary dark:bg-darknav dark:hover:bg-primary/20  text-xs md:text-sm lg:text-base 
        ${classNames} ${disabled && "opacity-50 cursor-not-allowed"} `}
    >
      {text}
    </button>
  );
};

export const DangerBtn = ({ text, onClick, disabled = false, isLoading = false, classNames = "" }) => {
  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        bg-red-600 hover:bg-red-700 animation text-white rounded-lg 
        px-2 md:px-5 py-2 font-medium
        dark:bg-red-700 dark:hover:bg-red-800 dark:text-white
        text-xs md:text-sm lg:text-base
        ${classNames} 
        ${(disabled || isLoading) && "opacity-50 cursor-not-allowed"}
      `}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {text}
        </span>
      ) : (
        text
      )}
    </button>
  );
};