import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import ToastProvider from "./components/common/ToastProvider.tsx";
import { PrimeReactProvider } from 'primereact/api';
import "./index.css";
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Theme
import 'primereact/resources/primereact.min.css';                 // Core CSS

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
        <ToastProvider />
        <App />
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);
