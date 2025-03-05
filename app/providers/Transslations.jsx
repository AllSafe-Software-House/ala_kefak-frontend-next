"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("ar");
  const [translations, setTranslations] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("alakefaklang");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsTranslating(true);
      try {
        const response = await fetch(`/locales/${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${language}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error(`Error loading translations:`, error);
      } finally {
        setIsTranslating(false);
      }
    };

    localStorage.setItem("alakefaklang", language);
    loadTranslations();
  }, [language]);

  const translate = (keyPath) =>
    keyPath.split(".").reduce((obj, key) => obj?.[key], translations) || keyPath;

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate, isTranslating }}>
      <motion.div
        key={language}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
