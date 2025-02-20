"use client";
import { createContext, useContext, useState, useEffect } from "react";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); 
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem("alakefaklang");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("alakefaklang", language);

    const loadTranslations = async () => {
      try {
        const res = await import(`../locales/${language}.json`);
        setTranslations(res);
      } catch (error) {
        console.error(`Error loading translations for language: ${language}`, error);
      }
    };
    loadTranslations();
  }, [language]);

  const translate = (key) => translations[key] || key;

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
