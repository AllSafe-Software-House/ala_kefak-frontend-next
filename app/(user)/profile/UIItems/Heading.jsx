const Heading = ({ text, actions }) => {
  return (
    <div className="flex justify-between items-center text-base md:text-xl">
      <h3 className="font-semibold  text-gray-700 dark:text-gray-300">
        {text}
      </h3>
      <div className="flex justify-center items-center gap-4 ">{actions}</div>
    </div>
  );
};

export default Heading