export const MainBtn = ({text, onClick, classNames = ""}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary hover:bg-primaryhover animation text-white rounded-lg px-5 py-2 font-medium
        dark:bg-primaryhover dark:hover:bg-primary dark:text-darknav
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
        rounded-lg px-4 py-2 font-medium  dark:text-primary dark:bg-darknav dark:hover:bg-primary/20 
        ${classNames} `}
    >
      {text}
    </button>
  );
};
