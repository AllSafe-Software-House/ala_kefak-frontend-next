// "use client";
// import React, { useState, useEffect } from "react";
// import { useTranslation } from "./providers/Transslations";
// import { useTheme } from "./providers/Theme-context";
// import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
// import { FaChevronUp } from "react-icons/fa";
// import { motion } from "framer-motion";

// const Wraper = ({ children }) => {
//   const { language } = useTranslation();
//   const { theme } = useTheme();
//   const [showScroll, setShowScroll] = useState(false);
//   const direction = language === "ar" ? "rtl" : "ltr";

//   const handleScroll = () => {
//     if (window.scrollY > 300) {
//       setShowScroll(true);
//     } else {
//       setShowScroll(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div
//       className={`${theme} text-slate-900 dark:text-white bg-gray-100 dark:bg-slate-900 min-h-screen animation`}
//       dir={direction}
//     >
//       <Navbar />
//       <div className="pt-[70px]">{children}</div>
//       <Footer />
//       {showScroll && <UpBtn />}
//     </div>
//   );
// };

// export default Wraper;

// function UpBtn() {
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <motion.button
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.4 }}
//       onClick={scrollToTop}
//       className="fixed bottom-6 animation border group right-6 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-dark transition"
//     >
//       <FaChevronUp className="group-hover:scale-150 group-hover:rotate-[360deg]  animation" />
//     </motion.button>
//   );
// }

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

const Wraper = ({ children }) => {
  const { language } = useTranslation();
  const { theme } = useTheme();
  const [showScroll, setShowScroll] = useState(false);
  const direction = language === "ar" ? "rtl" : "ltr";

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
  ].some((path) => usePathname().includes(path));

  return (
    <div
      className={`${theme} text-slate-900 dark:text-white bg-gray-100 dark:bg-darkbg min-h-screen animation`}
      dir={direction}
    >
      {!isInAuth && <Navbar />}
      <div className={isInAuth ? "pt-0" : "pt-[70px]"}>{children}</div>
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
      <FaChevronUp className="group-hover:scale-150 group-hover:rotate-[360deg]  animation" />
    </motion.button>
  );
}
