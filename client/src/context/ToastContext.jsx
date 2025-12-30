import { createContext, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success"
  });

  function showToast(message, type = "success") {
    setToast({
      visible: true,
      message,
      type
    });

    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  }

  function getIcon() {
    if (toast.type === "success") return <FaCheckCircle />;
    if (toast.type === "error") return <FaExclamationCircle />;
    return <FaInfoCircle />;
  }

  function getBgColor() {
    if (toast.type === "success") return "bg-green-500";
    if (toast.type === "error") return "bg-red-600";
    return "bg-gray-700";
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`
              flex items-center gap-3
              px-6 py-4
              rounded-xl
              shadow-xl
              text-white
              ${getBgColor()}
              transition-all duration-500 ease-out
            `}
          >
            <span className="text-xl">
              {getIcon()}
            </span>

            <span className="text-sm font-medium">
              {toast.message}
            </span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
