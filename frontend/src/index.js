import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM from 'react-dom', not 'react-dom/client'
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import 'primereact/resources/primereact.min.css';
// @import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-green/theme.css";
// Assuming `createBrowserRouter` creates your router
// const router = createBrowserRouter(publicRoutes);
const root = ReactDOM.createRoot(document.getElementById('root'));
// Render your app using ReactDOM.render, not createRoot

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <GoogleOAuthProvider clientId="998815737451-45o6unr9j5sfmt3bv8a52bfrr1oaf8gl.apps.googleusercontent.com"> */}
        <App />
      {/* </GoogleOAuthProvider> */}
    </PersistGate>
  </Provider>,
  // document.getElementById("root")
);

reportWebVitals();
