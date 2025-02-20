"use client";

import { useTheme } from "@/app/providers/Theme-context";
import { FiSun } from "react-icons/fi";
import { RiMoonClearFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

export const LightDarkToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="w-12 h-12 rounded-full overflow-hidden cursor-pointer animation bg-gray-100 dark:bg-darkinput flex justify-center items-center"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, scale: 3, rotate: -120 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 3, rotate: 120 }}
            transition={{ duration: 0.5 }}
          >
            <FiSun className="text-yellow-400 text-2xl" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, scale: 3, rotate: 120 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 3, rotate: -120 }}
            transition={{ duration: 0.5 }}
          >
            <RiMoonClearFill className="text-indigo-400 text-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
