// "use client";
// import { useTranslation } from "@/app/providers/Transslations";
// import React from "react";
// import { SecondaryBtn } from "../generalComps/Btns";
// import { FaFlagUsa } from "react-icons/fa";
// import { GiEgypt } from "react-icons/gi"; // يمكنك تغيير الأيقونة لعلم آخر حسب الحاجة

// const LangBtn = () => {
//   const { language, setLanguage } = useTranslation();

//   const toggleLanguage = () => {
//     const newLanguage = language === "ar" ? "en" : "ar";
//     setLanguage(newLanguage);
//   };

//   return (
//     <SecondaryBtn
//       text={language === "ar" ? <FaFlagUsa className="w-5 h-5" /> : <GiEgypt className="w-5 h-5" />}
//       classNames="flex items-center gap-2 px-3 py-2 font-bold"
//       onClick={toggleLanguage}
//     />
//   );
// };

// export default LangBtn;

// // https://cdn-icons-png.flaticon.com/128/330/330552.png

// // https://cdn-icons-png.flaticon.com/128/206/206626.png

"use client";
import { useTranslation } from "@/app/providers/Transslations";
import React from "react";
import { SecondaryBtn } from "../generalComps/Btns";

const LangBtn = () => {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = language === "ar" ? "en" : "ar";
    setLanguage(newLanguage);
  };

  return (
    <img

      onClick={toggleLanguage}
      src={
        language === "en"
          ? "https://cdn-icons-png.flaticon.com/128/13980/13980429.png"
          : "https://cdn-icons-png.flaticon.com/128/323/323310.png"
      }
      alt="Language Flag"
      className="w-[44px] h-[44px]  cursor-pointer animation"
    />
  );
};

export default LangBtn;
