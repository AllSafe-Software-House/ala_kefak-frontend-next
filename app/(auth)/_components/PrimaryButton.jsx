export default function PrimaryButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primaryhover focus:outline-none animation
      text-sm md:text-xl font-medium
      "
    >
      {label}
    </button>
  );
}
