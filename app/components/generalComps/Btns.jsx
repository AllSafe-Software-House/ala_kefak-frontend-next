export const MainBtn = ({text, onClick, classNames = ""}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary hover:bg-primaryhover animation text-white rounded-lg px-2 md:px-5 py-2 font-medium
        dark:bg-primaryhover dark:hover:bg-primary dark:text-darknav text-xs md:text-sm lg:text-base
        ${classNames} `}
    >
      {text}
    </button>
  );
};
export const SecondaryBtn = ({text, onClick, classNames = ""}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white hover:bg-primary text-primary hover:text-white border-primary animation border
        rounded-lg px-2 md:px-4 py-2 font-medium  dark:text-primary dark:bg-darknav dark:hover:bg-primary/20  text-xs md:text-sm lg:text-base
        ${classNames} `}
    >
      {text}
    </button>
  );
};
