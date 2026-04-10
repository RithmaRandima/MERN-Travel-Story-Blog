import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BlogProvider } from "./context/Blog-Context.jsx";
import { BrowserRouter } from "react-router-dom";
import "react-day-picker/dist/style.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BlogProvider>
      <App />
    </BlogProvider>
  </BrowserRouter>,
);
