import { IoMdAdd } from "react-icons/io";

const AddBtn = ({onClick}) => {
  return (
    <button
      className="border-primary rounded-lg border text-primary p-1 flex items-center
    hover:bg-primary hover:text-white animation text-sm md:text-base
    "
      onClick={onClick}
    >
      <span className="mx-2">Add</span>
      <IoMdAdd />
    </button>
  );
};

export default AddBtn;
