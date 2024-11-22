import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import FlagDisplay from "./FlagDisplay";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find root element");

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <FlagDisplay />
  </StrictMode>
);
