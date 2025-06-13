import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/srore.js";
import { ProductProvider } from "./pages/account/home/ProductContext.jsx";
import { CateProvider } from "./pages/account/home/CateContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ProductProvider>
        <CateProvider>
          <App />
        </CateProvider>
      </ProductProvider>
    </BrowserRouter>
  </Provider>
);
