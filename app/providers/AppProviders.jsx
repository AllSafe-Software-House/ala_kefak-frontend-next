// AppProviders.js
"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TranslationProvider } from "./Transslations";
import TheQueryProvider from "./TheQueryProvider";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./Theme-context";
import { ToastProvider } from "../components/toast/Toast";
import { ConfirmationProvider } from "./SecondaryProvider";

const AppProviders = ({ children }) => {
  return (
    <TranslationProvider>
      <ToastProvider>
        <TheQueryProvider>
          <AuthProvider>
            <ThemeProvider>
              <ConfirmationProvider>
                {children}
                <ToastContainer />
              </ConfirmationProvider>
            </ThemeProvider>
          </AuthProvider>
        </TheQueryProvider>
      </ToastProvider>
    </TranslationProvider>
  );
};

export default AppProviders;
