import React, { createContext, useContext, useState } from "react";

interface QuickToastProviderProps {
  children: React.ReactNode;
}

interface QuickToastContextValues {
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  toastType: ToastType | undefined;
  setToastType: React.Dispatch<React.SetStateAction<ToastType | undefined>>;
  handleShowToast: (type: ToastType, message: string) => void;
  toggleToastVisibility: () => void;
  toastMessage: string;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
}

type ToastType = "success" | "error" | "warning";

const QuickToastContext = createContext({} as QuickToastContextValues);

const QuickToastProvider = ({ children }: QuickToastProviderProps) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>();
  const [toastMessage, setToastMessage] = useState("");

  const TOAST_DURATION = 5000; // MS

  const toggleToastVisibility = () => setShowToast((show) => !show);

  const handleShowToast = (type: ToastType, message: string) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, TOAST_DURATION);
  };

  const contextValues = {
    toastMessage,
    setToastMessage,
    showToast,
    setShowToast,
    toastType,
    setToastType,
    handleShowToast,
    toggleToastVisibility,
  };

  return (
    <QuickToastContext.Provider value={contextValues}>
      {children}
    </QuickToastContext.Provider>
  );
};

const useQuickToast = () => {
  const context = useContext(QuickToastContext);

  return context;
};

export { QuickToastProvider, useQuickToast };
