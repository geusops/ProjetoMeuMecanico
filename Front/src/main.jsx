//Modificado por Khenny

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ← Adicione essas duas linhas:
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* ← envolva o App aqui */}
      <App />
    </AuthProvider>
  </StrictMode>,
);
