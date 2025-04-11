import { MdOutlineEdit } from "react-icons/md";

const EditBtn = ({ onClick, classNames = "" }) => {
  return (
    <button
      className={`border-primary rounded-full border text-lg md:text-2xl text-primary p-2
      hover:bg-primary hover:text-white animation ${classNames}`}
      onClick={onClick}
    >
      <MdOutlineEdit />
    </button>
  );
};

export default EditBtn;
