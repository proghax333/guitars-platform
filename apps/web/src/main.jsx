import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";
import "react-chat-elements/dist/main.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
