// AppProviders.js
"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TranslationProvider } from "./Transslations";
import TheQueryProvider from "./TheQueryProvider";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./Theme-context";
import { ToastProvider } from "../components/toast/Toast";

const AppProviders = ({ children }) => {
  return (
    <TranslationProvider>
      <ToastProvider>
        <TheQueryProvider>
          <AuthProvider>
            <ThemeProvider>
              {children}
              <ToastContainer />
            </ThemeProvider>
          </AuthProvider>
        </TheQueryProvider>
      </ToastProvider>
    </TranslationProvider>
  );
};

export default AppProviders;
