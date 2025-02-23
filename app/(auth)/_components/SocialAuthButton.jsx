export default function SocialAuthButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full  dark:text-gray-300 flex items-center justify-center gap-2 text-gray-900 border py-2 md:py-3 px-4 rounded-xl
      text-sm md:text-xl font-medium hover:border-primary hover:text-primary animation
      "
    >
      {icon} {label}
    </button>
  );
}
