import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ToastProvider } from "./components/Toast";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <DataProvider>
              <App />
            </DataProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
