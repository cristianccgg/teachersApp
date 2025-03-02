import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import initEmojiData from "./InitEmojis";

// Inicializar datos de emojis antes de renderizar la aplicación
initEmojiData();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
