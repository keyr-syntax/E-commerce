// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ContextProvider from "./Public Components/ContextProvider";
import { Provider } from "./components/ui/provider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      <Provider>
        <App />
      </Provider>
    </ContextProvider>
  </BrowserRouter>
);
