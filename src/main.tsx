import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import NiceModal from "@ebay/nice-modal-react";
import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>{" "}
  </StrictMode>
);
