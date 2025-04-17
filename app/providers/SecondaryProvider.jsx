import { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";

const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
  const [confirmationState, setConfirmationState] = useState({
    isOpen: false,
    message: "",
    onConfirm: null,
    isLoading: false,
    confirmText: "Confirm",
    cancelText: "Cancel",
    variant: "danger" // 'danger' or 'primary'
  });

  const showConfirmation = useCallback((options) => {
    setConfirmationState({
      isOpen: true,
      isLoading: false,
      confirmText: "Confirm",
      cancelText: "Cancel",
      variant: "danger",
      ...options
    });
  }, []);

  const handleConfirm = async () => {
    setConfirmationState(prev => ({ ...prev, isLoading: true }));
    try {
      if (confirmationState.onConfirm) {
        await confirmationState.onConfirm();
      }
      setConfirmationState(prev => ({ ...prev, isOpen: false }));
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
      setConfirmationState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleCancel = () => {
    setConfirmationState(prev => ({ ...prev, isOpen: false }));
    // يمكنك رفض promise هنا إذا أردت التعامل مع الإلغاء
  };

  return (
    <ConfirmationContext.Provider value={{ showConfirmation }}>
      {children}
      {confirmationState.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-darknav p-6 rounded-lg max-w-md w-full shadow-xl">
            <p className="mb-4 text-gray-800 dark:text-gray-200">
              {confirmationState.message}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                disabled={confirmationState.isLoading}
                className="px-4 py-2 rounded border border-gray-300 dark:border-darkinput hover:bg-gray-100 dark:hover:bg-darkinput transition-colors disabled:opacity-50"
              >
                {confirmationState.cancelText}
              </button>
              <button
                onClick={handleConfirm}
                disabled={confirmationState.isLoading}
                className={`px-4 py-2 rounded text-white transition-colors disabled:opacity-50 ${
                  confirmationState.variant === 'danger' 
                    ? 'bg-redwarn hover:bg-red-600' 
                    : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                {confirmationState.isLoading ? "Processing..." : confirmationState.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error('useConfirmation must be used within a ConfirmationProvider');
  }
  return context;
};