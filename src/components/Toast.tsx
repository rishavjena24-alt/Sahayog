import React, { useState, useRef } from "react";
import { CheckCircle2, XCircle, Info, AlertTriangle } from "lucide-react";
import { ToastCtx, ToastType } from "../useToast";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timer = useRef<any>(null);

  const push = (message: string, type: ToastType = "success", duration: number = 3200) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, duration);
  };

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-stack" role="region" aria-label="Notifications" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`} role="status">
            {t.type === "success" && <CheckCircle2 size={18} aria-hidden="true" />}
            {t.type === "error" && <XCircle size={18} aria-hidden="true" />}
            {t.type === "info" && <Info size={18} aria-hidden="true" />}
            {t.type === "warning" && <AlertTriangle size={18} aria-hidden="true" />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
};

export const Toaster: React.FC = () => null;
