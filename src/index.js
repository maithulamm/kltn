import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// import GlobalStyle from "./components/GolobalStyle";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(publicRoutes);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();