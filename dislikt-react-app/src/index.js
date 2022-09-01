import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.interceptors.request.use(function (config) {
  const loggedInUser = window.localStorage.getItem('token')
  if (loggedInUser) {
    const token = `Bearer ${loggedInUser}`
    config.headers['Authorization'] = token
  }

  return config
})

root.render(
  <React.StrictMode>

    <App />
  </React.StrictMode>
);
