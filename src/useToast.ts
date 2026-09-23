import { createContext, useContext } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export type ToastFn = (message: string, type?: ToastType, duration?: number) => void;

export const ToastCtx = createContext<ToastFn>(() => {});

export function useToast(): ToastFn {
  return useContext(ToastCtx);
}
