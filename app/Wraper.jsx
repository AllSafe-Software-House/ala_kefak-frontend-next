"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "./providers/Transslations";
import { useTheme } from "./providers/Theme-context";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { Cairo, Inter } from "next/font/google";

// تعريف الخطوط
const interFont = Inter({ subsets: ["latin"], weight: ["400", "900"] });
const cairoFont = Cairo({ subsets: ["arabic"], weight: ["400", "700"] });

const Wraper = ({ children }) => {
  const { language } = useTranslation();
  const { theme } = useTheme();
  const pathname = usePathname(); 
  const [showScroll, setShowScroll] = useState(false);
  const direction = language === "ar" ? "rtl" : "ltr";
  const selectedFont = language === "ar" ? cairoFont.className : interFont.className; 

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);


  const isInAuth = [
    "login",
    "sign-up",
    "choose-type",
    "verify",
    "reset-password",
    "welcome",
  ].some((path) => pathname.includes(path));

  return (
    <div
      className={`${theme} ${selectedFont} text-slate-900 dark:text-white bg-gray-100 dark:bg-darkbg min-h-screen animation`} 
      dir={direction}
    >
      {!isInAuth && <Navbar />}
      <div className={isInAuth ? "pt-0" : "pt-[70px]"}>{children}</div>
      <Toaster
        richColors
        position="bottom-left"
        expand={false}
        toastOptions={{
          className: "min-w-fit",
        }}
      />
      <Footer />
      {showScroll && <UpBtn />}
    </div>
  );
};

export default Wraper;

function UpBtn() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      onClick={scrollToTop}
      className="fixed bottom-6 animation border group right-6 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-dark transition"
    >
      <FaChevronUp className="group-hover:scale-150 group-hover:rotate-[360deg] animation" />
    </motion.button>
  );
}